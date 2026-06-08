import { Pool, neonConfig } from "@neondatabase/serverless";
import { drizzle, type NeonDatabase } from "drizzle-orm/neon-serverless";
import ws from "ws";
import * as schema from "@shared/schema";
import fs from "node:fs";
import path from "node:path";

neonConfig.webSocketConstructor = ws;

// S2-B3: tipos explícitos — elimina 'any' en db y pool.
// En desarrollo sin DATABASE_URL, db y pool son undefined de forma tipada.
// storage.ts elige la implementación correcta basándose en hasDatabase.
type AppDb = NeonDatabase<typeof schema>;
type AppPool = Pool;

let pool: AppPool | undefined;
let db: AppDb | undefined;
let hasDatabase = false;

if (process.env.DATABASE_URL) {
  pool = new Pool({ connectionString: process.env.DATABASE_URL });
  db = drizzle({ client: pool, schema });
  hasDatabase = true;
} else {
  const sqliteFile =
    process.env.SQLITE_FILE || path.resolve(process.cwd(), "dev.sqlite");

  if (fs.existsSync(sqliteFile)) {
    console.warn(
      `DATABASE_URL no configurado — usando SQLite local: ${sqliteFile}`,
    );
  } else {
    console.warn(
      "DATABASE_URL no configurado — usando almacenamiento en memoria (solo desarrollo).",
    );
  }
}

export { pool, db, hasDatabase };
export type { AppDb, AppPool };
