"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Clapperboard,
  Film,
  Globe,
  Inbox,
  LogOut,
  Plus,
  Users,
  type LucideIcon,
} from "lucide-react";
import { StudioNotifications } from "@/components/studio/StudioNotifications";

type Role = "admin" | "manager" | "worker";

type Note = {
  id: string;
  title: string;
  body: string;
  href: string | null;
  readAt: Date | string | null;
  createdAt: Date | string;
};

type NavLink = {
  href: string;
  label: string;
  icon: LucideIcon;
  match: (p: string) => boolean;
};

export function StudioHeader({
  name,
  role,
  canPublish,
  canManageTeam,
  signOutAction,
  notifications = [],
  unreadCount = 0,
}: {
  name: string;
  role: Role;
  canPublish: boolean;
  canManageTeam: boolean;
  signOutAction: () => Promise<void>;
  notifications?: Note[];
  unreadCount?: number;
}) {
  const pathname = usePathname() ?? "/studio";
  const [profileOpen, setProfileOpen] = useState(false);
  const initial = name.trim().charAt(0).toUpperCase() || "R";

  const links: NavLink[] = [
    {
      href: "/studio",
      label: "Events",
      icon: Clapperboard,
      match: (p) =>
        p === "/studio" ||
        (p.startsWith("/studio/events/") &&
          !p.startsWith("/studio/events/new")),
    },
    ...(canPublish
      ? [
          {
            href: "/studio/inquiries",
            label: "Enquiries",
            icon: Inbox,
            match: (p: string) => p.startsWith("/studio/inquiries"),
          } satisfies NavLink,
          {
            href: "/studio/events/new",
            label: "New",
            icon: Plus,
            match: (p: string) => p.startsWith("/studio/events/new"),
          } satisfies NavLink,
        ]
      : []),
    ...(canManageTeam
      ? [
          {
            href: "/studio/team",
            label: "Team",
            icon: Users,
            match: (p: string) => p.startsWith("/studio/team"),
          } satisfies NavLink,
        ]
      : []),
  ];

  return (
    <>
      {/* —— Mobile top bar (Lunar-style) —— */}
      <header className="sticky top-0 z-40 flex items-center justify-between gap-3 border-b border-white/10 bg-noir/95 px-3 py-2.5 backdrop-blur-xl lg:hidden">
        <Link
          href="/studio"
          className="font-sans text-[13px] font-semibold uppercase leading-none tracking-[0.16em] text-white"
        >
          Reel<span className="text-platinum">Now</span>
        </Link>
        <div className="flex shrink-0 items-center gap-1.5">
          <StudioNotifications
            items={notifications}
            unreadCount={unreadCount}
            buttonClassName="flex h-10 w-10 items-center justify-center rounded-xl border-0 bg-white/[0.08] text-platinum hover:bg-white/15 hover:text-platinum"
          />
          <Link
            href="/"
            aria-label="Public site"
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.08] text-platinum/90 transition-colors hover:bg-white/15"
          >
            <Globe className="h-4 w-4" />
          </Link>
          <button
            type="button"
            aria-label="Profile"
            aria-expanded={profileOpen}
            onClick={() => setProfileOpen((open) => !open)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-platinum/30 bg-platinum font-sans text-sm font-semibold text-noir"
          >
            {initial}
          </button>
        </div>
        {profileOpen && (
          <>
            <button
              type="button"
              aria-label="Close profile"
              className="fixed inset-0 z-40 cursor-default"
              onClick={() => setProfileOpen(false)}
            />
            <div className="absolute right-3 top-[calc(100%+0.45rem)] z-50 w-60 overflow-hidden rounded-2xl border border-platinum/15 bg-charcoal shadow-[0_20px_50px_rgba(0,0,0,0.55)]">
              <div className="flex items-center gap-3 px-4 py-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-platinum font-sans text-base font-semibold text-noir">
                  {initial}
                </span>
                <div className="min-w-0">
                  <p className="truncate font-sans text-sm font-semibold text-platinum">
                    {name}
                  </p>
                  <p className="mt-0.5 font-sans text-[10px] font-semibold uppercase tracking-[0.14em] text-silver">
                    {role}
                  </p>
                </div>
              </div>
              <form action={signOutAction} className="border-t border-platinum/10">
                <button
                  type="submit"
                  className="flex w-full items-center gap-2 px-4 py-3.5 font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-silver hover:bg-white/5 hover:text-platinum"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  Sign out
                </button>
              </form>
            </div>
          </>
        )}
      </header>

      {/* —— Desktop top bar —— */}
      <header className="sticky top-0 z-40 hidden border-b border-white/10 bg-noir/75 backdrop-blur-xl lg:block">
        <div className="flex w-full items-center justify-between gap-4 px-6 py-4 xl:px-12">
          <Link href="/studio" className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-platinum/25 bg-platinum/10 text-platinum">
              <Film className="h-4 w-4" />
            </span>
            <span>
              <span className="block font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-white">
                Reel<span className="text-platinum">Now</span>
              </span>
              <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-silver">
                Studio
              </span>
            </span>
          </Link>

          <nav className="flex items-center gap-1">
            {links.map((link) => {
              const active = link.match(pathname);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-full px-4 py-2 font-sans text-[11px] font-semibold uppercase tracking-[0.16em] transition-colors ${
                    active
                      ? "bg-platinum text-noir"
                      : "text-silver hover:bg-white/5 hover:text-platinum"
                  }`}
                >
                  {link.label === "New" ? "New event" : link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <StudioNotifications
              items={notifications}
              unreadCount={unreadCount}
            />
            <div className="text-right">
              <p className="font-sans text-xs font-semibold text-platinum">
                {name}
              </p>
              <p className="font-sans text-[10px] uppercase tracking-[0.16em] text-silver">
                {role}
              </p>
            </div>
            <Link
              href="/"
              aria-label="Public site"
              title="Public site"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-platinum/20 text-silver transition-colors hover:border-platinum/40 hover:text-platinum"
            >
              <Globe className="h-3.5 w-3.5" />
            </Link>
            <form action={signOutAction}>
              <button
                type="submit"
                aria-label="Sign out"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-platinum/20 text-silver transition-colors hover:border-platinum/40 hover:text-platinum"
              >
                <LogOut className="h-3.5 w-3.5" />
              </button>
            </form>
          </div>
        </div>
      </header>

      {/* —— Mobile bottom tabs —— */}
      <nav
        className="glass-tabbar fixed inset-x-0 bottom-0 z-50 flex gap-1 px-2 pb-[max(0.45rem,env(safe-area-inset-bottom))] pt-2 lg:hidden"
        aria-label="Studio sections"
      >
        {links.map((link) => {
          const Icon = link.icon;
          const active = link.match(pathname);
          return (
            <Link
              key={link.href}
              href={link.href}
              aria-current={active ? "page" : undefined}
              className={`relative grid min-w-0 flex-1 justify-items-center gap-0.5 px-1 pb-2.5 pt-2 transition-colors ${
                active
                  ? "glass-tab-on text-platinum"
                  : "text-silver/75 hover:text-platinum"
              }`}
            >
              <Icon className="h-5 w-5" strokeWidth={active ? 2.25 : 1.75} />
              <span className="max-w-full truncate font-sans text-[10px] font-bold tracking-wide">
                {link.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
