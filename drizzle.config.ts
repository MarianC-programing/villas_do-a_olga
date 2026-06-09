import { defineConfig } from "drizzle-kit";

const connectionString =
  process.env.DATABASE_URL ??
  process.env.NETLIFY_DATABASE_URL ??
  "file:dev.sqlite";

const isPostgres = connectionString.startsWith("postgresql") || connectionString.startsWith("postgres");

export default defineConfig({
  out: "./migrations",
  schema: "./shared/schema.ts",
  dialect: isPostgres ? "postgresql" : "sqlite",
  dbCredentials: isPostgres
    ? { url: connectionString }
    : { url: connectionString },
});
