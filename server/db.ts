import { Pool, neonConfig } from "@neondatabase/serverless";
import { drizzle, type NeonDatabase } from "drizzle-orm/neon-serverless";
import ws from "ws";
import * as schema from "@shared/schema";
import fs from "node:fs";
import path from "node:path";

neonConfig.webSocketConstructor = ws;

type AppDb = NeonDatabase<typeof schema>;
type AppPool = Pool;

let pool: AppPool | undefined;
let db: AppDb | undefined;
let hasDatabase = false;

// Neon crea automaticamente NETLIFY_DATABASE_URL en Netlify cuando conectas la BD.
// En local usamos DATABASE_URL del .env.
// Fallback chain: DATABASE_URL -> NETLIFY_DATABASE_URL -> SQLite -> Memory
const connectionString =
  process.env.DATABASE_URL ??
  process.env.NETLIFY_DATABASE_URL ??
  undefined;

if (connectionString) {
  pool = new Pool({ connectionString });
  db = drizzle({ client: pool, schema });
  hasDatabase = true;
} else {
  const sqliteFile =
    process.env.SQLITE_FILE || path.resolve(process.cwd(), "dev.sqlite");

  if (fs.existsSync(sqliteFile)) {
    console.warn(`Sin DATABASE_URL — usando SQLite local: ${sqliteFile}`);
  } else {
    console.warn("Sin DATABASE_URL — usando almacenamiento en memoria (solo desarrollo).");
  }
}

export { pool, db, hasDatabase };
export type { AppDb, AppPool };
