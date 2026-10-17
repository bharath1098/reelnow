import Link from "next/link";
import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { ArrowLeft, ExternalLink, Trash2, Users } from "lucide-react";
import { db } from "@/db";
import { ensureSchema } from "@/db/ensure-schema";
import { eventAssignments, events, inquiries, users } from "@/db/schema";
import { getEvent } from "@/db/queries";
import {
  addSection,
  assignWorker,
  deleteEventAndRedirect,
  setEventCover,
} from "@/app/studio/actions";
import { AddClipForm } from "@/components/studio/AddClipForm";
import { StudioTokenField } from "@/components/studio/StudioAuthProvider";
import { StudioClipThumb } from "@/components/studio/StudioClipThumb";
import { StudioEventPreview } from "@/components/studio/StudioEventPreview";
import { UpcomingShootPanel } from "@/components/studio/UpcomingShootPanel";
import { eventPath, getCategoryLabel } from "@/lib/work";

export const dynamic = "force-dynamic";

export default async function EditEventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await ensureSchema();
  const { id } = await params;
  const [row] = await db.select().from(events).where(eq(events.id, id));
  if (!row) notFound();
  const event = await getEvent(row.categoryId, id);
  if (!event) notFound();

  const workers = await db.select().from(users).where(eq(users.role, "worker"));
  const assigned = await db
    .select()
    .from(eventAssignments)
    .where(eq(eventAssignments.eventId, id));
  const assignedIds = new Set(assigned.map((a) => a.userId));
  const assignedPeople = workers.filter((worker) => assignedIds.has(worker.id));

  const [inquiry] = await db
    .select()
    .from(inquiries)
    .where(eq(inquiries.eventId, id))
    .limit(1);

  const shootCompleted = Number(row.shootCompleted ?? 0) === 1;

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <Link
            href="/studio"
            className="inline-flex items-center gap-2 font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-silver hover:text-platinum"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            All events
          </Link>
          <p className="eyebrow mt-6">
            {getCategoryLabel(event.categoryId)}
            {!shootCompleted ? " · Upcoming" : ""}
          </p>
          <h1 className="mt-3 font-serif text-4xl font-medium md:text-5xl">
            {event.title}
          </h1>
          {row.scheduledAt && (
            <p className="mt-2 font-sans text-sm text-silver">
              Shoot date · {row.scheduledAt}
            </p>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {shootCompleted && event.cover && (
            <Link
              href={eventPath(event)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-platinum/30 px-4 py-2.5 font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-platinum hover:bg-platinum/10"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              View on site
            </Link>
          )}
          <form action={deleteEventAndRedirect.bind(null, id)}>
            <StudioTokenField />
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-full border border-red-400/30 px-4 py-2.5 font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-red-300 hover:bg-red-500/10"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Delete
            </button>
          </form>
        </div>
      </div>

      {!shootCompleted ? (
        <UpcomingShootPanel
          eventId={id}
          title={event.title}
          categoryLabel={getCategoryLabel(event.categoryId)}
          scheduledAt={row.scheduledAt}
          subtitle={event.subtitle}
          details={
            inquiry
              ? {
                  clientName: inquiry.fullName,
                  phone: inquiry.phone,
                  email: inquiry.email,
                  packageName: inquiry.packageName,
                  city: inquiry.city,
                  state: inquiry.state,
                  address: inquiry.address ?? undefined,
                  preferredTime: inquiry.preferredTime,
                  notes: inquiry.details ?? undefined,
                }
              : null
          }
        />
      ) : (
        <>
          <div className="grid gap-6 xl:grid-cols-[280px_minmax(0,1fr)] 2xl:grid-cols-[320px_minmax(0,1fr)]">
            <div className="overflow-hidden rounded-[1.5rem] border border-platinum/15 bg-charcoal/40 xl:sticky xl:top-24 xl:self-start">
              {event.cover ? (
                <>
                  <div className="relative aspect-[9/16] max-h-[70vh]">
                    <img
                      src={event.cover.image}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                    <span className="absolute left-3 top-3 rounded-full bg-platinum px-2.5 py-1 font-sans text-[10px] font-bold uppercase tracking-[0.12em] text-noir">
                      Main reel
                    </span>
                  </div>
                  <p className="p-4 font-sans text-xs leading-relaxed text-silver">
                    {event.cover.source === "youtube"
                      ? `YouTube · ${event.cover.youtubeId}`
                      : "Hosted file"}
                    . Use the star on any section or gallery video to make it
                    the main reel.
                  </p>
                </>
              ) : (
                <div className="p-5">
                  <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-silver">
                    Main reel
                  </p>
                  <p className="mt-2 font-sans text-sm text-silver">
                    Add the main reel for this completed shoot.
                  </p>
                  <form
                    action={setEventCover.bind(null, id)}
                    className="mt-4 space-y-3"
                  >
                    <StudioTokenField />
                    <input type="hidden" name="title" value={event.title} />
                    <label className="studio-label mt-0">
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
                      Or upload
                      <input
                        name="file"
                        type="file"
                        accept="video/*"
                        className="mt-2 w-full font-sans text-sm text-platinum file:mr-3 file:rounded-full file:border-0 file:bg-platinum file:px-4 file:py-2 file:text-[11px] file:font-semibold file:uppercase file:tracking-[0.14em] file:text-noir"
                      />
                    </label>
                    <button
                      type="submit"
                      className="w-full rounded-full bg-platinum py-3 font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-noir"
                    >
                      Save main reel
                    </button>
                  </form>
                </div>
              )}
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <section className="studio-panel">
                <h2 className="font-serif text-2xl text-platinum">Sections</h2>
                <p className="mt-1 font-sans text-sm text-silver">
                  Mehendi, Sangeet, Reception — or any label for this event.
                </p>
                <form
                  action={addSection.bind(null, id)}
                  className="mt-5 flex flex-col gap-3 sm:flex-row"
                >
                  <StudioTokenField />
                  <input
                    name="label"
                    placeholder="Mehendi"
                    className="studio-input mt-0 flex-1"
                  />
                  <button className="rounded-full bg-platinum px-6 py-3.5 font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-noir">
                    Add section
                  </button>
                </form>
                {(event.sections ?? []).length > 0 ? (
                  <div className="mt-5 space-y-4">
                    {(event.sections ?? []).map((section) => (
                      <div
                        key={section.id}
                        className="rounded-2xl border border-platinum/15 bg-noir/40 p-4"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <p className="font-sans text-sm font-semibold text-platinum">
                            {section.label}
                          </p>
                          <span className="font-sans text-[11px] uppercase tracking-[0.14em] text-silver">
                            {section.clips.length}{" "}
                            {section.clips.length === 1 ? "video" : "videos"}
                          </span>
                        </div>
                        {section.clips.length > 0 ? (
                          <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4">
                            {section.clips.map((clip) => (
                              <StudioClipThumb
                                key={clip.id}
                                eventId={id}
                                clip={clip}
                              />
                            ))}
                          </div>
                        ) : (
                          <p className="mt-2 font-sans text-xs text-silver">
                            Empty — add a video into this section.
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="mt-4 font-sans text-xs text-silver">
                    No sections yet.
                  </p>
                )}
                {(event.gallery ?? []).length > 0 && (
                  <div className="mt-5 rounded-2xl border border-platinum/15 bg-noir/40 p-4">
                    <p className="font-sans text-sm font-semibold text-platinum">
                      More from this event
                    </p>
                    <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4">
                      {(event.gallery ?? []).map((clip) => (
                        <StudioClipThumb
                          key={clip.id}
                          eventId={id}
                          clip={clip}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </section>

              <section className="studio-panel">
                <h2 className="font-serif text-2xl text-platinum">
                  Add a video
                </h2>
                <p className="mt-1 font-sans text-sm text-silver">
                  Drop it in a section, or keep it under “more from this event”.
                </p>
                <AddClipForm
                  eventId={id}
                  sections={(event.sections ?? []).map((section) => ({
                    id: section.id,
                    label: section.label,
                  }))}
                />
              </section>
            </div>
          </div>

          {event.cover && <StudioEventPreview event={event} />}
        </>
      )}

      <section className="studio-panel">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-platinum/20 bg-platinum/10 text-platinum">
            <Users className="h-4 w-4" />
          </span>
          <div>
            <h2 className="font-serif text-2xl text-platinum">Workers</h2>
            <p className="font-sans text-sm text-silver">
              Assigned people can view this event in Studio.
            </p>
          </div>
        </div>
        <form
          action={assignWorker.bind(null, id)}
          className="mt-6 flex flex-col gap-3 sm:flex-row"
        >
          <StudioTokenField />
          <select name="userId" className="studio-input mt-0 flex-1">
            {workers.length === 0 && (
              <option value="">No worker accounts yet</option>
            )}
            {workers.map((worker) => (
              <option key={worker.id} value={worker.id}>
                {worker.name} · {worker.email}
              </option>
            ))}
          </select>
          <button
            className="rounded-full border border-platinum/30 px-6 py-3.5 font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-platinum hover:bg-platinum/10"
            disabled={workers.length === 0}
          >
            Assign
          </button>
        </form>
        {assignedPeople.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {assignedPeople.map((person) => (
              <span
                key={person.id}
                className="rounded-full bg-platinum/10 px-3 py-1.5 font-sans text-xs text-platinum"
              >
                {person.name}
              </span>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
