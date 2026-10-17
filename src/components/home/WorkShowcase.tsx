"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { YouTubeReel } from "@/components/work/YouTubeReel";
import { getCategoryLabel, type WorkEvent } from "@/lib/work";

const INITIAL_VISIBLE = 8;

function WorkCardOverlay({
  badge,
  meta,
  title,
  subtitle,
  isActive,
  showVolume,
}: {
  badge: string;
  meta: string | null;
  title: string;
  subtitle: string;
  isActive: boolean;
  showVolume: boolean;
}) {
  return (
    <>
      <div
        className={`pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent transition-opacity ${
          isActive ? "opacity-50" : "opacity-95"
        }`}
      />

      {showVolume && (
        <div
          className={`absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full backdrop-blur-md transition-all duration-300 ${
            isActive
              ? "bg-white/90 text-noir opacity-100"
              : "bg-black/40 text-white/80 opacity-70 group-hover:opacity-100"
          }`}
          aria-hidden
        >
          {isActive ? (
            <Volume2 className="h-3.5 w-3.5" />
          ) : (
            <VolumeX className="h-3.5 w-3.5" />
          )}
        </div>
      )}

      <span className="pointer-events-none absolute bottom-8 right-2 origin-bottom-right -rotate-90 font-sans text-[8px] font-semibold uppercase tracking-[0.18em] text-white/35">
        ReelNow
      </span>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 p-4 sm:p-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-block rounded-md bg-platinum px-2.5 py-1 font-sans text-[10px] font-bold uppercase tracking-[0.12em] text-noir">
            {badge}
          </span>
          {meta && (
            <span className="inline-block rounded-md bg-black/55 px-2.5 py-1 font-sans text-[10px] font-bold uppercase tracking-[0.12em] text-white backdrop-blur-sm">
              {meta}
            </span>
          )}
        </div>
        <h3 className="mt-2.5 font-sans text-base font-bold tracking-tight text-white sm:text-lg">
          {title}
        </h3>
        <p className="mt-1 font-sans text-xs text-white/70 sm:text-sm">
          {subtitle}
        </p>
      </div>
    </>
  );
}

interface WorkShowcaseProps {
  onWatchMore?: () => void;
  events: WorkEvent[];
}

