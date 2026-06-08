import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { ZodError } from "zod";
import { storage } from "./storage";
import { insertContactSubmissionSchema } from "@shared/schema";

// ── Middleware de admin ───────────────────────────────────────────────────────
// S2-B2: protege rutas de administración con token de entorno.
// El token se configura como variable de entorno ADMIN_TOKEN en Netlify.
// En desarrollo, si no está definido, se bloquea igualmente para forzar buenas prácticas.
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
    res.status(401).json({
      success: false,
      message: "No autorizado.",
    });
    return;
  }

  next();
}

// ── Helper: formatear errores Zod para el cliente ────────────────────────────
// S2-B1: convierte ZodError en un mapa campo → mensaje legible.
// El frontend puede usar esto para mostrar errores específicos por campo.
function formatZodErrors(error: ZodError): Record<string, string> {
  return Object.fromEntries(
    error.errors.map((e) => [
      e.path.join(".") || "general",
      e.message,
    ]),
  );
}

// ── Rutas ─────────────────────────────────────────────────────────────────────
export async function registerRoutes(app: Express): Promise<Server> {

  // POST /api/contact — envío de formulario de contacto
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSubmissionSchema.parse(req.body);
      const submission = await storage.createContactSubmission(validatedData);

      res.status(201).json({
        success: true,
        message: "Mensaje recibido. Nos pondremos en contacto pronto.",
        id: submission.id,
      });
    } catch (error) {
      // S2-B1: errores de validación Zod → 422 con detalle por campo
      if (error instanceof ZodError) {
        res.status(422).json({
          success: false,
          message: "Datos inválidos. Revisa los campos marcados.",
          errors: formatZodErrors(error),
        });
        return;
      }

      console.error("Contact form error:", error);
      res.status(500).json({
        success: false,
        message: "Error interno. Por favor, intenta de nuevo más tarde.",
      });
    }
  });

  // GET /api/contact-submissions — panel de admin (protegido)
  // S2-B2: requiere Authorization: Bearer <ADMIN_TOKEN>
  // Test: curl -H "Authorization: Bearer TU_TOKEN" https://tu-sitio.netlify.app/api/contact-submissions
  app.get(
    "/api/contact-submissions",
    requireAdminToken,
    async (_req, res) => {
      try {
        const submissions = await storage.getAllContactSubmissions();
        res.json({ success: true, data: submissions, count: submissions.length });
      } catch (error) {
        console.error("Error fetching contact submissions:", error);
        res.status(500).json({
          success: false,
          message: "Error al obtener las solicitudes de contacto.",
        });
      }
    },
  );

  const httpServer = createServer(app);
  return httpServer;
}
