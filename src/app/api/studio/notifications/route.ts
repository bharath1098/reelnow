import { NextResponse } from "next/server";
import { and, eq, isNull } from "drizzle-orm";
import { db } from "@/db";
import { ensureSchema } from "@/db/ensure-schema";
import { notifications } from "@/db/schema";
import { verifyStudioToken } from "@/lib/studio-jwt";
import {
  countUnreadForUser,
  listNotificationsForUser,
} from "@/lib/notifications";

export const dynamic = "force-dynamic";

async function userFromReq(req: Request) {
  const auth = req.headers.get("authorization");
  const token = auth?.toLowerCase().startsWith("bearer ")
    ? auth.slice(7).trim()
    : req.headers.get("x-studio-token");
  return verifyStudioToken(token);
}

export async function GET(req: Request) {
  const user = await userFromReq(req);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  await ensureSchema();
  const items = await listNotificationsForUser(user.id);
  const unreadCount = await countUnreadForUser(user.id);
  return NextResponse.json({ items, unreadCount });
}

export async function POST(req: Request) {
  const user = await userFromReq(req);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  await ensureSchema();
  await db
    .update(notifications)
    .set({ readAt: new Date() })
    .where(
      and(eq(notifications.userId, user.id), isNull(notifications.readAt)),
    );
  return NextResponse.json({ ok: true });
}
