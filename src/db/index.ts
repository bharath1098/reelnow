import { createClient, type Client } from "@libsql/client";
import { drizzle, type LibSQLDatabase } from "drizzle-orm/libsql";
import * as schema from "./schema";

function databaseUrl() {
  const url = process.env.TURSO_DATABASE_URL;
  if (url) return url;
  if (process.env.VERCEL) {
    throw new Error("TURSO_DATABASE_URL is not set");
  }
  return "file:./data/reelnow.db";
}

let clientInstance: Client | null = null;
let dbInstance: LibSQLDatabase<typeof schema> | null = null;

function getClient() {
  if (!clientInstance) {
    clientInstance = createClient({
      url: databaseUrl(),
      authToken: process.env.TURSO_AUTH_TOKEN || undefined,
    });
  }
  return clientInstance;
}

function getDb() {
  if (!dbInstance) {
    dbInstance = drizzle(getClient(), { schema });
  }
  return dbInstance;
}

/** Opens the database on first use so `next build` does not touch a local file. */
export const client = new Proxy({} as Client, {
  get(_target, prop, receiver) {
    const real = getClient();
    const value = Reflect.get(real, prop, receiver);
    return typeof value === "function" ? value.bind(real) : value;
  },
});

export const db = new Proxy({} as LibSQLDatabase<typeof schema>, {
  get(_target, prop, receiver) {
    const real = getDb();
    const value = Reflect.get(real, prop, receiver);
    return typeof value === "function" ? value.bind(real) : value;
  },
});
