import { existsSync, mkdirSync, readFileSync } from "node:fs";
import { dirname } from "node:path";

if (existsSync(".env.local")) {
  for (const line of readFileSync(".env.local", "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq);
    const val = trimmed.slice(eq + 1);
    if (!process.env[key]) process.env[key] = val;
  }
}
import bcrypt from "bcryptjs";
import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { WORK_EVENTS } from "./seed-catalog";
import * as schema from "../src/db/schema";

const url = process.env.TURSO_DATABASE_URL ?? "file:./data/reelnow.db";
if (url.startsWith("file:")) {
  const file = url.replace(/^file:/, "");
  mkdirSync(dirname(file), { recursive: true });
}

const client = createClient({
  url,
  authToken: process.env.TURSO_AUTH_TOKEN || undefined,
});
const db = drizzle(client, { schema });

const ddl = [
  `CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    password_hash TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'worker',
    created_at INTEGER NOT NULL
  )`,
  `CREATE TABLE IF NOT EXISTS events (
    id TEXT PRIMARY KEY,
    category_id TEXT NOT NULL,
    title TEXT NOT NULL,
    subtitle TEXT,
    created_by TEXT,
    created_at INTEGER NOT NULL,
    updated_at INTEGER NOT NULL
  )`,
  `CREATE TABLE IF NOT EXISTS sections (
    id TEXT PRIMARY KEY,
    event_id TEXT NOT NULL,
    label TEXT NOT NULL,
    sort_order INTEGER NOT NULL DEFAULT 0
  )`,
  `CREATE TABLE IF NOT EXISTS clips (
    id TEXT PRIMARY KEY,
    event_id TEXT NOT NULL,
    section_id TEXT,
    kind TEXT NOT NULL,
    title TEXT NOT NULL,
    subtitle TEXT,
    image TEXT NOT NULL,
    source TEXT NOT NULL,
    youtube_id TEXT,
    video_url TEXT,
    audio_url TEXT,
    sort_order INTEGER NOT NULL DEFAULT 0
  )`,
  `CREATE TABLE IF NOT EXISTS event_assignments (
    event_id TEXT NOT NULL,
    user_id TEXT NOT NULL,
    PRIMARY KEY (event_id, user_id)
  )`,
  `CREATE TABLE IF NOT EXISTS inquiries (
    id TEXT PRIMARY KEY,
    status TEXT NOT NULL DEFAULT 'pending',
    full_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    package_name TEXT NOT NULL,
    details TEXT,
    address TEXT,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    country TEXT NOT NULL DEFAULT 'India',
    preferred_date TEXT NOT NULL,
    preferred_time TEXT NOT NULL,
    event_id TEXT,
    reviewed_by TEXT,
    created_at INTEGER NOT NULL
  )`,
  `CREATE TABLE IF NOT EXISTS notifications (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    type TEXT NOT NULL,
    title TEXT NOT NULL,
    body TEXT NOT NULL,
    href TEXT,
    inquiry_id TEXT,
    event_id TEXT,
    read_at INTEGER,
    created_at INTEGER NOT NULL
  )`,
];

async function main() {
  for (const sql of ddl) {
    await client.execute(sql);
  }
  try {
    await client.execute(`ALTER TABLE events ADD COLUMN scheduled_at TEXT`);
  } catch {
    /* already exists */
  }

  const now = Date.now();
  const password = process.env.SEED_PASSWORD ?? "ReelNow123!";
  const hash = await bcrypt.hash(password, 10);

  const seedUsers = [
    {
      id: "user-admin",
      email: "admin@reelnow.in",
      name: "Admin",
      role: "admin" as const,
    },
    {
      id: "user-manager",
      email: "manager@reelnow.in",
      name: "Manager",
      role: "manager" as const,
    },
    {
      id: "user-worker",
      email: "worker@reelnow.in",
      name: "Worker",
      role: "worker" as const,
    },
  ];

  for (const user of seedUsers) {
    await db
      .insert(schema.users)
      .values({
        ...user,
        passwordHash: hash,
        createdAt: new Date(now),
      })
      .onConflictDoNothing();
  }

  for (const event of WORK_EVENTS) {
    await db
      .insert(schema.events)
      .values({
        id: event.id,
        categoryId: event.categoryId,
        title: event.title,
        subtitle: event.subtitle ?? null,
        createdBy: "user-admin",
        createdAt: new Date(now),
        updatedAt: new Date(now),
      })
      .onConflictDoNothing();

    const cover = event.cover;
    await db
      .insert(schema.clips)
      .values({
        id: cover.id,
        eventId: event.id,
        sectionId: null,
        kind: "cover",
        title: cover.title,
        subtitle: cover.subtitle ?? null,
        image: cover.image,
        source: cover.source,
        youtubeId: cover.source === "youtube" ? cover.youtubeId : null,
        videoUrl: cover.source === "file" ? cover.video : null,
        audioUrl: cover.source === "file" ? cover.audio ?? null : null,
        sortOrder: 0,
      })
      .onConflictDoNothing();

    for (const [i, clip] of (event.gallery ?? []).entries()) {
      await db
        .insert(schema.clips)
        .values({
          id: clip.id,
          eventId: event.id,
          sectionId: null,
          kind: "gallery",
          title: clip.title,
          subtitle: clip.subtitle ?? null,
          image: clip.image,
          source: clip.source,
          youtubeId: clip.source === "youtube" ? clip.youtubeId : null,
          videoUrl: clip.source === "file" ? clip.video : null,
          audioUrl: clip.source === "file" ? clip.audio ?? null : null,
          sortOrder: i,
        })
        .onConflictDoNothing();
    }

    for (const [s, section] of (event.sections ?? []).entries()) {
      await db
        .insert(schema.sections)
        .values({
          id: `${event.id}-${section.id}`,
          eventId: event.id,
          label: section.label,
          sortOrder: s,
        })
        .onConflictDoNothing();
      for (const [c, clip] of section.clips.entries()) {
        await db
          .insert(schema.clips)
          .values({
            id: clip.id,
            eventId: event.id,
            sectionId: `${event.id}-${section.id}`,
            kind: "section",
            title: clip.title,
            subtitle: clip.subtitle ?? null,
            image: clip.image,
            source: clip.source,
            youtubeId: clip.source === "youtube" ? clip.youtubeId : null,
            videoUrl: clip.source === "file" ? clip.video : null,
            audioUrl: clip.source === "file" ? clip.audio ?? null : null,
            sortOrder: c,
          })
          .onConflictDoNothing();
      }
    }
  }

  console.log("Seeded Turso/local DB.");
  console.log("Logins (password for all):", password);
  console.log("  admin@reelnow.in   → admin");
  console.log("  manager@reelnow.in → manager");
  console.log("  worker@reelnow.in  → worker");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
