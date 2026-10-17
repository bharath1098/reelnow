import { db } from "@/db";
import { users } from "@/db/schema";
import { TeamManager } from "@/components/studio/TeamManager";

export const dynamic = "force-dynamic";

export default async function TeamPage() {
  const team = await db.select().from(users);

  return (
    <TeamManager
      team={team.map((user) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      }))}
    />
  );
}
