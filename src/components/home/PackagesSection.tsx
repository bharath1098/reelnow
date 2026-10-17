"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowUpRight } from "lucide-react";
import { MagneticButton } from "@/components/motion/MagneticButton";

type PackageTab = "instant" | "business" | "wedding";

interface PackagePlan {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  price: string;
  priceNote: string;
  features: string[];
  popular?: boolean;
  cta: string;
}

const TABS: { id: PackageTab; label: string }[] = [
  { id: "instant", label: "Instant packages" },
  { id: "business", label: "Business packages" },
  { id: "wedding", label: "Wedding & Luxe" },
];

const PACKAGES: Record<PackageTab, PackagePlan[]> = {
  instant: [
    {
      id: "quick",
      eyebrow: "For a single reel",
      title: "Quick Shoot",
      description:
        "One hour of coverage for a single polished reel — shot, edited, and delivered on the spot.",
      price: "₹1,999",
      priceNote: "+GST per shoot",
      features: [
        "Up to 1 hour of coverage",
        "1 edited reel delivered",
        "Quick on-site reel delivery",
        "Trained, certified ReelNow creator",
        "Shot on the latest iPhone",
        "Social-ready export",
      ],
      cta: "Check out now",
    },
    {
      id: "half",
      eyebrow: "For special moments",
      title: "Half Day",
      description:
        "Up to 3 hours of coverage with quick turnaround for the moments that matter most.",
      price: "₹4,999",
      priceNote: "+GST per shoot",
      features: [
        "Up to 3 hours of coverage",
        "2 edited reels delivered",
        "Quick on-site reel delivery",
        "Trained, certified ReelNow creator",
        "Shot on the latest iPhone",
        "Music + captions included",
      ],
      popular: true,
      cta: "Check out now",
    },
    {
      id: "full",
      eyebrow: "For full events",
      title: "Full Day",
      description:
        "All-day coverage with multiple reels so every highlight of your event is covered.",
      price: "₹9,999",
      priceNote: "+GST per shoot",
      features: [
        "Up to 8 hours of coverage",
        "4 edited reels delivered",
        "Priority on-site delivery",
        "Dedicated ReelNow creator",
        "Shot on iPhone 15 Pro or newer",
        "Same-day share pack",
      ],
      cta: "Check out now",
    },
  ],
  business: [
    {
      id: "brand-starter",
      eyebrow: "For growing brands",
      title: "Brand Starter",
      description:
        "Product and store reels that look premium — without the agency wait or price tag.",
      price: "₹7,999",
      priceNote: "+GST per shoot",
      features: [
        "Up to 2 hours on location",
        "2 product / store reels",
        "Brand-safe editing style",
        "Shot on latest iPhone",
        "Raw clips on request",
        "24-hour delivery option",
      ],
      cta: "Book brand shoot",
    },
    {
      id: "brand-pro",
      eyebrow: "For campaigns",
      title: "Brand Pro",
      description:
        "Multi-reel packs for launches, openings, and always-on social content.",
      price: "₹14,999",
      priceNote: "+GST per shoot",
      features: [
        "Half-day brand coverage",
        "4 edited campaign reels",
        "On-brand captions & hooks",
        "Trained commercial creator",
        "Shot on iPhone 15 Pro+",
        "Usage rights for ads",
      ],
      popular: true,
      cta: "Book brand shoot",
    },
    {
      id: "retainer",
      eyebrow: "For always-on content",
      title: "Monthly Retainer",
      description:
        "A steady stream of reels every month — consistent look, predictable cost.",
      price: "₹39,999",
      priceNote: "+GST / month",
      features: [
        "8 reels per month",
        "2 shoot days included",
        "Dedicated creator match",
        "Priority scheduling",
        "Monthly content calendar",
        "Performance notes",
      ],
      cta: "Talk to sales",
    },
  ],
  wedding: [
    {
      id: "basic",
      eyebrow: "Essential coverage",
      title: "Basic",
      description:
        "A clean highlight reel of your big day — perfect for intimate weddings and registry ceremonies.",
      price: "₹9,999",
      priceNote: "+GST per event",
      features: [
        "Up to 4 hours coverage",
        "1 cinematic highlight reel",
        "On-site edited delivery",
        "Wedding-trained creator",
        "Shot on latest iPhone",
        "Family share link",
      ],
      cta: "Book Basic",
    },
    {
      id: "silver",
      eyebrow: "Ceremony + reception",
      title: "Silver",
      description:
        "Two reels covering vows and celebrations — share the day while guests are still dancing.",
      price: "₹19,999",
      priceNote: "+GST per event",
      features: [
        "Up to 6 hours coverage",
        "2 edited reels delivered",
        "Same-day teaser option",
        "Wedding-trained creator",
        "Shot on iPhone Pro",
        "Music + captions included",
      ],
      cta: "Book Silver",
    },
    {
      id: "gold",
      eyebrow: "Full celebration day",
      title: "Gold",
      description:
        "Full-day storytelling with multiple reels for every ritual, entry, and revelry.",
      price: "₹34,999",
      priceNote: "+GST per event",
      features: [
        "Full-day coverage",
        "3 cinematic reels",
        "Same-day teaser reel",
        "Lead wedding creator",
        "Premium color grade",
        "Private gallery delivery",
      ],
      popular: true,
      cta: "Book Gold",
    },
    {
      id: "platinum",
      eyebrow: "Multi-day luxury",
      title: "Platinum",
      description:
        "Sangeet to reception — multi-day coverage with VIP coordination and premium delivery.",
      price: "₹59,999",
      priceNote: "+GST package",
      features: [
        "Up to 3 event days",
        "6+ edited reels",
        "Daily teaser delivery",
        "Lead + support creator",
        "Shot on iPhone 18 Pro Max",
        "VIP timeline coordination",
      ],
      cta: "Book Platinum",
    },
  ],
};

