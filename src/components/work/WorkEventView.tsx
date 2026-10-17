"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { WorkPageShell } from "@/components/work/WorkPageShell";
import { WorkReelCard } from "@/components/work/WorkReelCard";
import { useFileSoundtrack } from "@/hooks/useFileSoundtrack";
import {
  eventPath,
  getCategoryLabel,
  sectionPath,
  type WorkEvent,
  type WorkSection,
} from "@/lib/work";

export function WorkEventView({
  event,
  preview = false,
}: {
  event: WorkEvent;
  /** Render inside Studio as a live site preview */
  preview?: boolean;
}) {
  const router = useRouter();
  const cover = event.cover;
  const [activeClipId, setActiveClipId] = useState<string | null>(
    cover?.id ?? null,
  );
  const gallery = event.gallery ?? [];
  const sections = event.sections ?? [];
  const activeClip =
    gallery.find((clip) => clip.id === activeClipId) ?? cover ?? undefined;

  useEffect(() => {
    if (!preview) {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }
    setActiveClipId(cover?.id ?? null);
  }, [cover?.id, preview]);

  useFileSoundtrack(activeClip?.source === "file" ? activeClip : undefined);

  const categoryLabel = getCategoryLabel(event.categoryId);

  const openSection = (sectionId: string) => {
    const path = sectionPath(event, sectionId);
    if (preview) {
      window.open(path, "_blank", "noopener,noreferrer");
      return;
    }
    router.push(path);
  };

  return (
    <WorkPageShell wide embedded={preview}>
      {!preview && (
      <Link
        href={`/work/${event.categoryId}`}
        className="inline-flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-silver transition-colors hover:text-platinum"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        {categoryLabel}
      </Link>
      )}
      {preview && (
        <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.28em] text-silver">
          How visitors see this event
        </p>
      )}

      <div
        className={`${preview ? "mt-4" : "mt-8"} grid items-start gap-10 lg:grid-cols-[minmax(240px,300px)_minmax(0,1fr)] xl:grid-cols-[minmax(260px,320px)_minmax(0,1fr)] lg:gap-12`}
      >
        <div className="mx-auto w-full max-w-[300px] lg:mx-0">
          {cover ? (
            <WorkReelCard
              clip={cover}
              badge="Main reel"
              title={cover.title}
              subtitle={cover.subtitle}
              isActive={activeClipId === cover.id}
              onActivate={() => setActiveClipId(cover.id)}
              size="hero"
            />
          ) : (
            <div className="flex aspect-[9/16] items-center justify-center rounded-[1.75rem] border border-dashed border-platinum/25 bg-charcoal/40 px-6 text-center font-sans text-sm text-silver">
              Main reel coming soon
            </div>
          )}
        </div>

        <div className="min-w-0 lg:pt-2">
          <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.28em] text-silver">
            {categoryLabel}
          </p>
          <h1 className="mt-3 font-serif text-4xl font-medium leading-tight text-platinum md:text-5xl xl:text-6xl">
            {event.title}
          </h1>
          {event.subtitle && (
            <p className="mt-4 max-w-xl font-sans text-sm leading-relaxed text-silver md:text-base">
              {event.subtitle}
            </p>
          )}

          <div className="mt-8 flex flex-wrap gap-3">
            {!preview && (
              <MagneticButton
                onClick={() => router.push("/#contact")}
                className="!min-w-0 !rounded-full !px-7 !py-3.5 !text-[12px] !tracking-[0.14em]"
              >
                Book Your Shoot
              </MagneticButton>
            )}
            {sections.length > 0 && (
              <button
                type="button"
                onClick={() =>
                  document
                    .getElementById(
                      preview ? "preview-event-sections" : "event-sections",
                    )
                    ?.scrollIntoView({ behavior: "smooth", block: "start" })
                }
                className="rounded-full border border-platinum/30 px-7 py-3.5 font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-platinum transition-colors hover:border-platinum/60 hover:bg-platinum/5"
              >
                Browse sections
              </button>
            )}
          </div>

          {(sections.length > 0 || gallery.length > 0) && (
            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 border-t border-platinum/10 pt-6 font-sans text-xs text-silver">
              <span>
                <span className="text-platinum">{sections.length}</span> sections
              </span>
              <span>
                <span className="text-platinum">{gallery.length}</span> extra clips
              </span>
              <span>Main reel included</span>
            </div>
          )}
        </div>
      </div>

      {sections.length > 0 && (
        <div
          id={preview ? "preview-event-sections" : "event-sections"}
          className="mt-16 md:mt-20"
        >
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="font-sans text-[11px] font-semibold uppercase tracking-[0.28em] text-silver">
                Sections
              </h2>
              <p className="mt-2 font-serif text-2xl text-platinum md:text-3xl">
                Moments from this shoot
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-4">
            {sections.map((section) => {
              const thumb = section.clips[0];
              return (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => openSection(section.id)}
                  className="group flex h-[148px] w-[300px] shrink-0 overflow-hidden rounded-2xl border border-platinum/15 bg-charcoal/50 text-left shadow-[0_16px_40px_rgba(0,0,0,0.35)] transition-all hover:-translate-y-1 hover:border-platinum/40"
                >
                  <div className="relative h-full w-[110px] shrink-0 overflow-hidden bg-noir">
                    {thumb ? (
                      <img
                        src={thumb.image}
                        alt=""
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="h-full w-full bg-noir" />
                    )}
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col justify-between p-4">
                    <div>
                      <p className="font-serif text-xl leading-tight text-platinum">
                        {section.label}
                      </p>
                      <p className="mt-2 font-sans text-xs text-silver">
                        {section.clips.length}{" "}
                        {section.clips.length === 1 ? "video" : "videos"}
                      </p>
                    </div>
                    <span className="flex h-8 w-8 items-center justify-center self-end rounded-full border border-white/20 bg-noir/40 text-platinum transition-colors group-hover:bg-platinum group-hover:text-noir">
                      <ChevronRight className="h-4 w-4" />
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {gallery.length > 0 && (
        <div className="mt-16 md:mt-20">
          <h2 className="font-sans text-[11px] font-semibold uppercase tracking-[0.28em] text-silver">
            More from this event
          </h2>
          <p className="mt-2 font-serif text-2xl text-platinum md:text-3xl">
            Extra clips
          </p>
          <div
            className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
            onMouseLeave={() => setActiveClipId(cover?.id ?? null)}
          >
            {gallery.map((clip) => (
              <WorkReelCard
                key={clip.id}
                clip={clip}
                badge={categoryLabel}
                title={clip.title}
                subtitle={clip.subtitle}
                isActive={activeClipId === clip.id}
                onActivate={() => setActiveClipId(clip.id)}
              />
            ))}
          </div>
        </div>
      )}
    </WorkPageShell>
  );
}

export function WorkSectionView({
  event,
  section,
}: {
  event: WorkEvent;
  section: WorkSection;
}) {
  const router = useRouter();
  const [activeClipId, setActiveClipId] = useState<string | null>(null);
  const activeClip = section.clips.find((clip) => clip.id === activeClipId);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    setActiveClipId(null);
  }, [section.id]);

  useFileSoundtrack(activeClip);

  const categoryLabel = getCategoryLabel(event.categoryId);
  const clipGrid =
    section.clips.length === 1
      ? "grid max-w-sm grid-cols-1 justify-items-stretch"
      : "grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5";

  return (
    <WorkPageShell wide>
      <Link
        href={eventPath(event)}
        className="inline-flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-silver transition-colors hover:text-platinum"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        {event.title}
      </Link>

      <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.28em] text-silver">
            {categoryLabel} · {event.title}
          </p>
          <h1 className="mt-3 font-serif text-4xl font-medium text-platinum md:text-5xl">
            {section.label}
          </h1>
          <p className="mt-3 font-sans text-sm text-silver">
            {section.clips.length}{" "}
            {section.clips.length === 1 ? "video" : "videos"} from this part of
            the event.
          </p>
        </div>
        <MagneticButton
          variant="ghost"
          onClick={() => router.push(eventPath(event))}
          className="!min-w-0 !rounded-full !px-6 !py-3 !text-[12px]"
        >
          Back to event
        </MagneticButton>
      </div>

      <div
        className={`mt-10 ${clipGrid}`}
        onMouseLeave={() => setActiveClipId(null)}
      >
        {section.clips.map((clip) => (
          <WorkReelCard
            key={clip.id}
            clip={clip}
            badge={section.label}
            title={clip.title}
            subtitle={clip.subtitle}
            isActive={activeClipId === clip.id}
            onActivate={() => setActiveClipId(clip.id)}
          />
        ))}
      </div>

      {section.clips.length === 0 && (
        <p className="mt-16 text-center font-sans text-sm text-silver">
          No videos in this section yet.
        </p>
      )}
    </WorkPageShell>
  );
}
