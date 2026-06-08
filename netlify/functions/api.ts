/**
 * netlify/functions/api.ts
 *
 * Adapter de Express → Netlify Function usando serverless-http.
 *
 * Por qué no duplicamos rutas aquí:
 *   - server/routes.ts es la única fuente de verdad de la API.
 *   - Este archivo solo adapta el app Express al entorno serverless.
 *   - Si se agrega un endpoint en routes.ts, automáticamente aparece aquí.
 *
 * Flujo:
 *   Netlify event → serverless-http → Express app → routes.ts → storage.ts → BD
 *
 * Nota sobre imports:
 *   Los alias @shared y @/* son resueltos por Vite/esbuild pero NO por el
 *   runtime de Netlify Functions. Se usan rutas relativas explícitas aquí.
 */

import serverless from "serverless-http";
import express from "express";
import { registerRoutes } from "../../server/routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// registerRoutes registra los endpoints y retorna un Server HTTP.
// En Netlify ignoramos el Server — serverless-http maneja el lifecycle.
await registerRoutes(app);

export const handler = serverless(app);
