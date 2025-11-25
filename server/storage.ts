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
import { nanoid } from "nanoid";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createContactSubmission(
    submission: InsertContactSubmission
  ): Promise<ContactSubmission>;
  getAllContactSubmissions(): Promise<ContactSubmission[]>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async createContactSubmission(
    insertSubmission: InsertContactSubmission
  ): Promise<ContactSubmission> {
    const [submission] = await db
      .insert(contactSubmissions)
      .values(insertSubmission)
      .returning();
    return submission;
  }

  async getAllContactSubmissions(): Promise<ContactSubmission[]> {
    const submissions = await db
      .select()
      .from(contactSubmissions)
      .orderBy(desc(contactSubmissions.createdAt));
    return submissions;
  }
}

// In-memory fallback for development when DATABASE_URL is not set.
export class InMemoryStorage implements IStorage {
  private users: User[] = [] as User[];
  private submissions: ContactSubmission[] = [] as ContactSubmission[];

  async getUser(id: string): Promise<User | undefined> {
    return this.users.find((u) => (u as any).id === id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return this.users.find((u) => (u as any).username === username);
  }

  async createUser(user: InsertUser): Promise<User> {
    const created = { ...(user as any), id: (user as any).id || String(Date.now()) } as User;
    this.users.push(created);
    return created;
  }

  async createContactSubmission(
    submission: InsertContactSubmission,
  ): Promise<ContactSubmission> {
    const created = {
      ...(submission as any),
      id: (submission as any).id || String(Date.now()),
      createdAt: new Date().toISOString(),
    } as ContactSubmission;
    this.submissions.push(created);
    return created;
  }

  async getAllContactSubmissions(): Promise<ContactSubmission[]> {
    // return newest first
    return [...this.submissions].sort((a, b) =>
      (b as any).createdAt.localeCompare((a as any).createdAt),
    );
  }
}

export class SQLiteStorage implements IStorage {
  private sql: Database.Database;

  constructor(dbFile?: string) {
    const file = dbFile || process.env.SQLITE_FILE || path.resolve(process.cwd(), "dev.sqlite");
    this.sql = new Database(file);

    // create tables if they don't exist
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
    const row = this.sql.prepare(`SELECT id, username, password FROM users WHERE id = ? LIMIT 1`).get(id);
    if (!row) return undefined;
    return row as unknown as User;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const row = this.sql.prepare(`SELECT id, username, password FROM users WHERE username = ? LIMIT 1`).get(username);
    if (!row) return undefined;
    return row as unknown as User;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = (insertUser as any).id || nanoid();
    this.sql.prepare(`INSERT INTO users (id, username, password) VALUES (?, ?, ?)`).run(id, insertUser.username, insertUser.password);
    const row = this.sql.prepare(`SELECT id, username, password FROM users WHERE id = ? LIMIT 1`).get(id);
    return row as unknown as User;
  }

  async createContactSubmission(insertSubmission: InsertContactSubmission): Promise<ContactSubmission> {
    const id = (insertSubmission as any).id || nanoid();
    const createdAt = new Date().toISOString();
    this.sql.prepare(`INSERT INTO contact_submissions (id, name, email, phone, message, created_at) VALUES (?, ?, ?, ?, ?, ?)`)
      .run(id, insertSubmission.name, insertSubmission.email, insertSubmission.phone || null, insertSubmission.message, createdAt);
    const row = this.sql.prepare(`SELECT id, name, email, phone, message, created_at as createdAt FROM contact_submissions WHERE id = ? LIMIT 1`).get(id);
    return row as unknown as ContactSubmission;
  }

  async getAllContactSubmissions(): Promise<ContactSubmission[]> {
    const rows = this.sql.prepare(`SELECT id, name, email, phone, message, created_at as createdAt FROM contact_submissions ORDER BY created_at DESC`).all();
    return rows as unknown as ContactSubmission[];
  }
}

export const storage: IStorage = hasDatabase
  ? new DatabaseStorage()
  : new SQLiteStorage();
