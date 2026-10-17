"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ArrowUpRight,
  Film,
  Instagram,
  MapPin,
  Phone,
  Mail,
  Youtube,
} from "lucide-react";

const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "") || "919010994207";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hi ReelNow! I'd like to book a shoot.",
)}`;

const explore = [
  { label: "Home", href: "/", type: "route" as const },
  { label: "Work", href: "/work", type: "route" as const },
  { label: "Packages", href: "#services", type: "hash" as const },
  { label: "Why us", href: "#why", type: "hash" as const },
  { label: "Creators", href: "#join", type: "hash" as const },
  { label: "Stories", href: "#testimonials", type: "hash" as const },
  { label: "Contact", href: "#contact", type: "hash" as const },
];

const socials = [
  {
    label: "Instagram",
    href: "https://instagram.com/reelnow.in",
    Icon: Instagram,
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@reelnow_official",
    Icon: Youtube,
  },
  {
    label: "WhatsApp",
    href: WHATSAPP_URL,
    Icon: null,
  },
];

export default function Footer() {
  const pathname = usePathname();
  const router = useRouter();
  const onHome = pathname === "/";

  const goHash = (href: string) => {
    if (onHome) {
      const el = document.querySelector(href);
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
      return;
    }
    router.push(`/${href}`);
  };

  return (
    <footer className="relative overflow-hidden border-t border-platinum/10 bg-[#0a0a0a] pb-[calc(1.5rem+3.75rem+env(safe-area-inset-bottom))] pt-10 text-platinum lg:pb-10 lg:pt-20">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute left-[10%] top-0 h-64 w-64 rounded-full bg-platinum/[0.06] blur-[100px]" />
        <div className="absolute bottom-0 right-0 h-48 w-48 rounded-full bg-silver/10 blur-[90px]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-platinum/30 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-[1120px] px-4 sm:px-6 lg:px-8">
        {/* Mobile: stacked. Desktop: clean 4-col like Lunar */}
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-x-10 lg:gap-y-0">
          {/* Brand */}
          <div className="flex flex-col items-center text-center lg:col-span-4 lg:items-start lg:text-left">
            <Link href="/" className="mb-3 inline-flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-platinum/25 bg-platinum/10 text-platinum">
                <Film className="h-4 w-4" />
              </span>
              <span className="text-left">
                <span className="block font-sans text-sm font-bold uppercase tracking-[0.18em] text-platinum">
                  ReelNow
                </span>
                <span className="block font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-silver">
                  Instant reels
                </span>
              </span>
            </Link>
            <p className="max-w-[28ch] font-sans text-sm leading-relaxed text-silver lg:max-w-[32ch] lg:text-[15px]">
              Instant cinematic reels, shot on iPhone — for brands, events, and
              creators.
            </p>
            <div className="mt-4 grid w-full grid-cols-2 gap-2 lg:mt-5 lg:flex lg:w-auto lg:flex-wrap">
              <button
                type="button"
                onClick={() => goHash("#contact")}
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-platinum/35 bg-platinum/15 px-4 py-2.5 font-sans text-xs font-bold text-platinum transition-colors hover:border-platinum/50 hover:bg-platinum/20 lg:min-h-0 lg:px-5 lg:py-2.5"
              >
                Book a shoot
              </button>
              <Link
                href="/work"
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.05] px-4 py-2.5 font-sans text-xs font-bold text-platinum transition-colors hover:border-platinum/40 hover:text-platinum lg:min-h-0 lg:px-5 lg:py-2.5"
              >
                View work
              </Link>
            </div>
          </div>

          {/* Explore */}
          <nav aria-label="Explore" className="lg:col-span-2">
            <h5 className="mb-3 text-center font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-silver lg:mb-5 lg:text-left">
              Explore
            </h5>
            {/* Mobile chip grid */}
            <div className="grid grid-cols-2 overflow-hidden rounded-[20px] border border-white/10 bg-white/[0.05] lg:hidden">
              {explore.map((item, i) => {
                const className =
                  "inline-flex min-h-12 items-center justify-start px-4 py-3 font-sans text-sm font-semibold text-platinum/90 transition-colors hover:text-platinum " +
                  (i % 2 === 0 ? "border-r border-white/[0.08] " : "") +
                  (i <
                  explore.length - (explore.length % 2 === 0 ? 2 : 1)
                    ? "border-b border-white/[0.08] "
                    : "");

                if (item.type === "route") {
                  return (
                    <Link key={item.label} href={item.href} className={className}>
                      {item.label}
                    </Link>
                  );
                }
                return (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => goHash(item.href)}
                    className={className}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
            {/* Desktop link list */}
            <div className="hidden flex-col gap-2.5 lg:flex">
              {explore.map((item) =>
                item.type === "route" ? (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="font-sans text-[15px] font-semibold text-platinum/75 transition-colors hover:text-platinum"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => goHash(item.href)}
                    className="text-left font-sans text-[15px] font-semibold text-platinum/75 transition-colors hover:text-platinum"
                  >
                    {item.label}
                  </button>
                ),
              )}
            </div>
          </nav>

          {/* Connect */}
          <div className="lg:col-span-3">
            <h5 className="mb-3 text-center font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-silver lg:mb-5 lg:text-left">
              Connect
            </h5>

            {/* Mobile: 3 cards in a row */}
            <div className="grid grid-cols-3 gap-2 lg:hidden">
              <a
                href="mailto:info@reelnow.in"
                className="flex flex-col items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.05] px-2 py-3.5 text-center transition-colors hover:border-platinum/30 hover:bg-white/[0.08]"
              >
                <span className="grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-white/[0.06] text-platinum">
                  <Mail size={15} />
                </span>
                <span className="min-w-0">
                  <span className="block font-sans text-[11px] font-semibold text-platinum">
                    Email
                  </span>
                  <small className="mt-0.5 block truncate font-sans text-[9px] text-silver">
                    info@reelnow.in
                  </small>
                </span>
              </a>
              <a
                href="tel:+919010994207"
                className="flex flex-col items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.05] px-2 py-3.5 text-center transition-colors hover:border-platinum/30 hover:bg-white/[0.08]"
              >
                <span className="grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-white/[0.06] text-platinum">
                  <Phone size={15} />
                </span>
                <span className="min-w-0">
                  <span className="block font-sans text-[11px] font-semibold text-platinum">
                    Call
                  </span>
                  <small className="mt-0.5 block truncate font-sans text-[9px] text-silver">
                    +91 90109 94207
                  </small>
                </span>
              </a>
              <div className="flex flex-col items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.05] px-2 py-3.5 text-center">
                <span className="grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-white/[0.06] text-platinum">
                  <MapPin size={15} />
                </span>
                <span className="min-w-0">
                  <span className="block font-sans text-[11px] font-semibold text-platinum">
                    Studio
                  </span>
                  <small className="mt-0.5 block truncate font-sans text-[9px] text-silver">
                    Hyderabad
                  </small>
                </span>
              </div>
            </div>

            {/* Desktop: vertical fact rows */}
            <div className="hidden space-y-4 lg:block">
              <a
                href="mailto:info@reelnow.in"
                className="group flex items-start gap-3.5"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/15 bg-white/[0.06] text-platinum transition-colors group-hover:border-platinum/40 group-hover:bg-platinum/10">
                  <Mail size={16} />
                </span>
                <span>
                  <span className="block font-sans text-[11px] uppercase tracking-[0.16em] text-silver">
                    Email
                  </span>
                  <span className="mt-1 block font-sans text-sm font-semibold text-platinum transition-colors group-hover:text-white">
                    info@reelnow.in
                  </span>
                </span>
              </a>
              <a
                href="tel:+919010994207"
                className="group flex items-start gap-3.5"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/15 bg-white/[0.06] text-platinum transition-colors group-hover:border-platinum/40 group-hover:bg-platinum/10">
                  <Phone size={16} />
                </span>
                <span>
                  <span className="block font-sans text-[11px] uppercase tracking-[0.16em] text-silver">
                    Call us
                  </span>
                  <span className="mt-1 block font-sans text-sm font-semibold text-platinum transition-colors group-hover:text-white">
                    +91 90109 94207
                  </span>
                </span>
              </a>
              <div className="flex items-start gap-3.5">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/15 bg-white/[0.06] text-platinum">
                  <MapPin size={16} />
                </span>
                <span>
                  <span className="block font-sans text-[11px] uppercase tracking-[0.16em] text-silver">
                    Studio
                  </span>
                  <span className="mt-1 block font-sans text-sm font-semibold text-platinum">
                    Hyderabad, India
                  </span>
                </span>
              </div>
            </div>
          </div>

          {/* Follow */}
          <div className="lg:col-span-3">
            <h5 className="mb-3 text-center font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-silver lg:mb-5 lg:text-left">
              Follow
            </h5>
            {/* Mobile: 3 across */}
            <div className="grid grid-cols-3 gap-2 lg:hidden">
              {socials.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-1 rounded-full border border-white/15 bg-white/[0.05] px-2 py-2.5 font-sans text-[11px] font-bold text-platinum transition-colors hover:border-platinum/40 hover:bg-platinum/10"
                >
                  {item.Icon && <item.Icon size={13} />}
                  <span>{item.label}</span>
                </a>
              ))}
            </div>
            {/* Desktop: stacked pills */}
            <div className="hidden flex-col gap-2.5 lg:flex">
              {socials.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/[0.05] px-4 py-2.5 font-sans text-sm font-semibold text-platinum transition-colors hover:border-platinum/40 hover:bg-platinum/10"
                >
                  {item.Icon && <item.Icon size={15} />}
                  {item.label}
                  <ArrowUpRight size={13} className="opacity-50" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <p
          className="mt-10 select-none text-center font-serif text-[clamp(2.6rem,16vw,11rem)] font-medium leading-[0.9] tracking-[0.08em] text-transparent lg:mt-14"
          style={{ WebkitTextStroke: "1px rgba(230,230,230,0.22)" }}
          aria-hidden
        >
          REELNOW
        </p>

        <p className="mt-3 text-center font-sans text-[11px] leading-relaxed text-platinum/45 lg:mt-5 lg:text-xs">
          © {new Date().getFullYear()} ReelNow. All rights reserved.
          <span className="mx-1.5 hidden text-platinum/25 sm:inline" aria-hidden>
            ·
          </span>
          <Link
            href="/login"
            className="mt-1 block text-platinum/50 underline-offset-2 transition-colors hover:text-platinum sm:mt-0 sm:inline sm:underline"
          >
            Staff login
          </Link>
        </p>
      </div>
    </footer>
  );
}
