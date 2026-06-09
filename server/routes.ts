/**
 * server/routes.ts
 *
 * Rutas de la API Express.
 *
 * IMPORTANTE — Prefijos de rutas:
 *
 * En desarrollo (Express directo):
 *   El cliente llama /api/message -> Express recibe /api/message
 *   Las rutas deben estar registradas como /api/message
 *
 * En produccion (Netlify Functions):
 *   netlify.toml redirige /api/* -> /.netlify/functions/api/:splat
 *   serverless-http pasa el path SIN el prefijo de la funcion
 *   pero CON el path original completo incluyendo /api/
 *   Express recibe /api/message -> rutas registradas como /api/message
 *
 * Conclusion: las rutas se registran siempre con /api/ — funciona en ambos entornos.
 */

import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { ZodError } from "zod";
import { storage } from "./storage";
import { insertContactSubmissionSchema } from "@shared/schema";

function requireAdminToken(req: Request, res: Response, next: NextFunction) {
  const adminToken = process.env.ADMIN_TOKEN;

  if (!adminToken) {
    res.status(503).json({
      success: false,
      message: "Endpoint no disponible — ADMIN_TOKEN no configurado.",
    });
    return;
  }

  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith("Bearer ")
    ? authHeader.slice(7)
    : undefined;

  if (token !== adminToken) {
    res.status(401).json({ success: false, message: "No autorizado." });
    return;
  }

  next();
}

function formatZodErrors(error: ZodError): Record<string, string> {
  return Object.fromEntries(
    error.errors.map((e) => [e.path.join(".") || "general", e.message]),
  );
}

export async function registerRoutes(app: Express): Promise<Server> {

  // Debug route — solo activa si DEBUG_ROUTES=true en env
  // Util para diagnosticar que path ve Express en produccion
  if (process.env.DEBUG_ROUTES === "true") {
    app.use((req, _res, next) => {
      console.log(`[DEBUG] ${req.method} ${req.path} | originalUrl: ${req.originalUrl}`);
      next();
    });
  }

  // POST /api/message — envio de formulario de contacto
  // Renombrado de /api/contact para evitar bloqueo de ad-blockers (ERR_BLOCKED_BY_CLIENT)
  app.post("/api/message", async (req, res) => {
    try {
      const validatedData = insertContactSubmissionSchema.parse(req.body);
      const submission = await storage.createContactSubmission(validatedData);
      res.status(201).json({
        success: true,
        message: "Mensaje recibido. Nos pondremos en contacto pronto.",
        id: submission.id,
      });
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(422).json({
          success: false,
          message: "Datos invalidos. Revisa los campos marcados.",
          errors: formatZodErrors(error),
        });
        return;
      }
      console.error("Contact form error:", error);
      res.status(500).json({
        success: false,
        message: "Error interno. Intenta de nuevo mas tarde.",
      });
    }
  });

  // Mantener /api/contact como alias para compatibilidad hacia atras
  app.post("/api/contact", async (req, res) => {
    req.url = "/api/message";
    res.redirect(307, "/api/message");
  });

  // GET /api/submissions — panel de admin (protegido)
  // Renombrado de /api/contact-submissions para evitar ad-blockers
  app.get("/api/submissions", requireAdminToken, async (_req, res) => {
    try {
      const submissions = await storage.getAllContactSubmissions();
      res.json({ success: true, data: submissions, count: submissions.length });
    } catch (error) {
      console.error("Error fetching submissions:", error);
      res.status(500).json({
        success: false,
        message: "Error al obtener los mensajes.",
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
