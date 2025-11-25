import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSubmissionSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSubmissionSchema.parse(req.body);
      const submission = await storage.createContactSubmission(validatedData);
      
      res.json({
        success: true,
        message: "Mensaje recibido. Nos pondremos en contacto pronto.",
        id: submission.id,
      });
    } catch (error) {
      console.error("Contact form error:", error);
      res.status(400).json({
        success: false,
        message: "Error al enviar el mensaje. Por favor, intenta de nuevo.",
      });
    }
  });

  app.get("/api/contact-submissions", async (_req, res) => {
    try {
      const submissions = await storage.getAllContactSubmissions();
      res.json(submissions);
    } catch (error) {
      console.error("Error fetching contact submissions:", error);
      res.status(500).json({
        success: false,
        message: "Error al obtener las solicitudes de contacto.",
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
