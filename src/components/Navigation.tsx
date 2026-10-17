"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  CalendarCheck,
  Clapperboard,
  Home,
  Package,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

type NavLink = {
  name: string;
  type: "hash" | "route";
  href: string;
  icon?: LucideIcon;
  sectionIds?: string[];
};

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const pathname = usePathname();
  const router = useRouter();
  const [hash, setHash] = useState("");
  const onHome = pathname === "/";
  const onWork = pathname.startsWith("/work");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      if (!onHome) return;

      const sections = [
        "home",
        "features",
        "discover",
        "services",
        "why",
        "join",
        "testimonials",
        "contact",
      ];
      for (const section of [...sections].reverse()) {
        const element = document.getElementById(section);
        if (element && element.getBoundingClientRect().top <= 100) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [onHome]);

  useEffect(() => {
    const syncHash = () => setHash(window.location.hash);
    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, [pathname]);

  useEffect(() => {
    if (!onHome || !hash) return;
    const id = hash.slice(1);
    requestAnimationFrame(() => {
      const el = document.getElementById(id);
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    });
  }, [onHome, hash, pathname]);

  const desktopLinks: NavLink[] = [
    { name: "Home", type: "hash", href: "#home" },
    { name: "Features", type: "hash", href: "#features" },
    { name: "Work", type: "route", href: "/work" },
    { name: "Services", type: "hash", href: "#services" },
    { name: "Why", type: "hash", href: "#why" },
    { name: "Creators", type: "hash", href: "#join" },
    { name: "Contact", type: "hash", href: "#contact" },
  ];

  const mobileTabs: NavLink[] = [
    {
      name: "Home",
      type: "hash",
      href: "#home",
      icon: Home,
      sectionIds: ["home", "features", "discover"],
    },
    {
      name: "Work",
      type: "route",
      href: "/work",
      icon: Clapperboard,
    },
    {
      name: "Packages",
      type: "hash",
      href: "#services",
      icon: Package,
      sectionIds: ["services"],
    },
    {
      name: "Why",
      type: "hash",
      href: "#why",
      icon: Sparkles,
      sectionIds: ["why", "join", "testimonials"],
    },
    {
      name: "Book",
      type: "hash",
      href: "#contact",
      icon: CalendarCheck,
      sectionIds: ["contact"],
    },
  ];

  const goHash = (href: string) => {
    if (onHome) {
      const element = document.querySelector(href);
      if (element) {
        const top =
          element.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: "smooth" });
      }
      return;
    }
    router.push(`/${href}`);
  };

  const goRoute = (path: string) => {
    router.push(path);
  };

  const isDesktopActive = (link: NavLink) => {
    if (link.type === "route") return onWork;
    return onHome && activeSection === link.href.slice(1);
  };

  const isTabActive = (tab: NavLink) => {
    if (tab.type === "route") return onWork;
    if (!onHome) return false;
    if (tab.sectionIds?.includes(activeSection)) return true;
    return activeSection === tab.href.slice(1);
  };

  return (
    <>
      {/* Top bar */}
      <nav
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          isScrolled
            ? "border-b border-white/10 bg-noir/70 py-3 backdrop-blur-xl"
            : "bg-transparent py-4 lg:py-5",
        )}
      >
        <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-4 px-4 md:px-8 lg:px-12">
          <button
            type="button"
            onClick={() => goRoute("/")}
            className="shrink-0"
          >
            <span className="font-sans text-[13px] font-semibold uppercase tracking-[0.22em] text-white md:text-sm">
              Reel<span className="text-platinum">Now</span>
            </span>
          </button>

          <div
            className={cn(
              "hidden items-center gap-8 rounded-full px-6 py-2.5 lg:flex",
              isScrolled && "glass-soft",
            )}
          >
            {desktopLinks.map((link) => (
              <button
                key={link.name}
                type="button"
                onClick={() =>
                  link.type === "route" ? goRoute(link.href) : goHash(link.href)
                }
                className={cn(
                  "nav-link",
                  isDesktopActive(link) && "active text-platinum",
                )}
              >
                {link.name}
              </button>
            ))}
          </div>

          <div className="hidden shrink-0 items-center gap-3 lg:flex">
            <button
              type="button"
              onClick={() => goHash("#contact")}
              className="inline-flex items-center rounded-full border border-white/40 bg-white/10 px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-md transition-colors hover:bg-white hover:text-noir"
            >
              Book a Session
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile bottom tabs — Studio / Lunar style */}
      <nav
        className="glass-tabbar fixed inset-x-0 bottom-0 z-50 flex gap-1 px-2 pb-[max(0.4rem,env(safe-area-inset-bottom))] pt-2 lg:hidden"
        aria-label="Main sections"
      >
        {mobileTabs.map((tab) => {
          const Icon = tab.icon!;
          const active = isTabActive(tab);
          return (
            <button
              key={tab.name}
              type="button"
              aria-current={active ? "page" : undefined}
              onClick={() =>
                tab.type === "route" ? goRoute(tab.href) : goHash(tab.href)
              }
              className={cn(
                "relative grid min-w-0 flex-1 justify-items-center gap-0.5 px-1 pb-2.5 pt-2 transition-colors",
                active ? "glass-tab-on text-platinum" : "text-silver/75 hover:text-platinum",
              )}
            >
              <Icon className="h-5 w-5" strokeWidth={active ? 2.25 : 1.75} />
              <span className="max-w-full truncate font-sans text-[10px] font-bold tracking-wide">
                {tab.name}
              </span>
            </button>
          );
        })}
      </nav>

    </>
  );
};

export default Navigation;
