import { createRequire } from 'module';
const require = createRequire(typeof __filename !== 'undefined' ? __filename : import.meta?.url);

import express from 'express';
import { registerRoutes } from '../../server/routes.js';

const app = express();

// Configurar app como en app.ts
app.use(express.json({
  verify: (req, _res, buf) => {
    req.rawBody = buf;
  }
}));
app.use(express.urlencoded({ extended: false }));

// Registrar rutas de forma asíncrona
(async () => {
  await registerRoutes(app);
})();

export const handler = async (event, context) => {
  // Usar serverless-http para adaptar Express a Netlify
  const serverless = require('serverless-http');
  const handler = serverless(app);
  return handler(event, context);
};