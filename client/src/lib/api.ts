/**
 * lib/api.ts
 * Centralizacion de endpoints de la API.
 *
 * Por que centralizar:
 * - Un solo lugar para cambiar URLs si el backend cambia
 * - Evita buscar strings de URLs dispersos por el codigo
 * - Facilita pruebas y mocking
 *
 * Nota sobre nombres de endpoints:
 * /api/message en lugar de /api/contact — los ad-blockers bloquean
 * URLs que contienen "contact" (ERR_BLOCKED_BY_CLIENT).
 * /api/submissions en lugar de /api/contact-submissions — misma razon.
 */

export const API = {
  message:     "/api/message",
  submissions: "/api/submissions",
} as const;
