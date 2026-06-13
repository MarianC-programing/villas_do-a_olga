/**
 * netlify/functions/api.ts
 *
 * Handler directo para Netlify Functions.
 *
 * Usa DatabaseStorage directamente (Neon PostgreSQL).
 * No importa storage.ts completo para evitar que better-sqlite3
 * (modulo nativo de C++) entre en el bundle de la funcion.
 */

import type { Handler, HandlerEvent, HandlerResponse } from "@netlify/functions";
import { ZodError } from "zod";
import { Pool, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import ws from "ws";
import { contactSubmissions } from "../../shared/schema.js";
import { insertContactSubmissionSchema } from "../../shared/schema.js";
import { desc } from "drizzle-orm";

// Neon requiere WebSocket en Node.js
neonConfig.webSocketConstructor = ws;

// Conexion a Neon — usa NETLIFY_DATABASE_URL (creada por la extension de Neon)
// o DATABASE_URL si se configura manualmente
const connectionString =
  process.env.DATABASE_URL ??
  process.env.NETLIFY_DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL o NETLIFY_DATABASE_URL requerida");
}

const pool = new Pool({ connectionString });
const db = drizzle({ client: pool });

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

// ── Handlers ─────────────────────────────────────────────────────────────────

async function handleMessage(event: HandlerEvent): Promise<HandlerResponse> {
  if (event.httpMethod === "OPTIONS") return json(200, {});
  if (event.httpMethod !== "POST") {
    return json(405, { success: false, message: "Metodo no permitido." });
  }

  try {
    const body = parseBody(event);
    const validatedData = insertContactSubmissionSchema.parse(body);

    const [submission] = await db
      .insert(contactSubmissions)
      .values(validatedData)
      .returning();

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

  const authHeader =
    event.headers?.authorization ??
    event.headers?.Authorization ??
    "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";

  if (token !== adminToken) {
    return json(401, { success: false, message: "No autorizado." });
  }

  try {
    const submissions = await db
      .select()
      .from(contactSubmissions)
      .orderBy(desc(contactSubmissions.createdAt));

    return json(200, {
      success: true,
      data: submissions,
      count: submissions.length,
    });
  } catch (error) {
    console.error("[api/submissions] Error:", error);
    return json(500, { success: false, message: "Error al obtener los mensajes." });
  }
}

// ── Router ────────────────────────────────────────────────────────────────────

export const handler: Handler = async (event) => {
  const path = event.path ?? "";
  console.log(`[API] ${event.httpMethod} ${path}`);

  if (path.endsWith("/message")) return handleMessage(event);
  if (path.endsWith("/submissions")) return handleSubmissions(event);

  return json(404, {
    success: false,
    message: `Ruta no encontrada: ${path}`,
  });
};
