"use client";

import { useEffect, useRef } from "react";
import type { WorkClip } from "@/lib/work";

export function useFileSoundtrack(clip: WorkClip | undefined) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!clip || clip.source !== "file" || !clip.audio) {
      audioRef.current?.pause();
      return;
    }
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.loop = true;
    }
    const a = audioRef.current;
    if (a.getAttribute("src") !== clip.audio) a.src = clip.audio;
    a.volume = 0.55;
    a.play().catch(() => {});
  }, [clip]);

  useEffect(() => {
    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);
}
