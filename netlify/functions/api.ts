import { createRequire } from 'module';
const require = createRequire(typeof __filename !== 'undefined' ? __filename : import.meta?.url);

import express from 'express';
import { storage } from '../../server/storage.js';
import { insertContactSubmissionSchema } from '../../shared/schema.js';

const app = express();

// Configurar app como en app.ts
app.use(express.json({
  verify: (req, _res, buf) => {
    req.rawBody = buf;
  }
}));
app.use(express.urlencoded({ extended: false }));

// Registrar rutas directamente
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

export const handler = async (event, context) => {
  // Usar serverless-http para adaptar Express a Netlify
  const serverless = require('serverless-http');
  const handler = serverless(app);
  return handler(event, context);
};