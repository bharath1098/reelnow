"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Trash2, X } from "lucide-react";
import {
  createTeamUser,
  deleteTeamUser,
  updateTeamUser,
} from "@/app/studio/actions";
import { useStudioAuth } from "@/components/studio/StudioAuthProvider";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Role = "admin" | "manager" | "worker";

type TeamUser = {
  id: string;
  name: string;
  email: string;
  role: Role;
};

const roleTone: Record<Role, string> = {
  admin: "bg-platinum text-noir",
  manager: "border border-platinum/30 text-platinum",
  worker: "bg-white/10 text-silver",
};

function withToken(fd: FormData, token: string | null) {
  if (token) fd.set("_studioToken", token);
  return fd;
}

export function TeamManager({ team }: { team: TeamUser[] }) {
  const router = useRouter();
  const { token, user: sessionUser } = useStudioAuth();
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();
  const [editing, setEditing] = useState<TeamUser | null>(null);
  const [deleting, setDeleting] = useState<TeamUser | null>(null);

  const onCreate = (formData: FormData) => {
    setError("");
    startTransition(async () => {
      const result = await createTeamUser(withToken(formData, token));
      if (result?.error) {
        setError(result.error);
        return;
      }
      (document.getElementById("team-create-form") as HTMLFormElement | null)?.reset();
      router.refresh();
    });
  };

  const onUpdate = (formData: FormData) => {
    if (!editing) return;
    setError("");
    startTransition(async () => {
      const result = await updateTeamUser(
        editing.id,
        withToken(formData, token),
      );
      if (result?.error) {
        setError(result.error);
        return;
      }
      setEditing(null);
      router.refresh();
    });
  };

  const onDelete = () => {
    if (!deleting) return;
    setError("");
    startTransition(async () => {
      const fd = withToken(new FormData(), token);
      const result = await deleteTeamUser(deleting.id, fd);
      if (result?.error) {
        setError(result.error);
        return;
      }
      setDeleting(null);
      router.refresh();
    });
  };

  return (
    <div className="grid w-full gap-8 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.3fr)]">
      <div>
        <p className="eyebrow">Access</p>
        <h1 className="mt-3 font-serif text-4xl font-medium md:text-5xl">
          Team
        </h1>
        <p className="mt-3 max-w-md font-sans text-sm leading-relaxed text-silver">
          Admin creates accounts. Managers publish events. Workers only see
          shoots assigned to them.
        </p>

        <form
          id="team-create-form"
          action={onCreate}
          className="studio-panel mt-8 space-y-4"
        >
          <h2 className="font-serif text-2xl">New person</h2>
          {error && !editing && !deleting && (
            <p className="rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 font-sans text-sm text-red-300">
              {error}
            </p>
          )}
          <label className="studio-label">
            Name
            <input
              name="name"
              required
              placeholder="Name"
              className="studio-input"
            />
          </label>
          <label className="studio-label">
            Email
            <input
              name="email"
              type="email"
              required
              placeholder="name@reelnow.in"
              className="studio-input"
            />
          </label>
          <label className="studio-label">
            Password
            <input
              name="password"
              type="password"
              required
              minLength={6}
              className="studio-input"
            />
          </label>
          <label className="studio-label">
            Role
            <select name="role" defaultValue="worker" className="studio-input">
              <option value="worker">Worker</option>
              <option value="manager">Manager</option>
              <option value="admin">Admin</option>
            </select>
          </label>
          <button
            type="submit"
            disabled={pending}
            className="w-full rounded-full bg-platinum py-4 font-sans text-[12px] font-semibold uppercase tracking-[0.16em] text-noir disabled:opacity-60"
          >
            {pending && !editing && !deleting ? "Creating…" : "Create user"}
          </button>
        </form>
      </div>

      <ul className="space-y-3">
        {team.map((member) => {
          const isSelf = sessionUser?.id === member.id;
          return (
            <li
              key={member.id}
              className="flex flex-wrap items-center gap-3 rounded-[1.5rem] border border-platinum/15 bg-charcoal/40 px-4 py-4 backdrop-blur-xl sm:gap-4 sm:px-5"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-platinum font-sans text-sm font-semibold text-noir">
                {member.name.slice(0, 1).toUpperCase()}
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-sans text-sm font-semibold text-platinum">
                  {member.name}
                  {isSelf && (
                    <span className="ml-2 font-sans text-[10px] font-medium uppercase tracking-[0.14em] text-silver">
                      You
                    </span>
                  )}
                </p>
                <p className="truncate font-sans text-xs text-silver">
                  {member.email}
                </p>
              </div>
              <span
                className={`rounded-full px-3 py-1 font-sans text-[10px] font-semibold uppercase tracking-[0.14em] ${
                  roleTone[member.role] ?? roleTone.worker
                }`}
              >
                {member.role}
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-label={`Edit ${member.name}`}
                  onClick={() => {
                    setError("");
                    setEditing(member);
                  }}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-platinum/25 text-silver transition-colors hover:border-platinum/50 hover:text-platinum"
                >
                  <Pencil className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  aria-label={`Delete ${member.name}`}
                  disabled={isSelf}
                  onClick={() => {
                    setError("");
                    setDeleting(member);
                  }}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-red-400/35 text-red-300 transition-colors hover:border-red-400 hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-35"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </li>
          );
        })}
      </ul>

      {/* Edit dialog */}
      <Dialog
        open={Boolean(editing)}
        onOpenChange={(open) => {
          if (!open && !pending) {
            setEditing(null);
            setError("");
          }
        }}
      >
        <DialogContent className="border-platinum/20 bg-charcoal text-platinum sm:max-w-md sm:rounded-2xl">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl">Edit person</DialogTitle>
            <DialogDescription className="font-sans text-sm text-silver">
              Update details for {editing?.name}. Leave password blank to keep
              the current one.
            </DialogDescription>
          </DialogHeader>
          {error && editing && (
            <p className="rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 font-sans text-sm text-red-300">
              {error}
            </p>
          )}
          {editing && (
            <form action={onUpdate} className="space-y-4">
              <label className="studio-label">
                Name
                <input
                  name="name"
                  required
                  defaultValue={editing.name}
                  className="studio-input"
                />
              </label>
              <label className="studio-label">
                Email
                <input
                  name="email"
                  type="email"
                  required
                  defaultValue={editing.email}
                  className="studio-input"
                />
              </label>
              <label className="studio-label">
                New password
                <input
                  name="password"
                  type="password"
                  minLength={6}
                  placeholder="Leave blank to keep"
                  className="studio-input"
                />
              </label>
              <label className="studio-label">
                Role
                <select
                  name="role"
                  defaultValue={editing.role}
                  className="studio-input"
                >
                  <option value="worker">Worker</option>
                  <option value="manager">Manager</option>
                  <option value="admin">Admin</option>
                </select>
              </label>
              <DialogFooter className="gap-2 sm:gap-2">
                <button
                  type="button"
                  disabled={pending}
                  onClick={() => {
                    setEditing(null);
                    setError("");
                  }}
                  className="inline-flex items-center gap-1.5 rounded-full border border-platinum/25 px-5 py-2.5 font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-silver hover:text-platinum"
                >
                  <X className="h-3.5 w-3.5" />
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={pending}
                  className="rounded-full bg-platinum px-5 py-2.5 font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-noir disabled:opacity-60"
                >
                  {pending ? "Saving…" : "Save changes"}
                </button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete dialog */}
      <Dialog
        open={Boolean(deleting)}
        onOpenChange={(open) => {
          if (!open && !pending) {
            setDeleting(null);
            setError("");
          }
        }}
      >
        <DialogContent className="border-platinum/20 bg-charcoal text-platinum sm:max-w-md sm:rounded-2xl">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl">
              Remove from team?
            </DialogTitle>
            <DialogDescription className="font-sans text-sm text-silver">
              This permanently deletes{" "}
              <span className="text-platinum">
                {deleting?.name} ({deleting?.email})
              </span>
              . Their event assignments will be cleared.
            </DialogDescription>
          </DialogHeader>
          {error && deleting && (
            <p className="rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 font-sans text-sm text-red-300">
              {error}
            </p>
          )}
          <DialogFooter className="gap-2 sm:gap-2">
            <button
              type="button"
              disabled={pending}
              onClick={() => {
                setDeleting(null);
                setError("");
              }}
              className="rounded-full border border-platinum/25 px-5 py-2.5 font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-silver hover:text-platinum"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={pending}
              onClick={onDelete}
              className="rounded-full bg-red-500/90 px-5 py-2.5 font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-white hover:bg-red-500 disabled:opacity-60"
            >
              {pending ? "Removing…" : "Delete"}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
