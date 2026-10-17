"use client";

import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { WorkEventView } from "@/components/work/WorkEventView";
import { eventPath, type WorkEvent } from "@/lib/work";

export function StudioEventPreview({ event }: { event: WorkEvent }) {
  const publicUrl = eventPath(event);
  const sectionCount = event.sections?.length ?? 0;
  const galleryCount = event.gallery?.length ?? 0;

  return (
    <section className="studio-panel overflow-hidden !p-0">
      <div className="flex flex-col gap-4 border-b border-platinum/10 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <h2 className="font-serif text-2xl text-platinum">Site preview</h2>
          <p className="mt-1 font-sans text-sm text-silver">
            Same layout visitors see on the public work page
            {sectionCount > 0 || galleryCount > 0
              ? ` · ${sectionCount} section${sectionCount === 1 ? "" : "s"}, ${galleryCount} extra clip${galleryCount === 1 ? "" : "s"}`
              : " · add a section or video above to fill this out"}
          </p>
        </div>
        <Link
          href={publicUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-full border border-platinum/30 px-5 py-3 font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-platinum transition-colors hover:bg-platinum/10"
        >
          Open public page
          <ExternalLink className="h-3.5 w-3.5" />
        </Link>
      </div>
      <div className="max-h-[min(90vh,920px)] overflow-y-auto border-t border-platinum/5 bg-noir">
        <WorkEventView event={event} preview />
      </div>
    </section>
  );
}
