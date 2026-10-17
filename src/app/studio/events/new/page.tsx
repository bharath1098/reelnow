import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { WORK_CATEGORIES } from "@/lib/work";
import { createEvent } from "@/app/studio/actions";
import { StudioTokenField } from "@/components/studio/StudioAuthProvider";

export default function NewEventPage() {
  return (
    <div className="w-full">
      <Link
        href="/studio"
        className="inline-flex items-center gap-2 font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-silver hover:text-platinum"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        All events
      </Link>
      <p className="eyebrow mt-8">Create</p>
      <h1 className="mt-3 font-serif text-4xl font-medium md:text-5xl">
        New event
      </h1>
      <p className="mt-3 max-w-2xl font-sans text-sm leading-relaxed text-silver">
        Name the shoot, pick a category, then add the main reel. Ceremony clips
        come after.
      </p>

      <form action={createEvent} className="studio-panel mt-10 space-y-6">
        <StudioTokenField />
        <div className="grid gap-6 lg:grid-cols-2">
          <label className="studio-label">
            Event title
            <input
              name="title"
              required
              placeholder="Ravi weds Varsha"
              className="studio-input"
            />
          </label>
          <label className="studio-label">
            Category
            <select name="categoryId" className="studio-input">
              {WORK_CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.label}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          <label className="studio-label">
            YouTube / Shorts URL
            <input
              name="youtube"
              placeholder="https://youtube.com/shorts/…"
              className="studio-input"
            />
          </label>
          <label className="studio-label">
            Or file URL
            <input
              name="fileUrl"
              placeholder="https://…/reel.mp4"
              className="studio-input"
            />
          </label>
        </div>
        <button
          type="submit"
          className="w-full rounded-full bg-platinum py-4 font-sans text-[12px] font-semibold uppercase tracking-[0.16em] text-noir transition-opacity hover:opacity-90 md:w-auto md:px-10"
        >
          Create event
        </button>
      </form>
    </div>
  );
}
