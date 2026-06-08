import {
  users,
  contactSubmissions,
  type User,
  type InsertUser,
  type ContactSubmission,
  type InsertContactSubmission,
} from "@shared/schema";
import { db, hasDatabase } from "./db";
import { eq, desc } from "drizzle-orm";
import Database from "better-sqlite3";
import path from "node:path";

const generateId = (): string => crypto.randomUUID();

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
  getAllContactSubmissions(): Promise<ContactSubmission[]>;
}

export class DatabaseStorage implements IStorage {
  // S2-B3: guard explícito — TypeScript ahora sabe que db puede ser undefined.
  // Sin este getter, db.select() crashea en runtime con mensaje poco claro.
  private get client() {
    if (!db) throw new Error("DATABASE_URL no configurado — DatabaseStorage requiere PostgreSQL.");
    return db;
  }

  async getUser(id: string): Promise<User | undefined> {
    const [user] = await this.client.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await this.client.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await this.client.insert(users).values(insertUser).returning();
    return user;
  }

  async createContactSubmission(insertSubmission: InsertContactSubmission): Promise<ContactSubmission> {
    const [submission] = await this.client
      .insert(contactSubmissions)
      .values(insertSubmission)
      .returning();
    return submission;
  }

  async getAllContactSubmissions(): Promise<ContactSubmission[]> {
    return this.client
      .select()
      .from(contactSubmissions)
      .orderBy(desc(contactSubmissions.createdAt));
  }
}

export class InMemoryStorage implements IStorage {
  private users: User[] = [];
  private submissions: ContactSubmission[] = [];

  async getUser(id: string): Promise<User | undefined> {
    return this.users.find((u) => u.id === id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return this.users.find((u) => u.username === username);
  }

  async createUser(user: InsertUser): Promise<User> {
    const created: User = { ...user, id: generateId() };
    this.users.push(created);
    return created;
  }

  async createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission> {
    const created: ContactSubmission = {
      ...submission,
      phone: submission.phone ?? null,
      id: generateId(),
      createdAt: new Date(),
    };
    this.submissions.push(created);
    return created;
  }

  async getAllContactSubmissions(): Promise<ContactSubmission[]> {
    return [...this.submissions].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }
}

export class SQLiteStorage implements IStorage {
  private sql: Database.Database;

  constructor(dbFile?: string) {
    const file = dbFile || process.env.SQLITE_FILE || path.resolve(process.cwd(), "dev.sqlite");
    this.sql = new Database(file);
    this.sql.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      );
      CREATE TABLE IF NOT EXISTS contact_submissions (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT,
        message TEXT NOT NULL,
        created_at TEXT NOT NULL
      );
    `);
  }

  async getUser(id: string): Promise<User | undefined> {
    const row = this.sql
      .prepare(`SELECT id, username, password FROM users WHERE id = ? LIMIT 1`)
      .get(id);
    return row ? (row as User) : undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const row = this.sql
      .prepare(`SELECT id, username, password FROM users WHERE username = ? LIMIT 1`)
      .get(username);
    return row ? (row as User) : undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = generateId();
    this.sql
      .prepare(`INSERT INTO users (id, username, password) VALUES (?, ?, ?)`)
      .run(id, insertUser.username, insertUser.password);
    return this.sql
      .prepare(`SELECT id, username, password FROM users WHERE id = ? LIMIT 1`)
      .get(id) as User;
  }

  async createContactSubmission(insertSubmission: InsertContactSubmission): Promise<ContactSubmission> {
    const id = generateId();
    const createdAtIso = new Date().toISOString();
    this.sql
      .prepare(`INSERT INTO contact_submissions (id, name, email, phone, message, created_at) VALUES (?, ?, ?, ?, ?, ?)`)
      .run(id, insertSubmission.name, insertSubmission.email, insertSubmission.phone ?? null, insertSubmission.message, createdAtIso);

    type RawRow = { id: string; name: string; email: string; phone: string | null; message: string; createdAt: string };
    const row = this.sql
      .prepare(`SELECT id, name, email, phone, message, created_at as createdAt FROM contact_submissions WHERE id = ? LIMIT 1`)
      .get(id) as RawRow;
    return { ...row, createdAt: new Date(row.createdAt) };
  }

  async getAllContactSubmissions(): Promise<ContactSubmission[]> {
    type RawRow = { id: string; name: string; email: string; phone: string | null; message: string; createdAt: string };
    const rows = this.sql
      .prepare(`SELECT id, name, email, phone, message, created_at as createdAt FROM contact_submissions ORDER BY created_at DESC`)
      .all() as RawRow[];
    return rows.map((row) => ({ ...row, createdAt: new Date(row.createdAt) }));
  }
}

export const storage: IStorage = hasDatabase
  ? new DatabaseStorage()
  : new SQLiteStorage();
