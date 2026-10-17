"use client";

import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
} from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  CalendarDays,
  ChevronDown,
  Clapperboard,
  Pencil,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import {
  WORK_CATEGORIES,
  getCategoryLabel,
  type WorkEvent,
} from "@/lib/work";
import { deleteEvent } from "@/app/studio/actions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const CHIP_GAP = 8;

const chipClass = (active: boolean) =>
  `shrink-0 whitespace-nowrap rounded-full border px-3.5 py-1.5 font-sans text-[10px] font-semibold uppercase tracking-[0.14em] transition-colors sm:px-4 sm:py-2 sm:text-[11px] ${
    active
      ? "border-platinum bg-platinum text-noir"
      : "border-platinum/25 bg-transparent text-silver hover:border-platinum/50 hover:text-platinum"
  }`;

function eventMeta(event: WorkEvent) {
  const sectionCount = event.sections?.length ?? 0;
  const extra =
    (event.gallery?.length ?? 0) +
    (event.sections?.reduce((n, s) => n + s.clips.length, 0) ?? 0);
  return [
    sectionCount ? `${sectionCount} sections` : "Main reel",
    extra ? `${extra} clips` : null,
  ]
    .filter(Boolean)
    .join(" · ");
}

function EventCard({
  event,
  href,
  publish,
  onDelete,
}: {
  event: WorkEvent;
  href: string;
  publish: boolean;
  onDelete: (event: WorkEvent) => void;
}) {
  const upcoming = !event.shootCompleted;

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-platinum/15 bg-charcoal/50 shadow-[0_16px_40px_rgba(0,0,0,0.4)] transition-all duration-300 hover:-translate-y-1 hover:border-platinum/40 hover:shadow-[0_24px_50px_rgba(0,0,0,0.5)]">
      <Link href={href} className="block">
        <div className="relative aspect-[16/10] overflow-hidden bg-noir">
          {event.cover ? (
            <img
              src={event.cover.image}
              alt=""
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center font-sans text-[11px] uppercase tracking-[0.16em] text-silver">
              {upcoming ? "Details only" : "No main reel yet"}
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-noir via-noir/50 to-noir/10" />

          <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
            <span className="rounded-md bg-platinum px-2.5 py-1 font-sans text-[10px] font-bold uppercase tracking-[0.12em] text-noir">
              {getCategoryLabel(event.categoryId)}
            </span>
            {upcoming && (
              <span className="rounded-md bg-amber-400/90 px-2.5 py-1 font-sans text-[10px] font-bold uppercase tracking-[0.12em] text-noir">
                Upcoming
              </span>
            )}
          </div>

          <div className="absolute inset-x-0 bottom-0 p-4 pr-24">
            <h2 className="font-serif text-xl font-medium leading-tight text-platinum">
              {event.title}
            </h2>
            <p className="mt-1 font-sans text-xs text-silver">
              {event.scheduledAt
                ? `Shoot · ${event.scheduledAt}`
                : eventMeta(event)}
            </p>
          </div>
        </div>
      </Link>

      <div className="absolute bottom-3 right-3 z-10 flex items-center gap-2">
        <Link
          href={href}
          aria-label={publish ? `Edit ${event.title}` : `View ${event.title}`}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-noir/70 text-platinum backdrop-blur-md transition-colors hover:border-platinum/50 hover:bg-platinum hover:text-noir"
        >
          <Pencil className="h-3.5 w-3.5" />
        </Link>
        {publish && (
          <button
            type="button"
            aria-label={`Delete ${event.title}`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onDelete(event);
            }}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-red-400/40 bg-noir/70 text-red-400 backdrop-blur-md transition-colors hover:border-red-400 hover:bg-red-500/20 hover:text-red-300"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}

function EventGrid({
  events,
  publish,
  onDelete,
}: {
  events: WorkEvent[];
  publish: boolean;
  onDelete: (event: WorkEvent) => void;
}) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      {events.map((event) => {
        const href = publish
          ? `/studio/events/${event.id}`
          : `/work/${event.categoryId}/${event.id}`;
        return (
          <EventCard
            key={event.id}
            event={event}
            href={href}
            publish={publish}
            onDelete={onDelete}
          />
        );
      })}
    </div>
  );
}

export function StudioEventsCatalog({
  events,
  publish,
  workerMode,
  studioToken,
}: {
  events: WorkEvent[];
  publish: boolean;
  workerMode: boolean;
  studioToken?: string | null;
}) {
  const router = useRouter();
  const [category, setCategory] = useState<string>("all");
  const [query, setQuery] = useState("");
  const [moreOpen, setMoreOpen] = useState(false);
  const [fitCount, setFitCount] = useState(2);
  const [pendingDelete, setPendingDelete] = useState<WorkEvent | null>(null);
  const [deleteError, setDeleteError] = useState("");
  const [isDeleting, startDelete] = useTransition();
  const moreRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);

  const categoriesWithCounts = useMemo(() => {
    const counts = new Map<string, number>();
    for (const event of events) {
      counts.set(event.categoryId, (counts.get(event.categoryId) ?? 0) + 1);
    }
    return WORK_CATEGORIES.filter((cat) => (counts.get(cat.id) ?? 0) > 0).map(
      (cat) => ({
        ...cat,
        count: counts.get(cat.id) ?? 0,
      }),
    );
  }, [events]);

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
      let used = chips[0].offsetWidth;
      let count = 0;

      for (let i = 1; i < chips.length; i++) {
        const chipW = chips[i].offsetWidth;
        const restAfterTaking = chips.length - 1 - (count + 1);
        const needMore = restAfterTaking > 0;
        const nextUsed =
          used + CHIP_GAP + chipW + (needMore ? CHIP_GAP + moreW : 0);
        if (nextUsed <= available) {
          used += CHIP_GAP + chipW;
          count += 1;
        } else {
          break;
        }
      }
      setFitCount(Math.max(0, count));
    };

    const ro = new ResizeObserver(recalc);
    ro.observe(row);
    recalc();
    return () => ro.disconnect();
  }, [categoriesWithCounts]);

  const { primaryCats, overflowCats } = useMemo(() => {
    let primary = categoriesWithCounts.slice(0, fitCount);
    let overflow = categoriesWithCounts.slice(fitCount);

    if (category !== "all" && overflow.some((c) => c.id === category)) {
      const selected = overflow.find((c) => c.id === category)!;
      overflow = overflow.filter((c) => c.id !== category);
      if (primary.length === 0) {
        primary = [selected];
      } else {
        const bumped = primary[primary.length - 1];
        primary = [...primary.slice(0, -1), selected];
        if (bumped && bumped.id !== selected.id) {
          overflow = [bumped, ...overflow].sort(
            (a, b) =>
              categoriesWithCounts.findIndex((c) => c.id === a.id) -
              categoriesWithCounts.findIndex((c) => c.id === b.id),
          );
        }
      }
    }

    return { primaryCats: primary, overflowCats: overflow };
  }, [categoriesWithCounts, fitCount, category]);

  useEffect(() => {
    setMoreOpen(false);
  }, [category]);

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

  const selectCategory = (id: string) => {
    setMoreOpen(false);
    setCategory(id);
  };

  const moreActive = overflowCats.some((c) => c.id === category);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return events.filter((event) => {
      if (category !== "all" && event.categoryId !== category) return false;
      if (!q) return true;
      const haystack = [
        event.title,
        event.subtitle ?? "",
        getCategoryLabel(event.categoryId),
        event.cover?.title ?? "",
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [events, category, query]);

  const upcoming = useMemo(() => {
    return filtered
      .filter((event) => !event.shootCompleted)
      .sort((a, b) =>
        (a.scheduledAt ?? "").localeCompare(b.scheduledAt ?? ""),
      );
  }, [filtered]);

  const categorySections = useMemo(() => {
    const completed = filtered.filter((event) => event.shootCompleted);
    const byCategory = new Map<string, WorkEvent[]>();
    for (const event of completed) {
      const list = byCategory.get(event.categoryId) ?? [];
      list.push(event);
      byCategory.set(event.categoryId, list);
    }

    const order =
      category === "all"
        ? WORK_CATEGORIES.map((cat) => cat.id)
        : [category];

    return order
      .filter((id) => (byCategory.get(id)?.length ?? 0) > 0)
      .map((id) => ({
        id,
        label: getCategoryLabel(id),
        events: byCategory.get(id) ?? [],
      }));
  }, [filtered, category]);

  const confirmDelete = () => {
    if (!pendingDelete) return;
    setDeleteError("");
    startDelete(async () => {
      try {
        const fd = new FormData();
        if (studioToken) fd.set("_studioToken", studioToken);
        await deleteEvent(pendingDelete.id, fd);
        setPendingDelete(null);
        router.refresh();
      } catch (error) {
        setDeleteError(
          error instanceof Error ? error.message : "Could not delete event.",
        );
      }
    });
  };

  const requestDelete = (event: WorkEvent) => {
    setDeleteError("");
    setPendingDelete(event);
  };

  const hasResults = upcoming.length > 0 || categorySections.length > 0;

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
        <div>
          <p className="eyebrow">Catalog</p>
          <h1 className="mt-2 font-serif text-3xl font-medium sm:mt-3 sm:text-4xl md:text-5xl">
            Events
          </h1>
          <p className="mt-2 hidden max-w-xl font-sans text-sm leading-relaxed text-silver sm:mt-3 sm:block">
            {workerMode
              ? "Only shoots assigned to you. Ask a manager to add you to an event."
              : "Upcoming shoots first, then your library by category."}
          </p>
        </div>
        {publish && (
          <Link
            href="/studio/events/new"
            className="hidden items-center justify-center gap-2 rounded-full bg-platinum px-6 py-3 font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-noir transition-opacity hover:opacity-90 lg:inline-flex"
          >
            <Plus className="h-3.5 w-3.5" />
            New event
          </Link>
        )}
      </div>

      {events.length > 0 && (
        <div className="mt-5 space-y-3 sm:mt-8 sm:space-y-4">
          <div className="relative max-w-md">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-silver sm:left-4" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search events…"
              className="w-full rounded-2xl border border-platinum/20 bg-charcoal/50 py-2.5 pl-10 pr-4 font-sans text-sm text-platinum outline-none placeholder:text-silver/50 focus:border-platinum/45 sm:rounded-full sm:py-3 sm:pl-11"
            />
          </div>

          {/* Hidden measurer */}
          <div
            ref={measureRef}
            className="pointer-events-none absolute -left-[9999px] top-0 flex items-center gap-2 opacity-0"
            aria-hidden
          >
            <span data-measure-chip className={chipClass(false)}>
              All
              <span className="ml-1.5 opacity-70 sm:ml-2">{events.length}</span>
            </span>
            {categoriesWithCounts.map((cat) => (
              <span
                key={cat.id}
                data-measure-chip
                className={chipClass(false)}
              >
                {cat.label}
                <span className="ml-1.5 opacity-70 sm:ml-2">{cat.count}</span>
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
            className="relative flex flex-nowrap items-center gap-2"
          >
            <button
              type="button"
              onClick={() => selectCategory("all")}
              className={chipClass(category === "all")}
            >
              All
              <span className="ml-1.5 opacity-70 sm:ml-2">{events.length}</span>
            </button>
            {primaryCats.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => selectCategory(cat.id)}
                className={chipClass(category === cat.id)}
              >
                {cat.label}
                <span className="ml-1.5 opacity-70 sm:ml-2">{cat.count}</span>
              </button>
            ))}

            {overflowCats.length > 0 && (
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
                      {overflowCats.map((cat) => (
                        <button
                          key={cat.id}
                          type="button"
                          role="option"
                          aria-selected={category === cat.id}
                          onClick={() => selectCategory(cat.id)}
                          className={`rounded-xl px-3.5 py-2.5 text-left font-sans text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors ${
                            category === cat.id
                              ? "bg-platinum text-noir"
                              : "text-silver hover:bg-white/5 hover:text-platinum"
                          }`}
                        >
                          {cat.label}
                          <span className="ml-2 opacity-70">{cat.count}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {events.length === 0 ? (
        <div className="studio-panel mt-10 flex flex-col items-center py-16 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full border border-platinum/20 bg-platinum/10 text-platinum">
            <Clapperboard className="h-6 w-6" />
          </span>
          <p className="mt-5 font-serif text-2xl text-platinum">No events yet</p>
          <p className="mt-2 max-w-sm font-sans text-sm text-silver">
            {publish
              ? "Create the first shoot and drop in a YouTube Short or a file."
              : "Nothing is assigned to you yet."}
          </p>
        </div>
      ) : !hasResults ? (
        <div className="studio-panel mt-10 py-12 text-center">
          <p className="font-serif text-2xl text-platinum">No matching events</p>
          <p className="mt-2 font-sans text-sm text-silver">
            Try another search or category.
          </p>
          <button
            type="button"
            onClick={() => {
              setCategory("all");
              setQuery("");
            }}
            className="mt-4 font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-silver hover:text-platinum"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="mt-7 space-y-8 sm:mt-10 sm:space-y-12">
          {upcoming.length > 0 && (
            <section>
              <div className="mb-4 flex items-end justify-between gap-4 sm:mb-5">
                <div>
                  <p className="inline-flex items-center gap-2 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-200/90">
                    <CalendarDays className="h-3.5 w-3.5" />
                    Upcoming
                  </p>
                  <h2 className="mt-1.5 font-serif text-xl text-platinum sm:mt-2 sm:text-2xl md:text-3xl">
                    Scheduled shoots
                  </h2>
                  <p className="mt-1 hidden font-sans text-sm text-silver sm:block">
                    Details only until you confirm the shoot is done.
                  </p>
                </div>
                <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-silver">
                  {upcoming.length}
                </span>
              </div>
              <EventGrid
                events={upcoming}
                publish={publish}
                onDelete={requestDelete}
              />
            </section>
          )}

          {categorySections.map((section) => (
            <section key={section.id}>
              <div className="mb-4 flex items-end justify-between gap-4 border-b border-platinum/10 pb-2.5 sm:mb-5 sm:pb-3">
                <div>
                  <h2 className="font-serif text-xl text-platinum sm:text-2xl md:text-3xl">
                    {section.label}
                  </h2>
                </div>
                <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-silver">
                  {section.events.length}
                </span>
              </div>
              <EventGrid
                events={section.events}
                publish={publish}
                onDelete={requestDelete}
              />
            </section>
          ))}
        </div>
      )}

      <Dialog
        open={Boolean(pendingDelete)}
        onOpenChange={(open) => {
          if (!open && !isDeleting) {
            setPendingDelete(null);
            setDeleteError("");
          }
        }}
      >
        <DialogContent className="border-platinum/20 bg-charcoal text-platinum sm:rounded-2xl">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl">
              Delete event?
            </DialogTitle>
            <DialogDescription className="font-sans text-sm text-silver">
              This permanently removes{" "}
              <span className="text-platinum">
                {pendingDelete?.title ?? "this event"}
              </span>{" "}
              and all of its sections and clips. This cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {deleteError && (
            <p className="rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 font-sans text-sm text-red-300">
              {deleteError}
            </p>
          )}
          <DialogFooter className="gap-2 sm:gap-2">
            <button
              type="button"
              disabled={isDeleting}
              onClick={() => {
                setPendingDelete(null);
                setDeleteError("");
              }}
              className="rounded-full border border-platinum/25 px-5 py-2.5 font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-silver hover:text-platinum"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={isDeleting}
              onClick={confirmDelete}
              className="rounded-full bg-red-500/90 px-5 py-2.5 font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-white hover:bg-red-500 disabled:opacity-60"
            >
              {isDeleting ? "Deleting…" : "Delete"}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
