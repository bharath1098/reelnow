"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import { YouTubeReel } from "@/components/work/YouTubeReel";
import type { WorkClip } from "@/lib/work";

export function WorkReelCard({
  clip,
  badge,
  title,
  subtitle,
  isActive,
  onActivate,
  onOpen,
  hint,
  size = "grid",
}: {
  clip: WorkClip;
  badge: string;
  title: string;
  subtitle?: string;
  isActive: boolean;
  onActivate: () => void;
  onOpen?: () => void;
  hint?: string;
  size?: "grid" | "hero";
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const isYoutube = clip.source === "youtube";

  useEffect(() => {
    if (isYoutube || !videoRef.current) return;
    videoRef.current.muted = true;
    videoRef.current.play().catch(() => {});
  }, [isYoutube]);

  const handleActivate = () => {
    if (onOpen) {
      onOpen();
      return;
    }
    onActivate();
  };

  return (
    <motion.div
      role="button"
      tabIndex={0}
      onMouseEnter={onActivate}
      onClick={handleActivate}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleActivate();
        }
      }}
      title={hint}
      className={`group relative aspect-[9/16] w-full cursor-pointer overflow-hidden rounded-[1.75rem] text-left shadow-[0_12px_36px_rgba(0,0,0,0.5)] ${
        size === "hero" ? "max-w-[320px] md:max-w-[360px]" : "max-w-[260px]"
      } ${
        isActive
          ? "ring-2 ring-platinum shadow-[0_16px_48px_rgba(230,230,230,0.14)]"
          : "ring-1 ring-white/10"
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
    >
      {isYoutube ? (
        <YouTubeReel
          id={clip.youtubeId}
          title={clip.title}
          poster={clip.image}
          isActive={isActive}
        />
      ) : (
        <video
          ref={videoRef}
          src={clip.video}
          poster={clip.image}
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
      )}

      <div
        className={`pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent transition-opacity ${
          isActive ? "opacity-50" : "opacity-95"
        }`}
      />

      <div
        className={`absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full backdrop-blur-md ${
          isActive
            ? "bg-white/90 text-noir opacity-100"
            : "bg-black/40 text-white/80"
        }`}
        aria-hidden
      >
        {isActive ? (
          <Volume2 className="h-3.5 w-3.5" />
        ) : (
          <VolumeX className="h-3.5 w-3.5" />
        )}
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 p-4 sm:p-5">
        <span className="inline-block rounded-md bg-platinum px-2.5 py-1 font-sans text-[10px] font-bold uppercase tracking-[0.12em] text-noir">
          {badge}
        </span>
        <h3 className="mt-2.5 font-sans text-base font-bold tracking-tight text-white sm:text-lg">
          {title}
        </h3>
        {subtitle && (
          <p className="mt-1 font-sans text-xs text-white/70 sm:text-sm">
            {subtitle}
          </p>
        )}
      </div>
    </motion.div>
  );
}
