"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  Camera,
  Sparkles,
  Star,
  Smartphone,
  Zap,
  CheckCircle2,
  Clapperboard,
  Send,
  RotateCcw,
} from "lucide-react";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { IMAGES } from "@/lib/images";

/** Clips cycling inside the iPhone video-recording screen */
const REEL_SLIDES = [
  {
    video: "https://assets.mixkit.co/videos/37/37-720.mp4",
    poster: IMAGES.food,
    label: "Food Story",
    meta: "4K · 60fps",
  },
  {
    video: "https://assets.mixkit.co/videos/702/702-720.mp4",
    poster: IMAGES.event,
    label: "Event Reel",
    meta: "4K · HDR",
  },
  {
    video: "https://assets.mixkit.co/videos/20877/20877-720.mp4",
    poster: IMAGES.product,
    label: "Product",
    meta: "Cinematic",
  },
  {
    video: "https://assets.mixkit.co/videos/40783/40783-720.mp4",
    poster: IMAGES.cultural,
    label: "Lifestyle",
    meta: "4K · Dolby",
  },
];

interface CinematicHeroProps {
  onBook: () => void;
}

const trustBadges = [
  { icon: Star, label: "4.9★ Rated" },
  { icon: CheckCircle2, label: "Professional Editing" },
  { icon: Zap, label: "10-Min Delivery" },
  { icon: Smartphone, label: "Shot on iPhone" },
  { icon: Sparkles, label: "From ₹1,999" },
];

const categories = [
  {
    icon: Camera,
    title: "Shoot",
    desc: "A Reel-Maker arrives with latest iPhone. Capture every moment live on site.",
  },
  {
    icon: Clapperboard,
    title: "Edit",
    desc: "Cut, color, and caption on the spot — polished while the energy is still high.",
  },
  {
    icon: Send,
    title: "Deliver",
    desc: "Get your cinematic reel in minutes, ready to post and share.",
  },
];

