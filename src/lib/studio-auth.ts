import { headers } from "next/headers";
import { verifyStudioToken, type StudioTokenPayload } from "@/lib/studio-jwt";
import { canManageTeam, canPublish } from "@/lib/roles";

export async function readStudioTokenFromRequest(
  formData?: FormData | null,
): Promise<string | null> {
  const fromForm = formData
    ? String(formData.get("_studioToken") ?? "").trim()
    : "";
  if (fromForm) return fromForm;

  const h = await headers();
  const bearer = h.get("authorization");
  if (bearer?.toLowerCase().startsWith("bearer ")) {
    return bearer.slice(7).trim();
  }
  return h.get("x-studio-token");
}

export async function requireStudioUser(
  formData?: FormData | null,
): Promise<StudioTokenPayload> {
  const token = await readStudioTokenFromRequest(formData);
  const user = await verifyStudioToken(token);
  if (!user) throw new Error("Not allowed");
  return user;
}

export async function requireStudioPublisher(formData?: FormData | null) {
  const user = await requireStudioUser(formData);
  if (!canPublish(user.role)) throw new Error("Not allowed");
  return user;
}

export async function requireStudioAdmin(formData?: FormData | null) {
  const user = await requireStudioUser(formData);
  if (!canManageTeam(user.role)) throw new Error("Admin only");
  return user;
}
