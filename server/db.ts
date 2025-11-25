import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";
import fs from "node:fs";
import path from "node:path";

neonConfig.webSocketConstructor = ws;

// If DATABASE_URL is not provided, we don't fail hard in dev —
// allow the app to run with an in-memory fallback storage.
let pool: any = undefined;
let db: any = undefined;
let hasDatabase = false;

if (process.env.DATABASE_URL) {
  pool = new Pool({ connectionString: process.env.DATABASE_URL });
  db = drizzle({ client: pool, schema });
  hasDatabase = true;
} else {
  const sqliteFile = process.env.SQLITE_FILE || path.resolve(process.cwd(), "dev.sqlite");
  if (fs.existsSync(sqliteFile)) {
    console.warn(
      `DATABASE_URL not set — detected local SQLite file at ${sqliteFile}. Using local SQLite storage for development.`,
    );
  } else {
    console.warn(
      'Warning: DATABASE_URL not set — running with in-memory storage for development.',
    );
  }
}

export { pool, db, hasDatabase };
