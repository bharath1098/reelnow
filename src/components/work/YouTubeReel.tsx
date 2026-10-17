"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

function youtubeEmbedSrc(id: string, origin?: string) {
  const params = new URLSearchParams({
    autoplay: "1",
    mute: "1",
    enablejsapi: "1",
    controls: "0",
    playsinline: "1",
    loop: "1",
    playlist: id,
    rel: "0",
    modestbranding: "1",
    fs: "0",
    disablekb: "1",
    iv_load_policy: "3",
    cc_load_policy: "0",
    showinfo: "0",
    vq: "hd2160",
  });
  if (origin) {
    params.set("origin", origin);
    params.set("widget_referrer", origin);
  }
  return `https://www.youtube.com/embed/${id}?${params.toString()}`;
}

function postYouTubeCommand(
  iframe: HTMLIFrameElement,
  func: string,
  args: unknown[] = []
) {
  iframe.contentWindow?.postMessage(
    JSON.stringify({ event: "command", func, args }),
    "*"
  );
}

export function YouTubeReel({
  id,
  title,
  poster,
  isActive,
}: {
  id: string;
  title: string;
  poster: string;
  isActive: boolean;
}) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  // Keep SSR and first client paint identical (no window during render).
  const [origin, setOrigin] = useState<string | undefined>(undefined);
  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);
  const src = useMemo(() => youtubeEmbedSrc(id, origin), [id, origin]);

  const pushPlayer = useCallback(() => {
    const iframe = iframeRef.current;
    if (!iframe?.contentWindow) return;
    iframe.contentWindow.postMessage(
      JSON.stringify({ event: "listening", id }),
      "*"
    );
    postYouTubeCommand(iframe, "playVideo");
    if (isActive) {
      postYouTubeCommand(iframe, "unMute");
      postYouTubeCommand(iframe, "setVolume", [100]);
    } else {
      postYouTubeCommand(iframe, "mute");
    }
  }, [id, isActive]);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    const onLoad = () => {
      pushPlayer();
      window.setTimeout(pushPlayer, 400);
    };
    iframe.addEventListener("load", onLoad);
    pushPlayer();
    const keepAlive = window.setInterval(pushPlayer, 1500);
    return () => {
      iframe.removeEventListener("load", onLoad);
      window.clearInterval(keepAlive);
    };
  }, [pushPlayer, src]);

  return (
    <div className="absolute inset-0 overflow-hidden bg-black">
      <iframe
        ref={iframeRef}
        title={title}
        src={src}
        className="pointer-events-none absolute left-1/2 top-1/2 h-full w-full origin-center -translate-x-1/2 -translate-y-1/2 scale-[1.35] border-0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        tabIndex={-1}
      />
      <img
        src={poster}
        alt=""
        className="pointer-events-none absolute inset-0 -z-[1] h-full w-full object-cover"
      />
    </div>
  );
}
