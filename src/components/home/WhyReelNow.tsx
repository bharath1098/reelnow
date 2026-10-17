"use client";

import { motion } from "framer-motion";

const REASONS = [
  {
    title: "Trusted creators, every time",
    description:
      "Every Reel-Maker is ID-verified, background-checked, and live-tracked from arrival to delivery.",
  },
  {
    title: "Your reel in under 10 minutes",
    description:
      "Shot, edited, and handed over on the spot — share while the moment is still live.",
  },
  {
    title: "Clear pricing from ₹1,999",
    description:
      "Pick a package, pay securely, and you're done. No hidden fees after booking.",
  },
  {
    title: "Trained for real shoots",
    description:
      "Creators pass framing, lighting, editing, speed, and etiquette checks before going live.",
  },
  {
    title: "Follow them in real time",
    description:
      "Live ETA, status updates, and arrival alerts — book and track like a ride.",
  },
];

const STATS = [
  { value: "50,000+", label: "Reels Delivered" },
  { value: "1,500+", label: "Reel-Makers" },
  { value: "12+", label: "Cities" },
  { value: "4.9", label: "Avg Rating" },
];

export function WhyReelNow() {
  return (
    <section
      id="why"
      className="relative overflow-hidden bg-noir py-20 md:py-28"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -left-24 top-0 h-[28rem] w-[28rem] rounded-full bg-platinum/[0.05] blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left — headline */}
          <motion.div
            className="lg:sticky lg:top-32"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.28em] text-silver">
              Why ReelNow
            </p>
            <h2 className="mt-5 font-serif text-4xl font-medium leading-[1.1] text-platinum md:text-5xl lg:text-[3.5rem]">
              Content that moves.
            </h2>
            <p className="mt-6 max-w-md font-sans text-base leading-relaxed text-silver md:text-lg">
              Instant reels for events, brands, and weddings — shot on iPhone,
              edited on site, ready to post.
            </p>
          </motion.div>

          {/* Right — feature list */}
          <ul className="divide-y divide-platinum/10">
            {REASONS.map((item, i) => (
              <motion.li
                key={item.title}
                className="flex gap-4 py-6 first:pt-0 last:pb-0"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
              >
                <span
                  className="mt-2 h-2 w-2 shrink-0 rounded-full bg-platinum shadow-[0_0_12px_rgba(230,230,230,0.45)]"
                  aria-hidden
                />
                <div>
                  <h3 className="font-sans text-base font-semibold text-platinum md:text-lg">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 font-sans text-sm leading-relaxed text-silver">
                    {item.description}
                  </p>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Stats bar */}
        <motion.div
          className="mt-16 grid grid-cols-2 overflow-hidden rounded-2xl border border-platinum/15 bg-charcoal/50 backdrop-blur-xl md:mt-20 md:grid-cols-4"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.15 }}
        >
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={`px-6 py-8 text-center md:px-8 ${
                i > 0 ? "border-t border-platinum/10 md:border-l md:border-t-0" : ""
              } ${i === 2 ? "border-t border-platinum/10 md:border-t-0" : ""}`}
            >
              <p className="font-serif text-3xl font-medium tracking-tight text-platinum md:text-4xl">
                {stat.value}
              </p>
              <p className="mt-2 font-sans text-[10px] font-medium uppercase tracking-[0.22em] text-silver md:text-[11px]">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
