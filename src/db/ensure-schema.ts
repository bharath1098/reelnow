import { client } from "@/db";

const statements = [
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
  `CREATE INDEX IF NOT EXISTS inquiries_status_idx ON inquiries(status)`,
  `CREATE INDEX IF NOT EXISTS notifications_user_idx ON notifications(user_id)`,
];

let ensured = false;

export async function ensureSchema() {
  if (ensured) return;
  for (const sql of statements) {
    await client.execute(sql);
  }
  try {
    await client.execute(`ALTER TABLE events ADD COLUMN scheduled_at TEXT`);
  } catch {
    /* column already exists */
  }
  try {
    await client.execute(
      `ALTER TABLE events ADD COLUMN shoot_completed INTEGER NOT NULL DEFAULT 1`,
    );
  } catch {
    /* column already exists */
  }

  // One-time: enquiry-approved shoots stay locked until owner confirms completion.
  // Clears leftover placeholder covers from the old approve flow.
  try {
    await client.execute(
      `CREATE TABLE IF NOT EXISTS schema_patches (id TEXT PRIMARY KEY)`,
    );
    const patched = await client.execute(
      `SELECT id FROM schema_patches WHERE id = 'lock_enquiry_shoots_v2'`,
    );
    if (patched.rows.length === 0) {
      // Portfolio / manual events keep media tools unlocked
      await client.execute(`
        UPDATE events
        SET shoot_completed = 1
        WHERE id NOT IN (
          SELECT event_id FROM inquiries
          WHERE event_id IS NOT NULL AND status = 'approved'
        )
      `);
      // Enquiry-approved shoots stay locked until owner confirms
      await client.execute(`
        UPDATE events
        SET shoot_completed = 0
        WHERE id IN (
          SELECT event_id FROM inquiries
          WHERE event_id IS NOT NULL AND status = 'approved'
        )
      `);
      await client.execute(`
        DELETE FROM clips
        WHERE kind = 'cover'
          AND event_id IN (
            SELECT event_id FROM inquiries
            WHERE event_id IS NOT NULL AND status = 'approved'
          )
          AND event_id IN (
            SELECT id FROM events WHERE shoot_completed = 0
          )
      `);
      await client.execute(
        `INSERT INTO schema_patches (id) VALUES ('lock_enquiry_shoots_v2')`,
      );
    }
  } catch {
    /* patch tables may not be ready */
  }

  ensured = true;
}
