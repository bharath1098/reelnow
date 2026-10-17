import { and, desc, eq, inArray, isNull } from "drizzle-orm";
import { db } from "@/db";
import { notifications, users, type NotificationType } from "@/db/schema";

export async function notifyRoles(
  roles: Array<"admin" | "manager" | "worker">,
  payload: {
    type: NotificationType;
    title: string;
    body: string;
    href?: string;
    inquiryId?: string;
    eventId?: string;
  },
) {
  const recipients = await db
    .select({ id: users.id })
    .from(users)
    .where(inArray(users.role, roles));

  if (recipients.length === 0) return;

  const now = new Date();
  await db.insert(notifications).values(
    recipients.map((user) => ({
      id: crypto.randomUUID(),
      userId: user.id,
      type: payload.type,
      title: payload.title,
      body: payload.body,
      href: payload.href ?? null,
      inquiryId: payload.inquiryId ?? null,
      eventId: payload.eventId ?? null,
      createdAt: now,
    })),
  );
}

export async function notifyUser(
  userId: string,
  payload: {
    type: NotificationType;
    title: string;
    body: string;
    href?: string;
    inquiryId?: string;
    eventId?: string;
  },
) {
  await db.insert(notifications).values({
    id: crypto.randomUUID(),
    userId,
    type: payload.type,
    title: payload.title,
    body: payload.body,
    href: payload.href ?? null,
    inquiryId: payload.inquiryId ?? null,
    eventId: payload.eventId ?? null,
    createdAt: new Date(),
  });
}

export async function listNotificationsForUser(userId: string, limit = 30) {
  return db
    .select()
    .from(notifications)
    .where(eq(notifications.userId, userId))
    .orderBy(desc(notifications.createdAt))
    .limit(limit);
}

export async function countUnreadForUser(userId: string) {
  const rows = await db
    .select({ id: notifications.id })
    .from(notifications)
    .where(
      and(eq(notifications.userId, userId), isNull(notifications.readAt)),
    );
  return rows.length;
}
