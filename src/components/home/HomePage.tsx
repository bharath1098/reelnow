"use client";

import React from "react";
import {
  Zap,
  Smartphone,
  CheckCircle2,
  ArrowRight,
  Clock,
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { CinematicHero } from "@/components/home/CinematicHero";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { WorkShowcase } from "@/components/home/WorkShowcase";
import { PackagesSection } from "@/components/home/PackagesSection";
import { WhyReelNow } from "@/components/home/WhyReelNow";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { ContactSection } from "@/components/home/ContactSection";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { ParallaxLayer } from "@/components/motion/ParallaxLayer";
import { FadeIn } from "@/components/motion/StaggerReveal";
import { IMAGES } from "@/lib/images";
import type { WorkEvent } from "@/lib/work";

const Index = ({ featured }: { featured: WorkEvent[] }) => {
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const creatorBenefits = [
    "No expensive gear — just your iPhone",
    "Get paid instantly after each shoot",
    "Flexible schedule — work when you want",
    "Join a creative community",
    "Training & support provided",
  ];

  return (
    <div className="min-h-screen bg-noir">
      <Navigation />
      <CinematicHero onBook={scrollToContact} />
      <FeaturesSection onBook={scrollToContact} />
      <WorkShowcase events={featured} onWatchMore={scrollToContact} />

      {/* Feature banner */}
      <section className="relative min-h-[65vh] overflow-hidden">
        <ParallaxLayer
          as="img"
          src={IMAGES.cultural}
          alt="Cinematic lifestyle"
          speed={0.35}
          className="absolute inset-0"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-noir/95 via-noir/75 to-charcoal/50" />
        <div className="pointer-events-none absolute left-1/4 top-1/3 h-64 w-64 rounded-full bg-platinum/10 blur-[100px]" />
        <div className="relative z-10 mx-auto flex min-h-[65vh] max-w-[1280px] items-center px-4 py-20 md:px-8 lg:px-12">
          <FadeIn className="glass max-w-lg rounded-3xl p-8 md:p-10">
            <p className="eyebrow">The Craft</p>
            <h2 className="mt-4 font-serif text-4xl font-medium leading-[1.15] text-white md:text-5xl lg:text-6xl">
              Capture.
              <br />
              <span className="font-script text-5xl text-platinum md:text-6xl">
                Create.
              </span>
              <br />
              Deliver.
            </h2>
            <p className="mt-6 max-w-md font-sans text-sm leading-relaxed text-white/70 md:text-[15px]">
              Every reel is a story cut to the bone — light, motion, and emotion
              distilled into seconds that stop the scroll.
            </p>
            <MagneticButton onClick={scrollToContact} className="mt-8">
              Start Your Story
            </MagneticButton>
          </FadeIn>
        </div>
      </section>

      <PackagesSection onBook={scrollToContact} />
      <WhyReelNow />

      {/* Creator banner */}
      <section id="join" className="relative overflow-hidden section-padding">
        <ParallaxLayer
          as="img"
          src={IMAGES.creator}
          alt=""
          speed={0.25}
          className="absolute inset-0 opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-noir via-noir/90 to-charcoal/50" />
        <div className="pointer-events-none absolute right-1/4 top-1/2 h-56 w-56 -translate-y-1/2 rounded-full bg-silver/15 blur-[90px]" />
        <div className="relative z-10 mx-auto grid max-w-[1280px] gap-12 lg:grid-cols-2 lg:items-center">
          <FadeIn direction="left">
            <p className="eyebrow">For Creators</p>
            <h2 className="mt-4 font-serif text-3xl font-medium text-white md:text-5xl">
              Turn your iPhone into an{" "}
              <span className="font-script text-4xl text-platinum md:text-5xl">
                income machine
              </span>
              </h2>
            <p className="mt-5 max-w-md font-sans text-sm leading-relaxed text-white/65">
              Have an iPhone and a passion for video? Join ReelNow and get paid
              to create. No DSLR required.
            </p>
            <ul className="mt-8 space-y-3">
              {creatorBenefits.map((b) => (
                <li
                  key={b}
                  className="flex items-center gap-3 font-sans text-sm text-white/80"
                >
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-platinum" />
                  {b}
                  </li>
                ))}
              </ul>
            <MagneticButton onClick={scrollToContact} className="mt-8">
                Apply Now
              <ArrowRight className="h-4 w-4" />
            </MagneticButton>
          </FadeIn>
          <FadeIn direction="right" delay={0.15}>
            <div className="glass rounded-3xl p-8 md:p-12">
              <Smartphone className="mx-auto mb-6 h-12 w-12 text-platinum" />
              <h3 className="text-center font-serif text-2xl font-medium text-white">
                    Start Earning Today
                  </h3>
              <p className="mt-3 text-center font-sans text-sm text-white/55">
                Join 500+ creators already earning with ReelNow. iPhone 13 Pro
                or newer.
              </p>
              <div className="mt-8 flex justify-center gap-6 font-sans text-xs text-white/55">
                <span className="flex items-center gap-2">
                  <Zap className="h-3.5 w-3.5 text-platinum" /> Instant Payouts
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="h-3.5 w-3.5 text-platinum" /> Flexible Hours
                </span>
                    </div>
                    </div>
          </FadeIn>
        </div>
      </section>

      <TestimonialsSection />
      <ContactSection />

      <Footer />
    </div>
  );
};

export default Index;
