import { and, eq, inArray } from "drizzle-orm";
import { db } from "@/db";
import { clips, eventAssignments, events, sections } from "@/db/schema";
import type { Role } from "@/db/schema";
import { WORK_CATEGORIES, type WorkEvent } from "@/lib/work";
import { assembleEvent } from "@/db/map-event";

async function hydrate(eventRows: (typeof events.$inferSelect)[]) {
  if (eventRows.length === 0) return [];
  const ids = eventRows.map((row) => row.id);
  const [sectionRows, clipRows] = await Promise.all([
    db.select().from(sections).where(inArray(sections.eventId, ids)),
    db.select().from(clips).where(inArray(clips.eventId, ids)),
  ]);
  return eventRows.map((row) => assembleEvent(row, sectionRows, clipRows));
}

/** Public catalog — only events that have a main reel. */
export async function getAllEvents(): Promise<WorkEvent[]> {
  const rows = await db.select().from(events);
  return (await hydrate(rows)).filter((event) => Boolean(event.cover));
}

export async function getEventsByCategory(categoryId: string) {
  const rows = await db
    .select()
    .from(events)
    .where(eq(events.categoryId, categoryId));
  return (await hydrate(rows)).filter((event) => Boolean(event.cover));
}

export async function getEvent(categoryId: string, eventId: string) {
  const rows = await db
    .select()
    .from(events)
    .where(and(eq(events.id, eventId), eq(events.categoryId, categoryId)));
  const [event] = await hydrate(rows);
  return event;
}

export async function getFeaturedWork(): Promise<WorkEvent[]> {
  const all = await getAllEvents();
  return WORK_CATEGORIES.map((cat) =>
    all.find((event) => event.categoryId === cat.id)
  ).filter((event): event is WorkEvent => Boolean(event));
}

export async function getEventsForUser(userId: string, role: Role) {
  // Admin + manager see the full studio catalog
  if (role === "admin" || role === "manager") {
    const rows = await db.select().from(events);
    return hydrate(rows);
  }
  const assigned = await db
    .select({ eventId: eventAssignments.eventId })
    .from(eventAssignments)
    .where(eq(eventAssignments.userId, userId));
  const ids = assigned.map((row) => row.eventId);
  if (ids.length === 0) return [];
  const rows = await db.select().from(events).where(inArray(events.id, ids));
  return hydrate(rows);
}

export function canMutateEvent(
  role: Role,
  _userId: string,
  _event: { createdBy: string | null },
) {
  return role === "admin" || role === "manager";
}
