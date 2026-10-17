export type WorkMedia =
  | { source: "file"; video: string; audio?: string }
  | { source: "youtube"; youtubeId: string };

export type WorkClip = {
  id: string;
  title: string;
  subtitle?: string;
  image: string;
} & WorkMedia;

export type WorkSection = {
  id: string;
  label: string;
  clips: WorkClip[];
};

export type WorkEvent = {
  id: string;
  categoryId: WorkCategoryId;
  title: string;
  subtitle?: string;
  /** Missing until a main reel is uploaded in Studio */
  cover?: WorkClip;
  gallery?: WorkClip[];
  sections?: WorkSection[];
  scheduledAt?: string;
  /** false = upcoming shoot (details only in Studio) */
  shootCompleted?: boolean;
};

export const WORK_CATEGORIES = [
  { id: "weddings", label: "Weddings" },
  { id: "fashion", label: "Fashion" },
  { id: "brands", label: "Brands" },
  { id: "movie", label: "Movies" },
  { id: "event", label: "Events" },
  { id: "store", label: "Stores" },
  { id: "vehicle", label: "Vehicle Shoots" },
  { id: "food", label: "Food" },
  { id: "concert", label: "Concerts" },
  { id: "corporate", label: "Corporate" },
  { id: "product", label: "Products" },
] as const;

export type WorkCategoryId = (typeof WORK_CATEGORIES)[number]["id"];

export function isWorkCategoryId(id: string): id is WorkCategoryId {
  return WORK_CATEGORIES.some((c) => c.id === id);
}

export function getCategoryLabel(categoryId: string): string {
  return WORK_CATEGORIES.find((c) => c.id === categoryId)?.label ?? categoryId;
}

export function getSection(
  event: WorkEvent,
  sectionId: string
): WorkSection | undefined {
  return event.sections?.find((section) => section.id === sectionId);
}

export function eventHasMore(event: WorkEvent): boolean {
  return (
    (event.gallery?.length ?? 0) > 0 || (event.sections?.length ?? 0) > 0
  );
}

export function eventPath(event: WorkEvent): string {
  return `/work/${event.categoryId}/${event.id}`;
}

export function sectionPath(event: WorkEvent, sectionId: string): string {
  return `${eventPath(event)}/${sectionId}`;
}
