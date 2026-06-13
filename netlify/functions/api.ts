/**
 * netlify/functions/api.ts
 *
 * Handler directo de Netlify Functions — sin serverless-http ni Express.
 *
 * Por que eliminar serverless-http:
 * - serverless-http con Netlify Functions v2 pasa rawPath sin prefijo /api/
 * - Genera conflictos de doble parsing de body con express.json()
 * - Agrega una capa de abstraccion innecesaria para solo 2 endpoints
 *
 * Arquitectura:
 * - Netlify event -> parse manual -> validacion Zod -> Neon directamente
 * - Sin Express, sin serverless-http, sin race conditions
 * - La logica de negocio (validacion, storage) se reutiliza desde server/
 */

import type { Handler, HandlerEvent, HandlerResponse } from "@netlify/functions";
import { ZodError } from "zod";
import { storage } from "../../server/storage.js";
import { insertContactSubmissionSchema } from "../../shared/schema.js";

// ── Helpers ──────────────────────────────────────────────────────────────────

function json(statusCode: number, body: unknown): HandlerResponse {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    },
    body: JSON.stringify(body),
  };
}

function parseBody(event: HandlerEvent): unknown {
  try {
    return event.body ? JSON.parse(event.body) : {};
  } catch {
    return {};
  }
}

function formatZodErrors(error: ZodError): Record<string, string> {
  return Object.fromEntries(
    error.errors.map((e) => [e.path.join(".") || "general", e.message]),
  );
}

// ── Handlers por ruta ────────────────────────────────────────────────────────

async function handleMessage(event: HandlerEvent): Promise<HandlerResponse> {
  if (event.httpMethod === "OPTIONS") return json(200, {});

  if (event.httpMethod !== "POST") {
    return json(405, { success: false, message: "Metodo no permitido." });
  }

  try {
    const body = parseBody(event);
    const validatedData = insertContactSubmissionSchema.parse(body);
    const submission = await storage.createContactSubmission(validatedData);
    return json(201, {
      success: true,
      message: "Mensaje recibido. Nos pondremos en contacto pronto.",
      id: submission.id,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return json(422, {
        success: false,
        message: "Datos invalidos.",
        errors: formatZodErrors(error),
      });
    }
    console.error("[api/message] Error:", error);
    return json(500, {
      success: false,
      message: "Error interno. Intenta de nuevo mas tarde.",
    });
  }
}

async function handleSubmissions(event: HandlerEvent): Promise<HandlerResponse> {
  if (event.httpMethod === "OPTIONS") return json(200, {});

  if (event.httpMethod !== "GET") {
    return json(405, { success: false, message: "Metodo no permitido." });
  }

  const adminToken = process.env.ADMIN_TOKEN;
  if (!adminToken) {
    return json(503, { success: false, message: "ADMIN_TOKEN no configurado." });
  }

  const authHeader = event.headers?.authorization ?? event.headers?.Authorization ?? "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";

  if (token !== adminToken) {
    return json(401, { success: false, message: "No autorizado." });
  }

  try {
    const submissions = await storage.getAllContactSubmissions();
    return json(200, { success: true, data: submissions, count: submissions.length });
  } catch (error) {
    console.error("[api/submissions] Error:", error);
    return json(500, { success: false, message: "Error al obtener los mensajes." });
  }
}

// ── Router principal ─────────────────────────────────────────────────────────

export const handler: Handler = async (event) => {
  // Netlify pasa el path original completo en event.path
  // /api/message -> path = "/api/message"
  // /api/submissions -> path = "/api/submissions"
  const path = event.path ?? "";

  console.log(`[API] ${event.httpMethod} ${path}`);

  if (path.endsWith("/message")) {
    return handleMessage(event);
  }

  if (path.endsWith("/submissions")) {
    return handleSubmissions(event);
  }

  return json(404, { success: false, message: `Ruta no encontrada: ${path}` });
};
