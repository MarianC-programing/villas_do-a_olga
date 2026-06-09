/**
 * netlify/functions/api.ts
 *
 * Adapter Express -> Netlify Function via serverless-http.
 *
 * Fix: top-level await no es compatible con el bundler CJS de Netlify Functions.
 * Solucion: registerRoutes es sincrono en la practica — el await era innecesario.
 * Se usa un handler lazy que inicializa la app una sola vez (patron singleton).
 */

import serverless from "serverless-http";
import express from "express";
import type { Handler } from "@netlify/functions";
import { registerRoutes } from "../../server/routes.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// registerRoutes retorna Promise<Server> pero solo registra middleware —
// no necesitamos el Server en contexto serverless, ni await real.
// Lo resolvemos con un handler que inicializa de forma lazy y segura.
let initialized = false;

const initApp = () => {
  if (!initialized) {
    registerRoutes(app).catch((err) => {
      console.error("Error initializing routes:", err);
    });
    initialized = true;
  }
};

const serverlessHandler = serverless(app);

export const handler: Handler = async (event, context) => {
  initApp();
  return serverlessHandler(event, context) as ReturnType<Handler>;
};