export function WorkShowcase({ onWatchMore, events }: WorkShowcaseProps) {
  const router = useRouter();
  const WORK_ITEMS = events;
  const [activeId, setActiveId] = useState<string | null>(null);
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeRef = useRef<number | null>(null);

  const visibleItems = WORK_ITEMS.slice(0, INITIAL_VISIBLE);
  const hasMore = WORK_ITEMS.length > INITIAL_VISIBLE;

  // Keep file-based reels playing (muted) continuously
  useEffect(() => {
    visibleItems.forEach((item) => {
      const cover = item.cover;
      if (cover.source !== "file") return;
      const el = videoRefs.current[item.id];
      if (!el) return;
      el.muted = true;
      el.play().catch(() => {
        /* autoplay policies may block until interaction */
      });
    });
  }, [visibleItems]);

  // Soundtrack for active file cards (YouTube uses its own audio)
  useEffect(() => {
    if (fadeRef.current != null) {
      cancelAnimationFrame(fadeRef.current);
      fadeRef.current = null;
    }

    const item = WORK_ITEMS.find((w) => w.id === activeId);
    const cover = item?.cover;
    const stopAudio = () => {
      const a = audioRef.current;
      if (a && !a.paused) {
        const startVol = a.volume;
        const start = performance.now();
        const fadeOut = (now: number) => {
          const t = Math.min(1, (now - start) / 220);
          a.volume = startVol * (1 - t);
          if (t < 1) {
            fadeRef.current = requestAnimationFrame(fadeOut);
          } else {
            a.pause();
            a.currentTime = 0;
            a.volume = startVol;
            fadeRef.current = null;
          }
        };
        fadeRef.current = requestAnimationFrame(fadeOut);
      }
    };

    if (!cover || cover.source !== "file" || !cover.audio) {
      stopAudio();
      return;
    }

    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.loop = true;
      audioRef.current.preload = "auto";
    }
    const a = audioRef.current;
    if (a.getAttribute("src") !== cover.audio) {
      a.src = cover.audio;
    }
    a.volume = 0.55;
    a.play().catch(() => {
      /* needs a user gesture — hover/tap provides one */
    });

    return () => {
      if (fadeRef.current != null) {
        cancelAnimationFrame(fadeRef.current);
        fadeRef.current = null;
      }
    };
  }, [activeId]);

  useEffect(() => {
    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
      if (fadeRef.current != null) cancelAnimationFrame(fadeRef.current);
    };
  }, []);

  const canHover = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  const activate = (id: string) => setActiveId(id);
  const deactivate = () => setActiveId(null);

  const handleCardClick = (id: string) => {
    if (canHover()) return;
    setActiveId((prev) => (prev === id ? null : id));
  };

  const openCategory = (categoryId: string) => {
    router.push(`/work/${categoryId}`);
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  };

  const scrollToBook = () => {
    if (onWatchMore) {
      onWatchMore();
      return;
    }
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="discover"
      className="relative overflow-hidden bg-noir py-16 md:py-24"
    >
      <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-platinum/[0.06] blur-[100px]" />

      <div className="relative mx-auto w-full max-w-[1200px] px-4 sm:px-6">
        <motion.div
          className="mb-10 text-center md:mb-12"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.28em] text-silver">
            Our Work
          </p>
          <h2 className="mt-3 font-serif text-3xl font-medium text-platinum md:text-5xl">
            Captured. Cut. Delivered.
          </h2>
          <p className="mt-3 font-sans text-sm text-silver">
            Hover for sound · Double-click a category to open all its reels
          </p>
        </motion.div>

        <div
          className="grid grid-cols-2 justify-items-center gap-4 sm:gap-5 md:grid-cols-4 md:gap-5 lg:gap-6"
          onMouseLeave={deactivate}
        >
          {visibleItems.map((item: WorkEvent, i) => {
            const cover = item.cover;
            const isActive = activeId === item.id;
            const isYoutube = cover.source === "youtube";
            return (
              <motion.div
                key={item.id}
                role="button"
                tabIndex={0}
                onMouseEnter={() => {
                  if (canHover()) activate(item.id);
                }}
                onClick={() => handleCardClick(item.id)}
                onDoubleClick={(e) => {
                  e.preventDefault();
                  openCategory(item.categoryId);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActiveId((prev) => (prev === item.id ? null : item.id));
                  }
                }}
                title="Double-click to open this category"
                className={`group relative aspect-[9/16] w-full max-w-[260px] cursor-pointer overflow-hidden rounded-[1.75rem] text-left shadow-[0_12px_36px_rgba(0,0,0,0.5)] transition-shadow duration-300 sm:max-w-[280px] ${
                  isActive
                    ? "ring-2 ring-platinum shadow-[0_16px_48px_rgba(230,230,230,0.14)]"
                    : "ring-1 ring-white/10"
                }`}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: Math.min(i, 8) * 0.05 }}
                whileHover={{ y: -4 }}
              >
                {isYoutube ? (
                  <YouTubeReel
                    id={cover.youtubeId}
                    title={cover.title}
                    poster={cover.image}
                    isActive={isActive}
                  />
                ) : (
                  <video
                    ref={(el) => {
                      videoRefs.current[item.id] = el;
                    }}
                    src={cover.video}
                    poster={cover.image}
                    className="absolute inset-0 h-full w-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                  />
                )}

                <WorkCardOverlay
                  badge={getCategoryLabel(item.categoryId)}
                  meta={null}
                  title={item.title}
                  subtitle={item.subtitle ?? cover.subtitle ?? ""}
                  isActive={isActive}
                  showVolume
                />
              </motion.div>
            );
          })}
        </div>

        <motion.div
          className="mt-10 flex flex-wrap items-center justify-center gap-3 md:mt-12"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25, duration: 0.45 }}
        >
          {hasMore && (
            <MagneticButton
              onClick={() => {
                router.push("/work");
                window.scrollTo({ top: 0, left: 0, behavior: "auto" });
              }}
              className="!min-w-0 !rounded-xl !px-8 !py-4 !text-[12px] !tracking-[0.14em]"
            >
              View All Work
            </MagneticButton>
          )}
          <MagneticButton
            variant={hasMore ? "ghost" : "primary"}
            onClick={scrollToBook}
            className="!min-w-0 !rounded-xl !px-8 !py-4 !text-[12px] !tracking-[0.14em]"
          >
            Book Your Shoot
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
