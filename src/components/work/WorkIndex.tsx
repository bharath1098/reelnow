"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ChevronDown } from "lucide-react";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { WorkPageShell } from "@/components/work/WorkPageShell";
import { WorkReelCard } from "@/components/work/WorkReelCard";
import { useFileSoundtrack } from "@/hooks/useFileSoundtrack";
import {
  WORK_CATEGORIES,
  eventHasMore,
  eventPath,
  getCategoryLabel,
  isWorkCategoryId,
  type WorkCategoryId,
  type WorkEvent,
} from "@/lib/work";

const GAP = 8;

const chipClass = (active: boolean) =>
  `shrink-0 whitespace-nowrap rounded-full border px-4 py-2 font-sans text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors ${
    active
      ? "border-platinum bg-platinum text-noir"
      : "border-platinum/25 bg-transparent text-silver hover:border-platinum/50 hover:text-platinum"
  }`;

export function WorkIndex({
  events,
  categoryId,
}: {
  events: WorkEvent[];
  categoryId?: string;
}) {
  const router = useRouter();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [moreOpen, setMoreOpen] = useState(false);
  const [fitCount, setFitCount] = useState(2);
  const moreRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const activeCategory =
    categoryId && isWorkCategoryId(categoryId) ? categoryId : "all";
  const activeEvent = events.find((event) => event.id === activeId);

  useLayoutEffect(() => {
    const row = rowRef.current;
    const measure = measureRef.current;
    if (!row || !measure) return;

    const recalc = () => {
      const chips = Array.from(
        measure.querySelectorAll<HTMLElement>("[data-measure-chip]"),
      );
      const moreBtn = measure.querySelector<HTMLElement>("[data-measure-more]");
      if (chips.length === 0 || !moreBtn) return;

      const available = row.clientWidth;
      const moreW = moreBtn.offsetWidth;
      // chips[0] = All; rest = categories in order
      let used = chips[0].offsetWidth;
      let count = 0;

      for (let i = 1; i < chips.length; i++) {
        const chipW = chips[i].offsetWidth;
        const restAfterTaking = chips.length - 1 - (count + 1);
        const needMore = restAfterTaking > 0;
        const nextUsed =
          used + GAP + chipW + (needMore ? GAP + moreW : 0);
        if (nextUsed <= available) {
          used += GAP + chipW;
          count += 1;
        } else {
          break;
        }
      }

      // If nothing fits besides All, still show More for the rest
      setFitCount(Math.max(0, count));
    };

    const ro = new ResizeObserver(recalc);
    ro.observe(row);
    recalc();
    return () => ro.disconnect();
  }, []);

  const { primary, overflow } = useMemo(() => {
    let primaryCats = WORK_CATEGORIES.slice(0, fitCount) as {
      id: WorkCategoryId;
      label: string;
    }[];
    let overflowCats = WORK_CATEGORIES.slice(fitCount) as {
      id: WorkCategoryId;
      label: string;
    }[];

    if (
      activeCategory !== "all" &&
      overflowCats.some((c) => c.id === activeCategory)
    ) {
      const selected = overflowCats.find((c) => c.id === activeCategory)!;
      overflowCats = overflowCats.filter((c) => c.id !== activeCategory);
      if (primaryCats.length === 0) {
        primaryCats = [selected];
      } else {
        primaryCats = [...primaryCats.slice(0, -1), selected];
        const bumped = WORK_CATEGORIES.slice(0, fitCount).at(-1);
        if (bumped && bumped.id !== selected.id) {
          overflowCats = [bumped, ...overflowCats].sort(
            (a, b) =>
              WORK_CATEGORIES.findIndex((c) => c.id === a.id) -
              WORK_CATEGORIES.findIndex((c) => c.id === b.id),
          );
        }
      }
    }

    return { primary: primaryCats, overflow: overflowCats };
  }, [fitCount, activeCategory]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    setActiveId(null);
    setMoreOpen(false);
  }, [categoryId]);

  useEffect(() => {
    if (!moreOpen) return;
    const onPointer = (e: MouseEvent | TouchEvent) => {
      if (!moreRef.current?.contains(e.target as Node)) setMoreOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMoreOpen(false);
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("touchstart", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("touchstart", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [moreOpen]);

  useFileSoundtrack(
    activeEvent?.cover.source === "file" ? activeEvent.cover : undefined,
  );

  const selectCategory = (id: string) => {
    setMoreOpen(false);
    if (id === "all") router.push("/work");
    else router.push(`/work/${id}`);
  };

  const moreActive = overflow.some((c) => c.id === activeCategory);

  return (
    <WorkPageShell>
      <Link
        href="/"
        className="mb-8 inline-flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-silver transition-colors hover:text-platinum"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back home
      </Link>

      <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.28em] text-silver">
        Our Work
      </p>
      <h1 className="mt-3 font-serif text-3xl font-medium text-platinum md:text-5xl">
        {activeCategory === "all"
          ? "All Categories"
          : getCategoryLabel(activeCategory)}
      </h1>
      <p className="mt-3 max-w-xl font-sans text-sm text-silver">
        Each card is one event’s main reel. Hover for sound. If an event has
        more clips, click through to open it.
      </p>

      {/* Hidden measurer — same chip styles, off-screen */}
      <div
        ref={measureRef}
        className="pointer-events-none absolute -left-[9999px] top-0 flex items-center gap-2 opacity-0"
        aria-hidden
      >
        <span data-measure-chip className={chipClass(false)}>
          All
        </span>
        {WORK_CATEGORIES.map((cat) => (
          <span key={cat.id} data-measure-chip className={chipClass(false)}>
            {cat.label}
          </span>
        ))}
        <span
          data-measure-more
          className={`${chipClass(false)} inline-flex items-center gap-1.5`}
        >
          More
          <ChevronDown className="h-3.5 w-3.5" />
        </span>
      </div>

      <div
        ref={rowRef}
        className="relative mt-8 flex flex-nowrap items-center gap-2 overflow-visible"
      >
        <button
          type="button"
          onClick={() => selectCategory("all")}
          className={chipClass(activeCategory === "all")}
        >
          All
        </button>
        {primary.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => selectCategory(cat.id)}
            className={chipClass(activeCategory === cat.id)}
          >
            {cat.label}
          </button>
        ))}

        {overflow.length > 0 && (
          <div className="relative shrink-0" ref={moreRef}>
            <button
              type="button"
              onClick={() => setMoreOpen((v) => !v)}
              aria-expanded={moreOpen}
              aria-haspopup="listbox"
              className={`${chipClass(moreActive || moreOpen)} inline-flex items-center gap-1.5`}
            >
              More
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform ${moreOpen ? "rotate-180" : ""}`}
              />
            </button>

            {moreOpen && (
              <div
                role="listbox"
                className="absolute right-0 top-[calc(100%+0.5rem)] z-30 min-w-[200px] overflow-hidden rounded-2xl border border-platinum/15 bg-charcoal/95 p-2 shadow-[0_20px_50px_rgba(0,0,0,0.55)] backdrop-blur-xl"
              >
                <div className="flex max-h-64 flex-col gap-1 overflow-y-auto">
                  {overflow.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      role="option"
                      aria-selected={activeCategory === cat.id}
                      onClick={() => selectCategory(cat.id)}
                      className={`rounded-xl px-3.5 py-2.5 text-left font-sans text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors ${
                        activeCategory === cat.id
                          ? "bg-platinum text-noir"
                          : "text-silver hover:bg-white/5 hover:text-platinum"
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div
        className="mt-10 grid grid-cols-2 justify-items-center gap-4 sm:gap-5 md:grid-cols-4 md:gap-5 lg:gap-6"
        onMouseLeave={() => setActiveId(null)}
      >
        {events.map((event) => {
          const hasMore = eventHasMore(event);
          return (
            <WorkReelCard
              key={event.id}
              clip={event.cover}
              badge={getCategoryLabel(event.categoryId)}
              title={event.title}
              subtitle={event.subtitle}
              isActive={activeId === event.id}
              onActivate={() => setActiveId(event.id)}
              onOpen={hasMore ? () => router.push(eventPath(event)) : undefined}
              hint={hasMore ? "Open this event" : "Play with sound"}
            />
          );
        })}
      </div>

      {events.length === 0 && (
        <p className="mt-16 text-center font-sans text-sm text-silver">
          No reels in this category yet.
        </p>
      )}

      <div className="mt-12 flex justify-center">
        <MagneticButton
          onClick={() => router.push("/#contact")}
          className="!min-w-0 !rounded-xl !px-8 !py-4 !text-[12px] !tracking-[0.14em]"
        >
          Book Your Shoot
        </MagneticButton>
      </div>
    </WorkPageShell>
  );
}
