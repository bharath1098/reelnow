"use client";

import { useEffect, useState } from "react";
import { useStudioAuth } from "@/components/studio/StudioAuthProvider";
import { StudioEventsCatalog } from "@/components/studio/StudioEventsCatalog";
import { canPublish } from "@/lib/roles";
import type { WorkEvent } from "@/lib/work";

export default function StudioHome() {
  const { user, token } = useStudioAuth();
  const [events, setEvents] = useState<WorkEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;
    let alive = true;
    (async () => {
      setLoading(true);
      const res = await fetch("/api/studio/events", {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
      });
      if (!alive) return;
      if (res.ok) {
        const data = await res.json();
        setEvents(data.events ?? []);
      }
      setLoading(false);
    })();
    return () => {
      alive = false;
    };
  }, [token]);

  if (!user) return null;

  if (loading) {
    return (
      <p className="font-sans text-sm text-silver">Loading events…</p>
    );
  }

  return (
    <StudioEventsCatalog
      events={events}
      publish={canPublish(user.role)}
      workerMode={user.role === "worker"}
      studioToken={token}
    />
  );
}
