"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { Bell } from "lucide-react";
import { useStudioAuth } from "@/components/studio/StudioAuthProvider";

type Note = {
  id: string;
  title: string;
  body: string;
  href: string | null;
  readAt: Date | string | null;
  createdAt: Date | string;
};

export function StudioNotifications({
  items,
  unreadCount,
  buttonClassName,
}: {
  items: Note[];
  unreadCount: number;
  buttonClassName?: string;
}) {
  const { token } = useStudioAuth();
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  const onOpen = () => {
    setOpen((v) => !v);
    if (!open && unreadCount > 0 && token) {
      startTransition(async () => {
        await fetch("/api/studio/notifications", {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        });
      });
    }
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={onOpen}
        className={
          buttonClassName
            ? `relative ${buttonClassName}`
            : "relative flex h-9 w-9 items-center justify-center rounded-full border border-platinum/20 text-silver transition-colors hover:border-platinum/40 hover:text-platinum"
        }
        aria-label="Notifications"
      >
        <Bell className="h-4 w-4" />
        {unreadCount > 0 && (
          <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 font-sans text-[9px] font-bold text-white">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <>
          <button
            type="button"
            className="fixed inset-0 z-40 cursor-default"
            aria-label="Close notifications"
            onClick={() => setOpen(false)}
          />
          <div className="absolute right-0 z-50 mt-2 w-[320px] overflow-hidden rounded-2xl border border-platinum/15 bg-charcoal shadow-[0_20px_50px_rgba(0,0,0,0.55)]">
            <div className="flex items-center justify-between border-b border-platinum/10 px-4 py-3">
              <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-silver">
                Notifications
              </p>
              {pending && (
                <span className="font-sans text-[10px] text-silver">…</span>
              )}
            </div>
            <div className="max-h-80 overflow-y-auto">
              {items.length === 0 ? (
                <p className="px-4 py-8 text-center font-sans text-sm text-silver">
                  No notifications yet.
                </p>
              ) : (
                items.map((item) => {
                  const content = (
                    <div className="border-b border-platinum/10 px-4 py-3 last:border-0 hover:bg-white/[0.03]">
                      <p className="font-sans text-sm font-semibold text-platinum">
                        {item.title}
                      </p>
                      <p className="mt-1 font-sans text-xs leading-relaxed text-silver">
                        {item.body}
                      </p>
                    </div>
                  );
                  return item.href ? (
                    <Link
                      key={item.id}
                      href={item.href}
                      onClick={() => setOpen(false)}
                    >
                      {content}
                    </Link>
                  ) : (
                    <div key={item.id}>{content}</div>
                  );
                })
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