interface PackagesSectionProps {
  onBook: () => void;
}

export function PackagesSection({ onBook }: PackagesSectionProps) {
  const [tab, setTab] = useState<PackageTab>("instant");
  const plans = PACKAGES[tab];

  return (
    <section
      id="services"
      className="relative overflow-visible bg-noir py-16 md:py-24"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute left-1/2 top-0 h-72 w-[40rem] -translate-x-1/2 rounded-full bg-platinum/[0.06] blur-[110px]" />
      </div>

      <div className="relative mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.28em] text-silver">
            Packages
          </p>
          <h2 className="mt-4 font-serif text-3xl font-medium text-platinum md:text-5xl">
            Pick a plan. Get your reel in 10 mins.
          </h2>
          <p className="mt-4 font-sans text-sm leading-relaxed text-silver md:text-base">
            Transparent pricing. Fast delivery. Need something custom? Let&apos;s
            talk.
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          className="mt-10 flex flex-wrap items-center justify-center gap-2 md:mt-12"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.45 }}
        >
          {TABS.map((t) => {
            const active = tab === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className={`rounded-full px-5 py-2.5 font-sans text-[12px] font-semibold tracking-wide transition-all duration-300 ${
                  active
                    ? "bg-platinum text-noir shadow-[0_0_30px_rgba(230,230,230,0.2)]"
                    : "text-silver hover:bg-platinum/10 hover:text-platinum"
                }`}
              >
                {t.label}
              </button>
            );
          })}
        </motion.div>

        {/* Cards — pt leaves room for floating “Most Popular” badge */}
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            className={`mt-10 grid grid-cols-1 gap-5 pt-5 md:mt-12 md:grid-cols-2 md:gap-6 md:pt-6 ${
              plans.length >= 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"
            }`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
          >
            {plans.map((plan, i) => (
              <motion.article
                key={plan.id}
                className={`relative flex flex-col rounded-3xl p-6 md:p-7 ${
                  plan.popular
                    ? "z-10 border border-platinum/60 bg-gradient-to-b from-[#2a2a2a] via-charcoal to-noir pt-8 shadow-[0_0_0_1px_rgba(230,230,230,0.25),0_25px_80px_rgba(0,0,0,0.55),0_0_60px_rgba(230,230,230,0.12)] lg:scale-[1.04] lg:my-1"
                    : "border border-platinum/15 bg-charcoal/40 backdrop-blur-xl"
                }`}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                whileHover={{ y: plan.popular ? -8 : -6 }}
              >
                {plan.popular && (
                  <>
                    {/* Soft blooms — clipped in their own layer so badge isn't cut */}
                    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl" aria-hidden>
                      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-platinum to-transparent" />
                      <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-platinum/15 blur-3xl" />
                      <div className="absolute -bottom-20 -left-10 h-36 w-36 rounded-full bg-silver/10 blur-3xl" />
                    </div>

                    <span className="absolute left-1/2 top-0 z-20 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-platinum px-4 py-1.5 font-sans text-[10px] font-bold uppercase tracking-[0.16em] text-noir shadow-[0_8px_24px_rgba(230,230,230,0.35)]">
                      Most Popular
                    </span>
                  </>
                )}

                <p
                  className={`relative font-sans text-[10px] font-semibold uppercase tracking-[0.2em] ${
                    plan.popular ? "text-platinum" : "text-silver"
                  }`}
                >
                  {plan.eyebrow}
                </p>
                <h3
                  className={`relative mt-3 font-sans font-bold tracking-tight text-platinum ${
                    plan.popular ? "text-2xl md:text-[1.75rem]" : "text-2xl"
                  }`}
                >
                  {plan.title}
                </h3>
                <p className="relative mt-3 font-sans text-sm leading-relaxed text-silver">
                  {plan.description}
                </p>

                <div
                  className={`relative mt-6 ${
                    plan.popular
                      ? "rounded-2xl border border-platinum/25 bg-platinum/[0.08] px-4 py-3"
                      : ""
                  }`}
                >
                  <p className="font-sans text-3xl font-bold tracking-tight text-platinum md:text-4xl">
                    {plan.price}{" "}
                    <span className="text-base font-medium text-silver">
                      {plan.priceNote}
                    </span>
                  </p>
                </div>

                <div
                  className={`relative mt-8 pt-6 ${
                    plan.popular
                      ? "border-t border-platinum/25"
                      : "border-t border-platinum/10"
                  }`}
                >
                  <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-silver">
                    What&apos;s included
                  </p>
                  <ul className="mt-4 space-y-3">
                    {plan.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-2.5 font-sans text-sm text-platinum/90"
                      >
                        <span
                          className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${
                            plan.popular
                              ? "bg-platinum text-noir shadow-[0_0_12px_rgba(230,230,230,0.35)]"
                              : "bg-platinum/20 text-platinum"
                          }`}
                        >
                          <Check className="h-2.5 w-2.5" strokeWidth={3} />
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="relative mt-auto pt-8">
                  <MagneticButton
                    variant={plan.popular ? "primary" : "ghost"}
                    onClick={onBook}
                    className={`!w-full !min-w-0 !rounded-full !px-6 !py-3.5 !text-[11px] ${
                      plan.popular
                        ? "!shadow-[0_0_32px_rgba(230,230,230,0.28)]"
                        : ""
                    }`}
                  >
                    {plan.cta}
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </MagneticButton>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </AnimatePresence>

        <p className="mt-10 text-center font-sans text-xs text-silver/70 md:mt-12">
          All packages include trained creators and social-ready delivery.{" "}
          <button
            type="button"
            onClick={onBook}
            className="text-platinum underline-offset-2 hover:underline"
          >
            Need a custom quote?
          </button>
        </p>
      </div>
    </section>
  );
}
