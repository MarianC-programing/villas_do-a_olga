/**
 * netlify/functions/api.ts
 *
 * Adapter Express -> Netlify Function via serverless-http.
 *
 * Problema que resuelve este archivo:
 *
 * Netlify convierte /api/message -> /.netlify/functions/api/message
 * serverless-http pasa el path a Express como /message (sin /api/)
 * pero las rutas en Express estaban registradas como /api/message -> 404
 *
 * Solucion: montar el router de rutas en "/" dentro de la funcion,
 * y registrar las rutas sin el prefijo /api/ en routes.ts.
 * El prefijo /api lo maneja el redirect de netlify.toml, no Express.
 *
 * Race condition fix: registerRoutes es llamado con await real dentro
 * de un IIFE async, y el handler espera a que la inicializacion termine
 * antes de procesar cualquier request.
 */

import serverless from "serverless-http";
import express from "express";
import type { Handler } from "@netlify/functions";
import { registerRoutes } from "../../server/routes.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Promesa de inicializacion — garantiza que las rutas esten registradas
// antes de que llegue cualquier request. Elimina la race condition del
// patron lazy anterior.
const ready = registerRoutes(app).then(() => {
  // registerRoutes retorna Server — no lo necesitamos en serverless
}).catch((err) => {
  console.error("[netlify/api] Error registrando rutas:", err);
});

const serverlessHandler = serverless(app);

export const handler: Handler = async (event, context) => {
  // Esperar inicializacion antes de procesar el request
  await ready;
  return serverlessHandler(event, context) as ReturnType<Handler>;
};
