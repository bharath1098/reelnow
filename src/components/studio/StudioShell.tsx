"use client";

import { useEffect, useState } from "react";
import { StudioHeader } from "@/components/studio/StudioHeader";
import { useStudioAuth } from "@/components/studio/StudioAuthProvider";
import { canManageTeam, canPublish } from "@/lib/roles";

type Note = {
  id: string;
  title: string;
  body: string;
  href: string | null;
  readAt: Date | string | null;
  createdAt: Date | string;
};

export function StudioShell({ children }: { children: React.ReactNode }) {
  const { user, token, signOut } = useStudioAuth();
  const [notifications, setNotifications] = useState<Note[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (!token) return;
    let alive = true;
    async function load() {
      const res = await fetch("/api/studio/notifications", {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
      });
      if (!res.ok || !alive) return;
      const data = await res.json();
      if (!alive) return;
      setNotifications(data.items ?? []);
      setUnreadCount(data.unreadCount ?? 0);
    }
    load();
    const t = window.setInterval(load, 20000);
    return () => {
      alive = false;
      window.clearInterval(t);
    };
  }, [token]);

  if (!user) return null;

  return (
    <div className="relative min-h-screen overflow-hidden bg-noir text-platinum">
      <div className="pointer-events-none absolute -left-24 top-24 h-80 w-80 rounded-full bg-platinum/[0.06] blur-[120px]" />
      <div className="pointer-events-none absolute -right-16 bottom-10 h-72 w-72 rounded-full bg-silver/10 blur-[110px]" />
      <StudioHeader
        name={user.name}
        role={user.role}
        canPublish={canPublish(user.role)}
        canManageTeam={canManageTeam(user.role)}
        signOutAction={async () => {
          signOut();
        }}
        notifications={notifications}
        unreadCount={unreadCount}
      />
      <main className="relative w-full px-4 py-5 pb-[calc(5.5rem+env(safe-area-inset-bottom))] sm:px-6 sm:py-8 lg:px-10 lg:pb-10 xl:px-12">
        {children}
      </main>
    </div>
  );
}
