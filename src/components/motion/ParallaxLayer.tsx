"use client";

import { useRef, ReactNode } from "react";
import {
  motion,
  useScroll,
  useTransform,
  MotionValue,
} from "framer-motion";
import { cn } from "@/lib/utils";

interface ParallaxLayerProps {
  children?: ReactNode;
  className?: string;
  /** Scroll distance multiplier — higher = deeper parallax */
  speed?: number;
  as?: "div" | "img" | "section";
  src?: string;
  alt?: string;
}

/**
 * Deep parallax layer driven by page scroll.
 * Wrap background images or decorative elements.
 */
export function ParallaxLayer({
  children,
  className,
  speed = 0.3,
  as = "div",
  src,
  alt = "",
}: ParallaxLayerProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [`${-speed * 100}%`, `${speed * 100}%`]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1.05, 1.15]);

  if (as === "img" && src) {
    return (
      <div ref={ref} className={cn("absolute inset-0 overflow-hidden", className)}>
        <motion.img
          src={src}
          alt={alt}
          style={{ y, scale }}
          className="absolute inset-0 h-[130%] w-full object-cover will-change-transform"
        />
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      className={cn("will-change-transform", className)}
    >
      {children}
    </motion.div>
  );
}

interface UseParallaxReturn {
  y: MotionValue<string>;
  scrollYProgress: MotionValue<number>;
  ref: React.RefObject<HTMLDivElement>;
}

/** Hook form for custom parallax wiring */
export function useParallax(speed = 0.25): UseParallaxReturn {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [`${-speed * 80}%`, `${speed * 80}%`],
  );
  return { y, scrollYProgress, ref };
}
