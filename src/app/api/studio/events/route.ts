import { NextResponse } from "next/server";
import { getEventsForUser } from "@/db/queries";
import { verifyStudioToken } from "@/lib/studio-jwt";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const auth = req.headers.get("authorization");
  const token = auth?.toLowerCase().startsWith("bearer ")
    ? auth.slice(7).trim()
    : req.headers.get("x-studio-token");
  const user = await verifyStudioToken(token);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const events = await getEventsForUser(user.id, user.role);
  return NextResponse.json({ events, user });
}