export function CinematicHero({ onBook }: CinematicHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [slide, setSlide] = useState(0);
  const [flash, setFlash] = useState(false);
  const [recSeconds, setRecSeconds] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const phoneY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "5%"]);

  // Cycle clips + shutter flash inside the phone
  useEffect(() => {
    const id = setInterval(() => {
      setFlash(true);
      setTimeout(() => setFlash(false), 180);
      setSlide((s) => (s + 1) % REEL_SLIDES.length);
      setRecSeconds(0);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  // Recording timer
  useEffect(() => {
    const id = setInterval(() => {
      setRecSeconds((t) => t + 1);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const formatTime = (s: number) => {
    const mm = String(Math.floor(s / 60)).padStart(2, "0");
    const ss = String(s % 60).padStart(2, "0");
    return `00:${mm}:${ss}`;
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative overflow-visible bg-noir pt-20 pb-10 sm:pt-24 md:pt-32 md:pb-16"
    >
      {/* Decor layer clipped separately — overflow-x:hidden on the section
          would also clip Y (CSS quirk) and cut off the giant "utes" glyphs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute -left-32 top-20 h-[28rem] w-[28rem] rounded-full bg-platinum/[0.07] blur-[120px]" />
        <div className="absolute -right-24 bottom-10 h-[24rem] w-[24rem] rounded-full bg-silver/10 blur-[110px]" />
        <div className="absolute left-1/2 top-1/3 h-64 w-64 -translate-x-1/2 rounded-full bg-platinum/[0.05] blur-[80px]" />
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(230,230,230,0.55) 1px, transparent 1px), linear-gradient(90deg, rgba(230,230,230,0.55) 1px, transparent 1px)",
            backgroundSize: "52px 52px",
          }}
        />
        <div className="hero-grain absolute inset-0" />
        {[
          { className: "left-[12%] top-[28%] h-2 w-2", delay: 0 },
          { className: "right-[18%] top-[35%] h-1.5 w-1.5", delay: 0.4 },
          { className: "left-[22%] bottom-[30%] h-1 w-1", delay: 0.8 },
          { className: "right-[28%] bottom-[38%] h-2.5 w-2.5", delay: 1.2 },
        ].map((orb, i) => (
          <motion.span
            key={i}
            className={`absolute rounded-full bg-platinum/40 ${orb.className}`}
            animate={{ y: [0, -14, 0], opacity: [0.25, 0.7, 0.25] }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: orb.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto flex max-w-[1100px] flex-col items-center overflow-visible px-4 text-center md:px-8">
        {/* Glass badge */}
        <motion.div
          className="hidden items-center gap-2 rounded-full border border-platinum/25 bg-platinum/[0.07] px-4 py-2 shadow-[0_0_40px_rgba(230,230,230,0.06)] backdrop-blur-xl md:inline-flex"
          initial={{ opacity: 0, y: 12, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.55 }}
        >
          <Camera className="h-3.5 w-3.5 text-platinum" />
          <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-platinum sm:text-[11px]">
            Hyderabad&apos;s Instant Photography Reels
          </span>
          <Sparkles className="h-3.5 w-3.5 animate-pulse text-platinum" />
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="mt-0 flex max-w-4xl flex-col items-center text-center sm:mt-7 md:mt-8"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <span className="block whitespace-nowrap font-serif text-[1.65rem] font-medium leading-none tracking-tight text-platinum sm:text-4xl md:text-5xl lg:text-[3.75rem]">
            We Shoot · Edit · Deliver
          </span>
          <span className="mt-2 block font-sans text-base font-medium tracking-tight text-silver sm:mt-3 sm:text-2xl md:text-3xl lg:text-[1.85rem]">
            Cinematic Reels in
          </span>
        </motion.h1>

        {/* Min + iPhone + utes */}
        <motion.div
          className="relative mt-6 flex w-full items-center justify-center gap-1 overflow-visible py-8 sm:mt-4 sm:gap-2 sm:py-10 md:mt-2 md:gap-3 md:py-12"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.8 }}
        >
          <motion.span
            style={{ y: textY }}
            className="select-none overflow-visible px-1 font-sans text-[15vw] font-bold leading-none tracking-[-0.04em] text-silver/45 sm:text-[13vw] md:text-[8.5rem] lg:text-[10.5rem]"
            aria-hidden
          >
            Min
          </motion.span>

          {/* iPhone 18 Pro Max */}
          <motion.div
            style={{ y: phoneY }}
            className="relative z-10 shrink-0"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.35, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-platinum/20 blur-[55px] md:h-60 md:w-60" />

            <motion.div
              className="relative mx-auto w-[108px] sm:w-[128px] md:w-[152px] lg:w-[172px]"
              animate={{ y: [0, -10, 0] }}
              transition={{
                y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
              }}
              aria-label="iPhone 18 Pro Max"
            >
              <div className="relative">
                <div
                  className="relative rounded-[1.15rem] p-[2px] shadow-[0_30px_70px_rgba(0,0,0,0.55),0_0_0_1px_rgba(180,200,220,0.35)] sm:rounded-[2rem] md:rounded-[2.4rem]"
                  style={{
                    background:
                      "linear-gradient(145deg, #dce6f0 0%, #a8bdd0 35%, #7a92a8 60%, #b8c9d8 85%, #e8eef4 100%)",
                  }}
                >
                  <div className="relative overflow-hidden rounded-[1rem] bg-[#0a0a0a] p-[4px] sm:rounded-[1.85rem] sm:p-[6px] md:rounded-[2.25rem] md:p-[7px]">
                    <div className="relative aspect-[1320/2868] overflow-hidden rounded-[0.85rem] bg-noir sm:rounded-[1.55rem] md:rounded-[1.9rem]">
                      {/* Live video feed */}
                      <AnimatePresence mode="wait">
                        <motion.video
                          key={slide}
                          src={REEL_SLIDES[slide].video}
                          poster={REEL_SLIDES[slide].poster}
                          className="absolute inset-0 h-full w-full object-cover"
                          autoPlay
                          muted
                          loop
                          playsInline
                          initial={{ opacity: 0, scale: 1.06 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.45 }}
                        />
                      </AnimatePresence>

                      <AnimatePresence>
                        {flash && (
                          <motion.div
                            className="absolute inset-0 z-20 bg-white"
                            initial={{ opacity: 0.85 }}
                            animate={{ opacity: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.28 }}
                          />
                        )}
                      </AnimatePresence>

                      {/* Status bar + Dynamic Island */}
                      <div className="absolute left-1/2 top-2 z-30 flex h-[11px] w-[52px] -translate-x-1/2 items-center justify-center rounded-full bg-black sm:top-2.5 sm:h-[13px] sm:w-[60px] md:h-[14px] md:w-[68px]">
                        <span className="absolute right-[7px] h-[5px] w-[5px] rounded-full bg-[#1a1a1a] ring-1 ring-[#2a2a2a] sm:right-2 sm:h-1.5 sm:w-1.5" />
                      </div>

                      {/* Recording chrome */}
                      <div className="absolute inset-x-0 top-[1.55rem] z-20 flex flex-col items-center gap-1.5 px-2 sm:top-[1.75rem] sm:gap-2 sm:px-2.5 md:top-8">
                        <div className="flex items-center gap-1 rounded-full bg-black/55 px-2 py-0.5 backdrop-blur-md">
                          <motion.span
                            className="h-1.5 w-1.5 rounded-full bg-red-500"
                            animate={{ opacity: [1, 0.2, 1] }}
                            transition={{ duration: 0.85, repeat: Infinity }}
                          />
                          <span className="font-sans text-[6px] font-semibold tabular-nums tracking-wide text-white sm:text-[7px]">
                            {formatTime(recSeconds)}
                          </span>
                        </div>

                        <div className="flex w-full items-center justify-between">
                          <span className="rounded-md bg-black/45 px-1.5 py-0.5 font-sans text-[5px] font-medium text-white/90 backdrop-blur-sm sm:text-[6px]">
                            REC
                          </span>
                          <span className="rounded-md bg-black/45 px-1.5 py-0.5 font-sans text-[5px] text-white/90 backdrop-blur-sm sm:text-[6px]">
                            {REEL_SLIDES[slide].meta}
                          </span>
                        </div>
                      </div>

                      {/* Rule-of-thirds grid */}
                      <div className="pointer-events-none absolute inset-0 z-10 opacity-25">
                        <div className="absolute left-1/3 top-0 h-full w-px bg-white" />
                        <div className="absolute left-2/3 top-0 h-full w-px bg-white" />
                        <div className="absolute left-0 top-1/3 h-px w-full bg-white" />
                        <div className="absolute left-0 top-2/3 h-px w-full bg-white" />
                      </div>

                      {/* Focus reticle */}
                      <motion.div
                        className="pointer-events-none absolute left-1/2 top-[42%] z-10 h-10 w-10 -translate-x-1/2 -translate-y-1/2 sm:h-12 sm:w-12"
                        animate={{ scale: [1, 1.08, 1], opacity: [0.55, 1, 0.55] }}
                        transition={{ duration: 2.2, repeat: Infinity }}
                      >
                        <span className="absolute inset-0 rounded-md border border-yellow-300/80" />
                        <span className="absolute left-1/2 top-0 h-1.5 w-px -translate-x-1/2 bg-yellow-300/80" />
                        <span className="absolute bottom-0 left-1/2 h-1.5 w-px -translate-x-1/2 bg-yellow-300/80" />
                        <span className="absolute left-0 top-1/2 h-px w-1.5 -translate-y-1/2 bg-yellow-300/80" />
                        <span className="absolute right-0 top-1/2 h-px w-1.5 -translate-y-1/2 bg-yellow-300/80" />
                      </motion.div>

                      {/* Bottom camera controls */}
                      <div className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black/90 via-black/45 to-transparent px-2.5 pb-3.5 pt-8 sm:px-3 sm:pb-4 sm:pt-10">
                        <div className="mb-2.5 text-center sm:mb-3">
                          <AnimatePresence mode="wait">
                            <motion.p
                              key={`lbl-${slide}`}
                              className="font-sans text-[7px] font-semibold tracking-wide text-white sm:text-[8px]"
                              initial={{ opacity: 0, y: 3 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0 }}
                            >
                              {REEL_SLIDES[slide].label}
                            </motion.p>
                          </AnimatePresence>
                          <p className="mt-0.5 font-sans text-[5px] uppercase tracking-[0.14em] text-white/50 sm:text-[6px]">
                            Video
                          </p>
                        </div>

                        <div className="grid grid-cols-3 items-center">
                          <div className="flex justify-center">
                            <span className="block h-5 w-5 shrink-0 overflow-hidden rounded-[4px] border border-white/50 sm:h-6 sm:w-6 sm:rounded-md">
                              <img
                                src={REEL_SLIDES[slide].poster}
                                alt=""
                                className="h-full w-full object-cover"
                              />
                            </span>
                          </div>

                          {/* Record — circular ring + red square */}
                          <div className="flex justify-center">
                            <div className="relative flex h-6 w-6 shrink-0 items-center justify-center sm:h-8 sm:w-8 md:h-9 md:w-9">
                              <span className="pointer-events-none absolute inset-0 rounded-full border border-white sm:border-[1.5px] md:border-2" />
                              <motion.span
                                className="block h-[11px] w-[11px] rounded-[2px] bg-[#FF3B30] sm:h-[15px] sm:w-[15px] sm:rounded-[3px] md:h-[17px] md:w-[17px] md:rounded-[3.5px]"
                                animate={{ scale: [1, 0.9, 1] }}
                                transition={{
                                  duration: 1.15,
                                  repeat: Infinity,
                                  ease: "easeInOut",
                                }}
                              />
                            </div>
                          </div>

                          <div className="flex justify-center">
                            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/20 text-white sm:h-6 sm:w-6">
                              <RotateCcw
                                className="h-2.5 w-2.5 sm:h-3 sm:w-3"
                                strokeWidth={1.75}
                              />
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="absolute bottom-1 left-1/2 z-30 h-[2.5px] w-8 -translate-x-1/2 rounded-full bg-white/40 sm:bottom-1.5 sm:h-[3px] sm:w-10" />
                    </div>
                  </div>
                </div>

                <div
                  className="absolute -left-[3px] top-[16%] h-4 w-[3px] rounded-l-sm sm:h-5 md:h-6"
                  style={{ background: "linear-gradient(90deg, #c5d4e3, #8fa3b8 60%, #6e8499)" }}
                />
                <div
                  className="absolute -left-[3px] top-[26%] h-7 w-[3px] rounded-l-sm sm:h-8 md:h-10"
                  style={{ background: "linear-gradient(90deg, #c5d4e3, #8fa3b8 60%, #6e8499)" }}
                />
                <div
                  className="absolute -left-[3px] top-[38%] h-7 w-[3px] rounded-l-sm sm:h-8 md:h-10"
                  style={{ background: "linear-gradient(90deg, #c5d4e3, #8fa3b8 60%, #6e8499)" }}
                />
                <div
                  className="absolute -right-[3px] top-[28%] h-9 w-[3px] rounded-r-sm sm:h-11 md:h-12"
                  style={{ background: "linear-gradient(270deg, #c5d4e3, #8fa3b8 60%, #6e8499)" }}
                />
                <div
                  className="absolute -right-[3px] top-[48%] h-5 w-[3px] rounded-r-sm sm:h-6 md:h-7"
                  style={{ background: "linear-gradient(270deg, #dce6f0, #a8bdd0 55%, #7a92a8)" }}
                />
              </div>
            </motion.div>
          </motion.div>

          <motion.span
            style={{ y: textY }}
            className="select-none overflow-visible px-1 font-sans text-[15vw] font-bold leading-none tracking-[-0.04em] text-silver/45 sm:text-[13vw] md:text-[8.5rem] lg:text-[10.5rem]"
            aria-hidden
          >
            utes
          </motion.span>
        </motion.div>

        <span className="sr-only">Minutes</span>

        {/* Tagline */}
        <motion.div
          className="mt-2 max-w-xl text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.28em] text-silver">
            Your story told instantly
          </p>
          <p className="mt-3 font-serif text-2xl font-medium text-platinum sm:text-3xl md:text-4xl">
            You live the moment.
          </p>
          <p className="mt-3 font-sans text-sm leading-relaxed text-silver md:text-base">
            ReelNow photographs it — cinematic reels, delivered while the energy
            is still fresh.
          </p>
        </motion.div>

        {/* Trust pills — staggered */}
        <div className="mt-7 flex max-w-3xl flex-wrap items-center justify-center gap-2 md:mt-8 md:gap-2.5">
          {trustBadges.map(({ icon: Icon, label }, i) => (
            <motion.span
              key={label}
              className="inline-flex items-center gap-1.5 rounded-full border border-platinum/20 bg-charcoal/70 px-3 py-1.5 font-sans text-[11px] text-platinum shadow-[0_8px_24px_rgba(0,0,0,0.25)] backdrop-blur-xl md:px-3.5"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 + i * 0.07, duration: 0.4 }}
              whileHover={{ scale: 1.05, borderColor: "rgba(230,230,230,0.45)" }}
            >
              <Icon className="h-3 w-3 text-platinum" />
              {label}
            </motion.span>
          ))}
        </div>

        {/* CTAs */}
        <motion.div
          className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:gap-4"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.5 }}
        >
          <MagneticButton
            onClick={onBook}
            className="!min-w-[160px] !rounded-full !px-10 !py-4 !shadow-[0_0_40px_rgba(230,230,230,0.15)]"
          >
            Book Now
          </MagneticButton>
          <MagneticButton
            variant="ghost"
            onClick={() => scrollTo("join")}
            className="!min-w-[160px] !rounded-full !border-platinum/50 !bg-platinum/5 !px-10 !py-4 !text-platinum !backdrop-blur-md"
          >
            Become a Creator
          </MagneticButton>
        </motion.div>

        {/* Glass category cards — always 3 columns */}
        <div className="mt-10 grid w-full max-w-3xl grid-cols-3 gap-2 sm:mt-12 sm:gap-3 md:mt-14 md:gap-4">
          {categories.map(({ icon: Icon, title, desc }, i) => (
            <motion.button
              key={title}
              type="button"
              onClick={onBook}
              className="group relative overflow-hidden rounded-xl border border-platinum/15 bg-charcoal/50 px-2 py-4 text-center shadow-[0_12px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl transition-colors hover:border-platinum/35 sm:rounded-2xl sm:px-5 sm:py-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.95 + i * 0.1, duration: 0.5 }}
              whileHover={{ y: -6, scale: 1.02 }}
            >
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-platinum/[0.06] to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <span className="relative mx-auto flex h-9 w-9 items-center justify-center rounded-full border border-platinum/25 bg-noir/80 text-platinum transition-all duration-300 group-hover:scale-110 group-hover:bg-platinum group-hover:text-noir sm:h-11 sm:w-11">
                <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </span>
              <p className="relative mt-2 font-sans text-[11px] font-semibold text-platinum sm:mt-3 sm:text-sm">
                {title}
              </p>
              <p className="relative mt-1 font-sans text-[9px] leading-snug text-silver sm:mt-1.5 sm:text-xs sm:leading-relaxed">
                {desc}
              </p>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
