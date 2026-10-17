"use client";

import {
  useState,
  useEffect,
  useLayoutEffect,
  useRef,
  type Dispatch,
  type PointerEvent,
  type SetStateAction,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  BadgeCheck,
  Award,
  Timer,
  MapPin,
  Zap,
  Smartphone,
  Share2,
  Headphones,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { IMAGES } from "@/lib/images";

const FEATURES = [
  {
    number: "01",
    title: "Verified Creators",
    description:
      "ID-verified, background-screened ReelNow creators you can trust at every shoot.",
    image: IMAGES.creator,
    icon: BadgeCheck,
    tag: "Trust",
  },
  {
    number: "02",
    title: "Trained & Certified",
    description:
      "Clears framing, lighting, storytelling, and speed filters before going live.",
    image: IMAGES.phoneShoot,
    icon: Award,
    tag: "Quality",
  },
  {
    number: "03",
    title: "Reels in 10 Minutes",
    description:
      "Shot, cut, and exported before your event wraps — share while the energy is live.",
    image: IMAGES.editing,
    icon: Timer,
    tag: "Speed",
  },
  {
    number: "04",
    title: "Live Tracking",
    description:
      "Book a Reel-Maker like a cab: live updates, ETA, and status inside the app.",
    image: IMAGES.tracking,
    icon: MapPin,
    tag: "Realtime",
  },
  {
    number: "05",
    title: "Instant Booking",
    description:
      "Pick a slot, confirm in seconds, and get a nearby creator assigned instantly.",
    image: IMAGES.event,
    icon: Zap,
    tag: "Booking",
  },
  {
    number: "06",
    title: "Shot on iPhone",
    description:
      "Cinematic capture on iPhone 15 or newer — sharp, bright, social-ready.",
    image: IMAGES.iphone,
    icon: Smartphone,
    tag: "Gear",
  },
  {
    number: "07",
    title: "From Shoot to Share",
    description:
      "Capture, edit, caption, and export — the full content journey in one flow.",
    image: IMAGES.tmp2,
    icon: Share2,
    tag: "Workflow",
  },
  {
    number: "08",
    title: "Customer Support",
    description:
      "24/7 help for bookings, edits, and delivery — humans who know reels.",
    image: IMAGES.support,
    icon: Headphones,
    tag: "Care",
  },
];

interface FeaturesSectionProps {
  onBook: () => void;
}

function FeatureProgress({
  active,
  paused,
  onSelect,
}: {
  active: number;
  paused: boolean;
  onSelect: (index: number) => void;
}) {
  return (
    <div className="flex gap-1">
      {FEATURES.map((item, i) => (
        <button
          key={item.number}
          type="button"
          aria-label={`Show ${item.title}`}
          onClick={() => onSelect(i)}
          className="flex h-6 flex-1 items-center"
        >
          <span className="relative h-1 w-full overflow-hidden rounded-full bg-white/20">
            {i === active && (
              <span
                key={active}
                className="block h-full w-full origin-left bg-platinum"
                style={{
                  animation: "feature-bar 3.2s linear forwards",
                  animationPlayState: paused ? "paused" : "running",
                }}
              />
            )}
            {i < active && <span className="block h-full w-full bg-platinum/60" />}
          </span>
        </button>
      ))}
    </div>
  );
}

function MobileFeatureDeck({
  active,
  setActive,
  paused,
  setPaused,
}: {
  active: number;
  setActive: Dispatch<SetStateAction<number>>;
  paused: boolean;
  setPaused: (paused: boolean) => void;
}) {
  const frameRef = useRef<HTMLDivElement>(null);
  const chipsRef = useRef<HTMLDivElement>(null);
  const pointer = useRef<{ x: number; y: number } | null>(null);
  const [frameWidth, setFrameWidth] = useState(0);

  const go = (dir: number) => {
    setActive((i) => (i + dir + FEATURES.length) % FEATURES.length);
  };

  useLayoutEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    const measure = () => setFrameWidth(frame.clientWidth);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(frame);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const row = chipsRef.current;
    const chip = row?.querySelector<HTMLElement>(`[data-chip="${active}"]`);
    if (!row || !chip) return;
    const left =
      chip.getBoundingClientRect().left -
      row.getBoundingClientRect().left +
      row.scrollLeft -
      row.clientWidth / 2 +
      chip.clientWidth / 2;
    row.scrollTo({ left, behavior: "smooth" });
  }, [active]);

  const gap = 12;
  const cardWidth = frameWidth ? Math.round(frameWidth * 0.86) : 0;
  const x = cardWidth ? -active * (cardWidth + gap) : 0;

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;
    pointer.current = { x: event.clientX, y: event.clientY };
    setPaused(true);
  };

  const onPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (!pointer.current) return;
    const dx = event.clientX - pointer.current.x;
    const dy = event.clientY - pointer.current.y;
    pointer.current = null;
    if (Math.abs(dx) > 42 && Math.abs(dx) > Math.abs(dy) * 1.2) {
      go(dx < 0 ? 1 : -1);
    }
    setPaused(false);
  };

  return (
    <div className="lg:hidden">
      <FeatureProgress
        active={active}
        paused={paused}
        onSelect={(index) => setActive(index)}
      />

      <div className="relative mt-3">
        <div
          ref={frameRef}
          className="overflow-hidden touch-pan-y"
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerCancel={() => {
            pointer.current = null;
            setPaused(false);
          }}
          aria-roledescription="carousel"
          aria-label="ReelNow features"
        >
          <motion.div
            className="flex"
            style={{ gap }}
            initial={false}
            animate={{ x }}
            transition={{ type: "spring", stiffness: 380, damping: 36 }}
          >
          {FEATURES.map((item, i) => {
            const ItemIcon = item.icon;
            return (
              <article
                key={item.number}
                data-feature={i}
                aria-hidden={i !== active}
                className="relative aspect-[3/4] shrink-0 overflow-hidden rounded-[1.6rem] border border-platinum/15 bg-charcoal shadow-[0_24px_60px_rgba(0,0,0,0.45)]"
                style={{ width: cardWidth || "86%" }}
              >
                <img
                  src={item.image}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-noir via-noir/45 to-noir/25" />

                <div className="absolute right-4 top-4 rounded-full border border-platinum/25 bg-noir/45 px-3 py-1.5 font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-platinum backdrop-blur-md">
                  ReelNow
                </div>

                <div className="absolute inset-x-3 bottom-3 rounded-2xl border border-platinum/20 bg-noir/60 p-4 shadow-[0_16px_40px_rgba(0,0,0,0.35)] backdrop-blur-2xl">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-platinum text-noir">
                      <ItemIcon className="h-4 w-4" />
                    </span>
                    <div className="min-w-0">
                      <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-silver">
                        {item.tag} · {item.number}
                      </p>
                      <h3 className="mt-0.5 font-serif text-xl font-medium leading-tight text-platinum">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                  <p className="mt-3 font-sans text-sm leading-relaxed text-silver">
                    {item.description}
                  </p>
                </div>
              </article>
            );
          })}
          </motion.div>
        </div>

        <button
          type="button"
          aria-label="Previous feature"
          onClick={() => go(-1)}
          className="absolute left-3 top-[38%] z-10 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-noir/55 text-platinum backdrop-blur-md"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          type="button"
          aria-label="Next feature"
          onClick={() => go(1)}
          className="absolute right-[15%] top-[38%] z-10 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-noir/55 text-platinum backdrop-blur-md"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div
        ref={chipsRef}
        className="mt-4 flex gap-2 overflow-x-auto pr-16 scrollbar-hide"
      >
        {FEATURES.map((item, i) => {
          const ItemIcon = item.icon;
          const isActive = i === active;
          return (
            <button
              key={item.number}
              type="button"
              data-chip={i}
              onClick={() => setActive(i)}
              aria-current={isActive ? "true" : undefined}
              className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-3 py-2 font-sans text-xs font-semibold transition-colors ${
                isActive
                  ? "border-platinum bg-platinum text-noir"
                  : "border-platinum/20 bg-charcoal/70 text-silver"
              }`}
            >
              <ItemIcon className="h-3.5 w-3.5" strokeWidth={1.75} />
              {item.title}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function FeaturesSection({ onBook }: FeaturesSectionProps) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setActive((i) => (i + 1) % FEATURES.length);
    }, 3200);
    return () => clearInterval(id);
  }, [paused]);

  const feature = FEATURES[active];
  const Icon = feature.icon;

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="features"
      className="relative overflow-hidden bg-noir section-padding"
    >
      <div className="pointer-events-none absolute -left-24 top-20 h-80 w-80 rounded-full bg-platinum/[0.06] blur-[110px]" />
      <div className="pointer-events-none absolute -right-16 bottom-10 h-72 w-72 rounded-full bg-silver/10 blur-[100px]" />

      <div className="relative mx-auto max-w-[1280px]">
        {/* Header */}
        <div className="mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.28em] text-silver">
              Features
            </p>
            <h2 className="mt-4 max-w-xl font-serif text-3xl font-medium leading-snug text-platinum md:text-5xl">
              Built for the moment.{" "}
              <span className="italic text-silver">Delivered in minutes.</span>
            </h2>
          </motion.div>

          <motion.div
            className="flex flex-wrap items-center gap-3"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1 }}
          >
            <button
              type="button"
              onClick={scrollToContact}
              className="inline-flex items-center rounded-full border border-platinum/35 px-6 py-3 font-sans text-[12px] font-semibold text-platinum transition-colors hover:bg-platinum/5"
            >
              Contact us
            </button>
            <MagneticButton
              onClick={onBook}
              className="!min-w-0 !rounded-full !px-6 !py-3 !text-[12px]"
            >
              Book a Shoot
              <ArrowUpRight className="h-3.5 w-3.5" />
            </MagneticButton>
          </motion.div>
        </div>

        <MobileFeatureDeck
          active={active}
          setActive={setActive}
          paused={paused}
          setPaused={setPaused}
        />

        {/* Split layout: list + cinematic preview */}
        <div
          className="hidden items-stretch gap-6 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-8"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Feature list */}
          <motion.div
            className="flex flex-col justify-center"
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <ul className="space-y-1">
              {FEATURES.map((item, i) => {
                const isActive = i === active;
                const ItemIcon = item.icon;
                return (
                  <li key={item.number}>
                    <button
                      type="button"
                      onClick={() => setActive(i)}
                      onMouseEnter={() => setActive(i)}
                      className={`group relative flex w-full items-start gap-4 rounded-2xl px-4 py-3.5 text-left transition-all duration-300 md:px-5 md:py-4 ${
                        isActive
                          ? "bg-charcoal/80 shadow-[0_12px_40px_rgba(0,0,0,0.35)] ring-1 ring-platinum/20 backdrop-blur-xl"
                          : "hover:bg-platinum/[0.04]"
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="feature-glow"
                          className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-r from-platinum/[0.07] to-transparent"
                          transition={{ type: "spring", stiffness: 380, damping: 32 }}
                        />
                      )}

                      <span
                        className={`relative mt-0.5 font-sans text-xs font-semibold tracking-wider transition-colors ${
                          isActive ? "text-platinum" : "text-silver/50"
                        }`}
                      >
                        {item.number}
                      </span>

                      <span
                        className={`relative mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all ${
                          isActive
                            ? "border-platinum/40 bg-platinum text-noir"
                            : "border-platinum/15 bg-noir/40 text-silver group-hover:border-platinum/30"
                        }`}
                      >
                        <ItemIcon className="h-3.5 w-3.5" strokeWidth={1.75} />
                      </span>

                      <span className="relative min-w-0 flex-1">
                        <span
                          className={`block font-sans text-sm font-semibold transition-colors md:text-[15px] ${
                            isActive ? "text-platinum" : "text-silver"
                          }`}
                        >
                          {item.title}
                        </span>
                        <AnimatePresence initial={false}>
                          {isActive && (
                            <motion.span
                              className="mt-1.5 block font-sans text-[13px] leading-relaxed text-silver-soft"
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.28 }}
                            >
                              {item.description}
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </motion.div>

          {/* Cinematic preview panel */}
          <motion.div
            className="relative min-h-[420px] overflow-hidden rounded-[1.75rem] border border-platinum/15 bg-charcoal/40 shadow-[0_30px_80px_rgba(0,0,0,0.45)] md:min-h-[520px] lg:min-h-full"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={feature.number}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-noir via-noir/35 to-noir/10" />
                <div className="absolute inset-0 bg-gradient-to-r from-noir/50 via-transparent to-transparent" />
              </motion.div>
            </AnimatePresence>

            {/* Floating glass meta card */}
            <div className="absolute inset-x-0 bottom-0 p-5 md:p-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`meta-${feature.number}`}
                  className="rounded-2xl border border-platinum/20 bg-noir/55 p-5 shadow-[0_16px_50px_rgba(0,0,0,0.4)] backdrop-blur-2xl md:p-6"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.35 }}
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-platinum text-noir">
                      <Icon className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-silver">
                        {feature.tag} · {feature.number}
                      </p>
                      <h3 className="mt-0.5 font-serif text-xl font-medium text-platinum md:text-2xl">
                        {feature.title}
                      </h3>
                    </div>
                  </div>
                  <p className="mt-3 max-w-md font-sans text-sm leading-relaxed text-silver">
                    {feature.description}
                  </p>

                  {/* Progress dots */}
                  <div className="mt-5 flex gap-1.5">
                    {FEATURES.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        aria-label={`Show feature ${i + 1}`}
                        onClick={() => setActive(i)}
                        className="h-1 flex-1 overflow-hidden rounded-full bg-white/15"
                      >
                        {i === active && (
                          <motion.span
                            key={`prog-${active}-${paused}`}
                            className="block h-full bg-platinum"
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{
                              duration: paused ? 0 : 3.2,
                              ease: "linear",
                            }}
                          />
                        )}
                        {i < active && (
                          <span className="block h-full w-full bg-platinum/50" />
                        )}
                      </button>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Corner accent */}
            <div className="pointer-events-none absolute right-5 top-5 rounded-full border border-platinum/25 bg-noir/40 px-3 py-1.5 font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-platinum backdrop-blur-md md:right-6 md:top-6">
              ReelNow
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
