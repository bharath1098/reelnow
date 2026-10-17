import type { WorkClip, WorkEvent, WorkSection } from "@/lib/work";
import type { clips, events, sections } from "./schema";

type EventRow = typeof events.$inferSelect;
type SectionRow = typeof sections.$inferSelect;
type ClipRow = typeof clips.$inferSelect;

function toClip(row: ClipRow): WorkClip {
  const base = {
    id: row.id,
    title: row.title,
    subtitle: row.subtitle ?? undefined,
    image: row.image,
  };
  if (row.source === "youtube" && row.youtubeId) {
    return { ...base, source: "youtube", youtubeId: row.youtubeId };
  }
  return {
    ...base,
    source: "file",
    video: row.videoUrl ?? "",
    audio: row.audioUrl ?? undefined,
  };
}

export function assembleEvent(
  event: EventRow,
  sectionRows: SectionRow[],
  clipRows: ClipRow[]
): WorkEvent {
  const coverRow = clipRows.find(
    (clip) => clip.eventId === event.id && clip.kind === "cover"
  );

  const gallery = clipRows
    .filter((clip) => clip.eventId === event.id && clip.kind === "gallery")
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map(toClip);

  const eventSections: WorkSection[] = sectionRows
    .filter((section) => section.eventId === event.id)
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((section) => ({
      id: section.id,
      label: section.label,
      clips: clipRows
        .filter(
          (clip) => clip.sectionId === section.id && clip.kind === "section"
        )
        .sort((a, b) => a.sortOrder - b.sortOrder)
        .map(toClip),
    }));

  return {
    id: event.id,
    categoryId: event.categoryId as WorkEvent["categoryId"],
    title: event.title,
    subtitle: event.subtitle ?? undefined,
    cover: coverRow ? toClip(coverRow) : undefined,
    gallery: gallery.length ? gallery : undefined,
    sections: eventSections.length ? eventSections : undefined,
    scheduledAt: event.scheduledAt ?? undefined,
    shootCompleted: Number(event.shootCompleted ?? 0) === 1,
  };
}
