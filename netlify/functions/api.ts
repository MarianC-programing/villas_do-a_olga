/**
 * netlify/functions/api.ts — con logging de debug para diagnostico
 */

import serverless from "serverless-http";
import express from "express";
import type { Handler } from "@netlify/functions";
import { registerRoutes } from "../../server/routes.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Log de cada request para ver exactamente que llega a Express
app.use((req, _res, next) => {
  console.log(`[API] ${req.method} ${req.path} | originalUrl=${req.originalUrl} | body=${JSON.stringify(req.body)}`);
  next();
});

const ready = registerRoutes(app).then(() => {
  console.log("[API] Routes registered OK");
}).catch((err) => {
  console.error("[API] Error registering routes:", err);
});

const serverlessHandler = serverless(app);

export const handler: Handler = async (event, context) => {
  // Log del evento crudo de Netlify
  console.log(`[API] Event: method=${event.httpMethod} path=${event.path} body=${event.body?.slice(0, 200)}`);
  await ready;
  return serverlessHandler(event, context) as ReturnType<Handler>;
};
