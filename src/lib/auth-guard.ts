import "server-only";

import { auth } from "@/auth";
import { canManageTeam, canPublish, type Role } from "@/lib/roles";

export { canManageTeam, canPublish, type Role };

export async function requireUser() {
  const session = await auth();
  if (!session?.user?.id) {
    return null;
  }
  return session.user;
}
