"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { CalendarDays, MapPin, Upload } from "lucide-react";
import { markShootCompleted } from "@/app/studio/actions";
import { useStudioAuth } from "@/components/studio/StudioAuthProvider";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function UpcomingShootPanel({
  eventId,
  title,
  categoryLabel,
  scheduledAt,
  subtitle,
  details,
}: {
  eventId: string;
  title: string;
  categoryLabel: string;
  scheduledAt?: string | null;
  subtitle?: string | null;
  details?: {
    clientName?: string;
    phone?: string;
    email?: string;
    packageName?: string;
    city?: string;
    state?: string;
    address?: string;
    preferredTime?: string;
    notes?: string;
  } | null;
}) {
  const router = useRouter();
  const { token } = useStudioAuth();
  const [askOpen, setAskOpen] = useState(false);
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();

  const confirmCompleted = () => {
    setError("");
    startTransition(async () => {
      try {
        const fd = new FormData();
        if (token) fd.set("_studioToken", token);
        await markShootCompleted(eventId, fd);
        setAskOpen(false);
        router.refresh();
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Could not update shoot status.",
        );
      }
    });
  };

  return (
    <div className="studio-panel max-w-2xl space-y-6">
      <div>
        <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-200/90">
          Upcoming shoot
        </p>
        <h2 className="mt-2 font-serif text-3xl text-platinum">{title}</h2>
        <p className="mt-2 font-sans text-sm text-silver">{categoryLabel}</p>
      </div>

      <div className="grid gap-3 rounded-2xl border border-platinum/10 bg-noir/40 p-4 font-sans text-sm text-silver sm:grid-cols-2">
        {scheduledAt && (
          <p className="flex items-start gap-2">
            <CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-platinum" />
            <span>
              <span className="text-platinum">Date</span>
              <br />
              {scheduledAt}
              {details?.preferredTime ? ` · ${details.preferredTime}` : ""}
            </span>
          </p>
        )}
        {(details?.city || details?.address) && (
          <p className="flex items-start gap-2">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-platinum" />
            <span>
              <span className="text-platinum">Location</span>
              <br />
              {[details.address, details.city, details.state]
                .filter(Boolean)
                .join(", ")}
            </span>
          </p>
        )}
        {subtitle && (
          <p className="sm:col-span-2">
            <span className="text-platinum">Notes</span>
            <br />
            {subtitle}
          </p>
        )}
        {details?.clientName && (
          <p>
            <span className="text-platinum">Client</span>
            <br />
            {details.clientName}
          </p>
        )}
        {details?.packageName && (
          <p>
            <span className="text-platinum">Package</span>
            <br />
            {details.packageName}
          </p>
        )}
        {details?.phone && (
          <p>
            <span className="text-platinum">Phone</span>
            <br />
            +91 {details.phone}
          </p>
        )}
        {details?.email && (
          <p>
            <span className="text-platinum">Email</span>
            <br />
            {details.email}
          </p>
        )}
        {details?.notes && (
          <p className="sm:col-span-2">
            <span className="text-platinum">Enquiry details</span>
            <br />
            {details.notes}
          </p>
        )}
      </div>

      <p className="font-sans text-sm text-silver">
        Video upload stays locked until the shoot is done. When you&apos;re
        ready to add reels, confirm below.
      </p>

      <button
        type="button"
        onClick={() => setAskOpen(true)}
        className="inline-flex items-center gap-2 rounded-full bg-platinum px-6 py-3.5 font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-noir"
      >
        <Upload className="h-3.5 w-3.5" />
        Upload video
      </button>

      <Dialog open={askOpen} onOpenChange={setAskOpen}>
        <DialogContent className="border-platinum/15 bg-charcoal text-platinum sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl">
              Is the shoot completed?
            </DialogTitle>
            <DialogDescription className="font-sans text-sm text-silver">
              Only continue if filming for “{title}” is finished. You&apos;ll
              then get the main reel and section upload tools.
            </DialogDescription>
          </DialogHeader>
          {error && (
            <p className="rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 font-sans text-sm text-red-300">
              {error}
            </p>
          )}
          <DialogFooter className="gap-2 sm:gap-2">
            <button
              type="button"
              onClick={() => setAskOpen(false)}
              className="rounded-full border border-platinum/30 px-5 py-2.5 font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-platinum"
            >
              Not yet
            </button>
            <button
              type="button"
              onClick={confirmCompleted}
              disabled={pending}
              className="rounded-full bg-platinum px-5 py-2.5 font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-noir disabled:opacity-60"
            >
              {pending ? "Opening…" : "Yes, shoot completed"}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
