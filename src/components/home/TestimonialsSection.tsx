"use client";

import { motion } from "framer-motion";

const TESTIMONIALS = [
  {
    quote:
      "Booked for our product launch and the reel was ready before guests left. Absolute game changer for our brand content.",
    name: "Priya Sharma",
    meta: "Brand — Mumbai",
    initials: "PS",
  },
  {
    quote:
      "As a founder I need content fast. ReelNow showed up, shot, edited, and delivered in under 10 minutes. Insane.",
    name: "Arjun Mehta",
    meta: "Founder — Bangalore",
    initials: "AM",
  },
  {
    quote:
      "We use ReelNow for every corporate event now. Professional creators, clear pricing, zero stress on our side.",
    name: "Sarah Johnson",
    meta: "Event — Delhi",
    initials: "SJ",
  },
  {
    quote:
      "Wedding day chaos, but our Reel-Maker caught every candid and handed us a polished reel before dinner ended.",
    name: "Ananya Reddy",
    meta: "Wedding — Hyderabad",
    initials: "AR",
  },
  {
    quote:
      "Transparent packages, live tracking, and quality that looks like a full production crew. Booking took two minutes.",
    name: "Rohan Kapoor",
    meta: "Store — Pune",
    initials: "RK",
  },
  {
    quote:
      "Our influencer collab needed same-day content. ReelNow delivered social-ready reels while the shoot was still on.",
    name: "Meera Iyer",
    meta: "Creator — Chennai",
    initials: "MI",
  },
];

export function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="relative overflow-hidden bg-noir py-16 md:py-28"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute left-[8%] top-0 h-72 w-72 rounded-full bg-platinum/[0.06] blur-[110px]" />
      </div>

      <div className="relative mx-auto max-w-[1120px] px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mb-8 max-w-2xl md:mb-12"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.28em] text-silver">
              In Their Words
            </p>
            <span className="inline-flex items-center gap-1.5 font-sans text-[11px] text-silver/80">
              <span className="tracking-[0.14em] text-platinum" aria-hidden>
                ★★★★★
              </span>
              4.9 · 50,000+ reels
            </span>
          </div>
          <h2 className="mt-3 font-serif text-3xl font-medium text-platinum md:text-5xl">
            Reel shoots to real stories.
          </h2>
        </motion.div>
      </div>

      <div
        className="flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-3 scrollbar-hide sm:gap-4 sm:px-6 lg:px-[max(2rem,calc((100vw-1120px)/2+2rem))]"
        aria-label="Customer feedback"
      >
        {TESTIMONIALS.map((t, i) => (
          <motion.blockquote
            key={t.name}
            className="flex w-[min(78vw,300px)] shrink-0 snap-start flex-col rounded-2xl border border-platinum/12 bg-white/[0.04] p-5 sm:w-[320px] sm:p-6"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: Math.min(i * 0.04, 0.2) }}
          >
            <p className="flex-1 font-sans text-[14px] leading-relaxed text-platinum/90 sm:text-[15px]">
              &ldquo;{t.quote}&rdquo;
            </p>
            <cite className="mt-5 flex items-center gap-2.5 not-italic">
              <span
                className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-platinum/25 bg-noir font-sans text-[10px] font-bold text-platinum"
                aria-hidden
              >
                {t.initials}
              </span>
              <span className="min-w-0">
                <span className="block truncate font-sans text-sm font-semibold text-platinum">
                  {t.name}
                </span>
                <span className="mt-0.5 block truncate font-sans text-[10px] uppercase tracking-[0.14em] text-silver">
                  {t.meta}
                </span>
              </span>
            </cite>
          </motion.blockquote>
        ))}
        {/* Trailing spacer so last card can clear edge / FABs */}
        <div className="w-2 shrink-0 sm:w-4" aria-hidden />
      </div>
    </section>
  );
}
