"use client";

import { useActionState, useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Star, Trash2 } from "lucide-react";
import {
  deleteClip,
  setMainReel,
  updateClip,
} from "@/app/studio/actions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { WorkClip } from "@/lib/work";
import { useStudioAuth } from "@/components/studio/StudioAuthProvider";

function withToken(token: string | null, extra?: FormData) {
  const fd = extra ?? new FormData();
  if (token) fd.set("_studioToken", token);
  return fd;
}

export function StudioClipThumb({
  eventId,
  clip,
  allowSetMain = true,
}: {
  eventId: string;
  clip: WorkClip;
  allowSetMain?: boolean;
}) {
  const router = useRouter();
  const { token } = useStudioAuth();
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [actionError, setActionError] = useState("");
  const [pending, startTransition] = useTransition();

  const boundUpdate = updateClip.bind(null, eventId, clip.id);
  const [editState, editAction, editPending] = useActionState(
    boundUpdate,
    null,
  );

  useEffect(() => {
    if (editState?.ok) {
      setEditOpen(false);
      router.refresh();
    }
  }, [editState, router]);

  const youtubeValue =
    clip.source === "youtube" ? `https://youtube.com/shorts/${clip.youtubeId}` : "";

  const onSetMain = () => {
    setActionError("");
    startTransition(async () => {
      try {
        await setMainReel(eventId, clip.id, withToken(token));
        router.refresh();
      } catch (error) {
        setActionError(
          error instanceof Error ? error.message : "Could not set main reel.",
        );
      }
    });
  };

  const onDelete = () => {
    setActionError("");
    startTransition(async () => {
      try {
        await deleteClip(eventId, clip.id, withToken(token));
        setDeleteOpen(false);
        router.refresh();
      } catch (error) {
        setActionError(
          error instanceof Error ? error.message : "Could not delete video.",
        );
      }
    });
  };

  return (
    <>
      <div className="group overflow-hidden rounded-xl border border-platinum/10">
        <div className="relative aspect-[9/16]">
          <img
            src={clip.image}
            alt=""
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-1.5 bg-gradient-to-t from-noir/95 via-noir/70 to-transparent px-1.5 pb-2 pt-8 opacity-100 transition-opacity sm:opacity-0 sm:group-hover:opacity-100">
            {allowSetMain && (
              <button
                type="button"
                title="Set as main reel"
                onClick={onSetMain}
                disabled={pending}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-noir/70 text-platinum backdrop-blur-sm hover:bg-platinum hover:text-noir disabled:opacity-50"
              >
                <Star className="h-3.5 w-3.5" />
              </button>
            )}
            <button
              type="button"
              title="Edit video"
              onClick={() => {
                setActionError("");
                setEditOpen(true);
              }}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-noir/70 text-platinum backdrop-blur-sm hover:bg-platinum hover:text-noir"
            >
              <Pencil className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              title="Delete video"
              onClick={() => {
                setActionError("");
                setDeleteOpen(true);
              }}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-red-400/40 bg-noir/70 text-red-400 backdrop-blur-sm hover:bg-red-500 hover:text-white"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
        <p className="truncate px-2 py-1.5 font-sans text-[10px] text-silver">
          {clip.title}
        </p>
      </div>

      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="border-platinum/15 bg-charcoal text-platinum sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl">Edit video</DialogTitle>
            <DialogDescription className="font-sans text-sm text-silver">
              Update the title or replace the source.
            </DialogDescription>
          </DialogHeader>
          <form action={editAction} className="space-y-4">
            <input type="hidden" name="_studioToken" value={token ?? ""} />
            <label className="studio-label">
              Title
              <input
                name="title"
                defaultValue={clip.title}
                className="studio-input"
                required
              />
            </label>
            <label className="studio-label">
              YouTube / Shorts URL
              <input
                name="youtube"
                defaultValue={youtubeValue}
                placeholder="Leave blank to keep current"
                className="studio-input"
              />
            </label>
            <label className="studio-label">
              Or file URL
              <input
                name="fileUrl"
                defaultValue={clip.source === "file" ? clip.video : ""}
                placeholder="Leave blank to keep current"
                className="studio-input"
              />
            </label>
            <label className="studio-label">
              Or upload a new file
              <input
                name="file"
                type="file"
                accept="video/*,image/*"
                className="mt-2 w-full font-sans text-sm text-platinum file:mr-3 file:rounded-full file:border-0 file:bg-platinum file:px-4 file:py-2 file:text-[11px] file:font-semibold file:uppercase file:tracking-[0.14em] file:text-noir"
              />
            </label>
            {(editState?.error || actionError) && (
              <p className="rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 font-sans text-sm text-red-300">
                {editState?.error || actionError}
              </p>
            )}
            <DialogFooter className="gap-2 sm:gap-2">
              <button
                type="button"
                onClick={() => setEditOpen(false)}
                className="rounded-full border border-platinum/30 px-5 py-2.5 font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-platinum"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={editPending}
                className="rounded-full bg-platinum px-5 py-2.5 font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-noir disabled:opacity-60"
              >
                {editPending ? "Saving…" : "Save"}
              </button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent className="border-platinum/15 bg-charcoal text-platinum sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl">
              Delete video?
            </DialogTitle>
            <DialogDescription className="font-sans text-sm text-silver">
              “{clip.title}” will be removed from this event. This cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          {actionError && (
            <p className="rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 font-sans text-sm text-red-300">
              {actionError}
            </p>
          )}
          <DialogFooter className="gap-2 sm:gap-2">
            <button
              type="button"
              onClick={() => setDeleteOpen(false)}
              className="rounded-full border border-platinum/30 px-5 py-2.5 font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-platinum"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onDelete}
              disabled={pending}
              className="rounded-full bg-red-500/90 px-5 py-2.5 font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-white hover:bg-red-500 disabled:opacity-60"
            >
              {pending ? "Deleting…" : "Delete"}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
