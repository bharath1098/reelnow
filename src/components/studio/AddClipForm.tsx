"use client";

import { useActionState } from "react";
import { addClip } from "@/app/studio/actions";
import { StudioTokenField } from "@/components/studio/StudioAuthProvider";

type SectionOption = { id: string; label: string };

export function AddClipForm({
  eventId,
  sections,
}: {
  eventId: string;
  sections: SectionOption[];
}) {
  const action = addClip.bind(null, eventId);
  const [state, formAction, pending] = useActionState(action, null);

  return (
    <form action={formAction} className="mt-6 space-y-4">
      <StudioTokenField />
      <label className="studio-label">
        Goes into
        <select name="target" className="studio-input">
          <option value="gallery">More from this event</option>
          {sections.map((section) => (
            <option key={section.id} value={`section:${section.id}`}>
              {section.label}
            </option>
          ))}
        </select>
      </label>
      <label className="studio-label">
        Title
        <input name="title" placeholder="Clip title" className="studio-input" />
      </label>
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
      <label className="studio-label">
        Or upload a file
        <input
          name="file"
          type="file"
          accept="video/*,image/*"
          className="mt-2 w-full font-sans text-sm text-platinum file:mr-3 file:rounded-full file:border-0 file:bg-platinum file:px-4 file:py-2 file:text-[11px] file:font-semibold file:uppercase file:tracking-[0.14em] file:text-noir"
        />
      </label>
      {state?.error && (
        <p className="rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 font-sans text-sm text-red-300">
          {state.error}
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-platinum py-4 font-sans text-[12px] font-semibold uppercase tracking-[0.16em] text-noir disabled:opacity-60 sm:w-auto sm:px-10"
      >
        {pending ? "Adding…" : "Add video"}
      </button>
    </form>
  );
}
