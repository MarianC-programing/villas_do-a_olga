/**
 * netlify/functions/api.ts — DESACTIVADO
 *
 * La API de contacto fue reemplazada por links directos a WhatsApp y email.
 * Este archivo se mantiene como placeholder para funciones futuras.
 */

import type { Handler } from "@netlify/functions";

export const handler: Handler = async () => {
  return {
    statusCode: 200,
    body: JSON.stringify({ status: "ok" }),
  };
};
