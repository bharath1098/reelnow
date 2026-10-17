"use server";

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { and, eq, isNull, ne } from "drizzle-orm";
import { db } from "@/db";
import {
  clips,
  eventAssignments,
  events,
  inquiries,
  notifications,
  sections,
  users,
} from "@/db/schema";
import type { Role } from "@/db/schema";
import { ensureSchema } from "@/db/ensure-schema";
import {
  requireStudioAdmin,
  requireStudioPublisher,
  requireStudioUser,
} from "@/lib/studio-auth";
import { notifyUser } from "@/lib/notifications";
import { isWorkCategoryId } from "@/lib/work";
import { extractYoutubeId, youtubePoster } from "@/lib/youtube";

function slugify(value: string) {
  return (
    value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
      .slice(0, 48) || "event"
  );
}

async function requirePublisher(formData?: FormData) {
  return requireStudioPublisher(formData);
}

export async function createEvent(formData: FormData) {
  const user = await requirePublisher(formData);
  const title = String(formData.get("title") ?? "").trim();
  const categoryId = String(formData.get("categoryId") ?? "");
  const youtube = String(formData.get("youtube") ?? "");
  const fileUrl = String(formData.get("fileUrl") ?? "").trim();
  if (!title || !isWorkCategoryId(categoryId)) {
    throw new Error("Title and category are required");
  }

  const id = `${slugify(title)}-${crypto.randomUUID().slice(0, 8)}`;
  const now = new Date();
  const youtubeId =
    extractYoutubeId(youtube) ?? extractYoutubeId(fileUrl);

  await db.insert(events).values({
    id,
    categoryId,
    title,
    subtitle: "Captured & Edited in Minutes",
    shootCompleted: 1,
    createdBy: user.id,
    createdAt: now,
    updatedAt: now,
  });

  if (youtubeId) {
    await db.insert(clips).values({
      id: `${id}-cover`,
      eventId: id,
      kind: "cover",
      title,
      subtitle: "Captured & Edited in Minutes",
      image: youtubePoster(youtubeId),
      source: "youtube",
      youtubeId,
      sortOrder: 0,
    });
  } else if (fileUrl) {
    await db.insert(clips).values({
      id: `${id}-cover`,
      eventId: id,
      kind: "cover",
      title,
      subtitle: "Captured & Edited in Minutes",
      image: String(formData.get("poster") || fileUrl),
      source: "file",
      videoUrl: fileUrl,
      sortOrder: 0,
    });
  } else {
    throw new Error("Add a YouTube link or a video file URL");
  }

  revalidatePath("/work");
  revalidatePath("/studio");
  redirect(`/studio/events/${id}`);
}

/** Add or replace the main reel (used after approving an enquiry). */
export async function setEventCover(eventId: string, formData: FormData) {
  await requirePublisher(formData);
  const title = String(formData.get("title") ?? "Main reel").trim() || "Main reel";
  const uploaded = await saveFormVideo(formData);
  const pasted = String(formData.get("fileUrl") ?? "").trim();
  const fileUrl = uploaded || pasted;
  const youtubeId =
    extractYoutubeId(String(formData.get("youtube") ?? "")) ??
    extractYoutubeId(fileUrl);

  if (!youtubeId && !fileUrl) {
    throw new Error("Add a YouTube link or a video file");
  }

  const [existing] = await db
    .select()
    .from(clips)
    .where(and(eq(clips.eventId, eventId), eq(clips.kind, "cover")));

  const values = youtubeId
    ? {
        title,
        subtitle: "Main reel",
        image: youtubePoster(youtubeId),
        source: "youtube" as const,
        youtubeId,
        videoUrl: null as string | null,
        audioUrl: null as string | null,
      }
    : {
        title,
        subtitle: "Main reel",
        image: String(formData.get("poster") || fileUrl),
        source: "file" as const,
        youtubeId: null as string | null,
        videoUrl: fileUrl,
        audioUrl: null as string | null,
      };

  if (existing) {
    await db.update(clips).set(values).where(eq(clips.id, existing.id));
  } else {
    await db.insert(clips).values({
      id: `${eventId}-cover`,
      eventId,
      kind: "cover",
      sortOrder: 0,
      ...values,
    });
  }

  revalidatePath(`/studio/events/${eventId}`);
  revalidatePath("/studio");
  revalidatePath("/work");
}

export async function addSection(eventId: string, formData: FormData) {
  await requirePublisher(formData);
  const label = String(formData.get("label") ?? "").trim();
  if (!label) throw new Error("Section name is required");
  const id = `${eventId}-${slugify(label)}-${crypto.randomUUID().slice(0, 6)}`;
  await db.insert(sections).values({
    id,
    eventId,
    label,
    sortOrder: Date.now(),
  });
  revalidatePath(`/studio/events/${eventId}`);
  revalidatePath("/work");
}

async function saveFormVideo(formData: FormData): Promise<string | null> {
  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) return null;
  const bytes = Buffer.from(await file.arrayBuffer());
  const ext = path.extname(file.name) || ".mp4";
  const name = `${crypto.randomUUID()}${ext}`;
  const dir = path.join(process.cwd(), "public", "uploads");
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, name), bytes);
  return `/uploads/${name}`;
}

export async function addClip(
  eventId: string,
  _prev: { error?: string } | null,
  formData: FormData
): Promise<{ error?: string }> {
  try {
    await requirePublisher(formData);
    const target = String(formData.get("target") ?? "gallery");
    const isSection = target.startsWith("section:");
    const sectionId = isSection ? target.slice("section:".length) : null;
    const title = String(formData.get("title") ?? "Clip").trim() || "Clip";
    const uploaded = await saveFormVideo(formData);
    const pasted = String(formData.get("fileUrl") ?? "").trim();
    const fileUrl = uploaded || pasted;
    const youtubeId =
      extractYoutubeId(String(formData.get("youtube") ?? "")) ??
      extractYoutubeId(fileUrl);

    if (!youtubeId && !fileUrl) {
      return {
        error: "Paste a YouTube / Shorts link, or a video file / file URL.",
      };
    }
    if (isSection && !sectionId) {
      return { error: "Choose which section this clip belongs to." };
    }

    await db.insert(clips).values({
      id: crypto.randomUUID(),
      eventId,
      sectionId: isSection ? sectionId : null,
      kind: isSection ? "section" : "gallery",
      title,
      image: youtubeId
        ? youtubePoster(youtubeId)
        : String(formData.get("poster") || fileUrl),
      source: youtubeId ? "youtube" : "file",
      youtubeId,
      videoUrl: youtubeId ? null : fileUrl,
      sortOrder: Date.now(),
    });
    revalidatePath(`/studio/events/${eventId}`);
    revalidatePath("/work");
    return {};
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Could not add video.",
    };
  }
}

function teamError(error: unknown, fallback: string) {
  const text = error instanceof Error ? error.message : fallback;
  if (/unique/i.test(text)) return "That email is already used by someone on the team.";
  if (text === "Admin only" || text === "Not allowed") {
    return "Only an admin can change the team.";
  }
  return text || fallback;
}

function readTeamRole(formData: FormData): Role {
  const role = String(formData.get("role") ?? "worker");
  if (role !== "admin" && role !== "manager" && role !== "worker") {
    throw new Error("Choose a valid role");
  }
  return role;
}

function readTeamFields(formData: FormData, passwordRequired: boolean) {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();
  const password = String(formData.get("password") ?? "");
  const role = readTeamRole(formData);
  if (!name || !email || (passwordRequired && !password)) {
    throw new Error("Name, email, and password are required");
  }
  if (password && password.length < 6) {
    throw new Error("Password must be at least 6 characters");
  }
  return { name, email, password, role };
}

async function otherAdmins(userId: string) {
  const rows = await db
    .select({ id: users.id })
    .from(users)
    .where(and(eq(users.role, "admin"), ne(users.id, userId)));
  return rows.length;
}

export async function createTeamUser(formData: FormData) {
  try {
    await requireStudioAdmin(formData);
    const { name, email, password, role } = readTeamFields(formData, true);
    await db.insert(users).values({
      id: crypto.randomUUID(),
      name,
      email,
      passwordHash: await bcrypt.hash(password, 10),
      role,
      createdAt: new Date(),
    });
    revalidatePath("/studio/team");
    return {};
  } catch (error) {
    return { error: teamError(error, "Could not create that account.") };
  }
}

export async function updateTeamUser(userId: string, formData: FormData) {
  try {
    await requireStudioAdmin(formData);
    const { name, email, password, role } = readTeamFields(formData, false);
    const [existing] = await db.select().from(users).where(eq(users.id, userId));
    if (!existing) return { error: "That person is no longer on the team." };
    if (existing.role === "admin" && role !== "admin" && (await otherAdmins(userId)) === 0) {
      return { error: "Keep at least one admin on the team." };
    }
    await db
      .update(users)
      .set({
        name,
        email,
        role,
        ...(password ? { passwordHash: await bcrypt.hash(password, 10) } : {}),
      })
      .where(eq(users.id, userId));
    revalidatePath("/studio/team");
    return { user: { id: userId, name, email, role } };
  } catch (error) {
    return { error: teamError(error, "Could not update that account.") };
  }
}

export async function deleteTeamUser(userId: string, formData: FormData) {
  try {
    const actor = await requireStudioAdmin(formData);
    if (actor.id === userId) {
      return { error: "You can't delete the account you're signed in with." };
    }
    const [existing] = await db.select().from(users).where(eq(users.id, userId));
    if (!existing) return { error: "That person is no longer on the team." };
    if (existing.role === "admin" && (await otherAdmins(userId)) === 0) {
      return { error: "Keep at least one admin on the team." };
    }
    await db.update(events).set({ createdBy: null }).where(eq(events.createdBy, userId));
    await db
      .update(inquiries)
      .set({ reviewedBy: null })
      .where(eq(inquiries.reviewedBy, userId));
    await db.delete(eventAssignments).where(eq(eventAssignments.userId, userId));
    await db.delete(notifications).where(eq(notifications.userId, userId));
    await db.delete(users).where(eq(users.id, userId));
    revalidatePath("/studio/team");
    return {};
  } catch (error) {
    return { error: teamError(error, "Could not delete that account.") };
  }
}

export async function assignWorker(eventId: string, formData: FormData) {
  await requirePublisher(formData);
  const userId = String(formData.get("userId") ?? "");
  if (!userId) return;
  await db
    .insert(eventAssignments)
    .values({ eventId, userId })
    .onConflictDoNothing();

  const [event] = await db.select().from(events).where(eq(events.id, eventId));
  await notifyUser(userId, {
    type: "work_assigned",
    title: "New shoot assigned",
    body: event
      ? `You are on "${event.title}"${event.scheduledAt ? ` · ${event.scheduledAt}` : ""}`
      : "A new shoot was assigned to you.",
    href: `/studio/events/${eventId}`,
    eventId,
  });

  revalidatePath(`/studio/events/${eventId}`);
  revalidatePath("/studio");
}

export async function approveInquiry(inquiryId: string, formData: FormData) {
  const user = await requirePublisher(formData);
  await ensureSchema();

  const [inquiry] = await db
    .select()
    .from(inquiries)
    .where(eq(inquiries.id, inquiryId));
  if (!inquiry) throw new Error("Enquiry not found");
  if (inquiry.status !== "pending") throw new Error("Enquiry already reviewed");

  const categoryId = String(formData.get("categoryId") ?? "weddings");
  const shootDate =
    String(formData.get("shootDate") ?? "").trim() || inquiry.preferredDate;
  const workerId = String(formData.get("workerId") ?? "").trim();
  const title =
    String(formData.get("title") ?? "").trim() ||
    `${inquiry.fullName} · ${inquiry.packageName}`;

  if (!isWorkCategoryId(categoryId)) {
    throw new Error("Choose a valid category");
  }

  const id = `${slugify(title)}-${crypto.randomUUID().slice(0, 8)}`;
  const now = new Date();

  await db.insert(events).values({
    id,
    categoryId,
    title,
    subtitle: `${inquiry.city} · ${inquiry.preferredTime}`,
    scheduledAt: shootDate,
    shootCompleted: 0,
    createdBy: user.id,
    createdAt: now,
    updatedAt: now,
  });

  await db
    .update(inquiries)
    .set({
      status: "approved",
      eventId: id,
      reviewedBy: user.id,
    })
    .where(eq(inquiries.id, inquiryId));

  if (workerId) {
    await db
      .insert(eventAssignments)
      .values({ eventId: id, userId: workerId })
      .onConflictDoNothing();
    await notifyUser(workerId, {
      type: "work_assigned",
      title: "New shoot assigned",
      body: `You are on "${title}" · ${shootDate} · ${inquiry.preferredTime}`,
      href: `/studio/events/${id}`,
      eventId: id,
      inquiryId,
    });
  }

  revalidatePath("/studio/inquiries");
  revalidatePath("/studio");
  revalidatePath("/work");
  redirect(`/studio/events/${id}`);
}

export async function markShootCompleted(eventId: string, formData?: FormData) {
  await requirePublisher(formData);
  await ensureSchema();
  await db
    .update(events)
    .set({ shootCompleted: 1, updatedAt: new Date() })
    .where(eq(events.id, eventId));
  revalidatePath(`/studio/events/${eventId}`);
  revalidatePath("/studio");
}

export async function rejectInquiry(inquiryId: string, formData?: FormData) {
  const user = await requirePublisher(formData);
  await ensureSchema();
  await db
    .update(inquiries)
    .set({ status: "rejected", reviewedBy: user.id })
    .where(eq(inquiries.id, inquiryId));
  revalidatePath("/studio/inquiries");
  revalidatePath("/studio");
}

export async function markNotificationsRead(formData?: FormData) {
  const user = await requireStudioUser(formData);
  await ensureSchema();
  await db
    .update(notifications)
    .set({ readAt: new Date() })
    .where(
      and(eq(notifications.userId, user.id), isNull(notifications.readAt)),
    );
  revalidatePath("/studio");
}

export async function setMainReel(
  eventId: string,
  clipId: string,
  formData?: FormData,
) {
  await requirePublisher(formData);
  const [source] = await db.select().from(clips).where(eq(clips.id, clipId));
  if (!source || source.eventId !== eventId) {
    throw new Error("Video not found");
  }
  if (source.kind === "cover") {
    return { ok: true as const };
  }
  const [cover] = await db
    .select()
    .from(clips)
    .where(and(eq(clips.eventId, eventId), eq(clips.kind, "cover")));
  if (!cover) throw new Error("Main reel not found");

  await db
    .update(clips)
    .set({
      title: source.title,
      subtitle: source.subtitle,
      image: source.image,
      source: source.source,
      youtubeId: source.youtubeId,
      videoUrl: source.videoUrl,
      audioUrl: source.audioUrl,
    })
    .where(eq(clips.id, cover.id));

  revalidatePath(`/studio/events/${eventId}`);
  revalidatePath("/work");
  return { ok: true as const };
}

export async function updateClip(
  eventId: string,
  clipId: string,
  _prev: { error?: string } | null,
  formData: FormData
): Promise<{ error?: string; ok?: boolean }> {
  try {
    await requirePublisher(formData);
    const [clip] = await db.select().from(clips).where(eq(clips.id, clipId));
    if (!clip || clip.eventId !== eventId) {
      return { error: "Video not found" };
    }
    if (clip.kind === "cover") {
      return { error: "Edit the main reel by setting another video as main." };
    }

    const title = String(formData.get("title") ?? "").trim() || clip.title;
    const uploaded = await saveFormVideo(formData);
    const pasted = String(formData.get("fileUrl") ?? "").trim();
    const youtubeRaw = String(formData.get("youtube") ?? "").trim();
    const youtubeId =
      extractYoutubeId(youtubeRaw) ??
      extractYoutubeId(pasted) ??
      (uploaded ? null : clip.source === "youtube" ? clip.youtubeId : null);

    if (youtubeId) {
      await db
        .update(clips)
        .set({
          title,
          image: youtubePoster(youtubeId),
          source: "youtube",
          youtubeId,
          videoUrl: null,
          audioUrl: null,
        })
        .where(eq(clips.id, clipId));
    } else if (uploaded || pasted) {
      const fileUrl = uploaded || pasted;
      await db
        .update(clips)
        .set({
          title,
          image: String(formData.get("poster") || fileUrl),
          source: "file",
          youtubeId: null,
          videoUrl: fileUrl,
        })
        .where(eq(clips.id, clipId));
    } else {
      await db.update(clips).set({ title }).where(eq(clips.id, clipId));
    }

    revalidatePath(`/studio/events/${eventId}`);
    revalidatePath("/work");
    return { ok: true };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Could not update video.",
    };
  }
}

export async function deleteClip(
  eventId: string,
  clipId: string,
  formData?: FormData,
) {
  await requirePublisher(formData);
  const [clip] = await db.select().from(clips).where(eq(clips.id, clipId));
  if (!clip || clip.eventId !== eventId) {
    throw new Error("Video not found");
  }
  if (clip.kind === "cover") {
    throw new Error("Cannot delete the main reel. Set another video as main first.");
  }
  await db.delete(clips).where(eq(clips.id, clipId));
  revalidatePath(`/studio/events/${eventId}`);
  revalidatePath("/work");
  return { ok: true as const };
}

export async function deleteEvent(eventId: string, formData?: FormData) {
  const user = await requireStudioUser(formData);
  const [event] = await db.select().from(events).where(eq(events.id, eventId));
  if (!event) return { ok: true as const };
  const allowed =
    user.role === "admin" ||
    user.role === "manager";
  if (!allowed) throw new Error("Not allowed");
  await db.delete(clips).where(eq(clips.eventId, eventId));
  await db.delete(sections).where(eq(sections.eventId, eventId));
  await db.delete(eventAssignments).where(eq(eventAssignments.eventId, eventId));
  await db.delete(events).where(and(eq(events.id, eventId)));
  revalidatePath("/studio");
  revalidatePath("/work");
  return { ok: true as const };
}

export async function deleteEventAndRedirect(
  eventId: string,
  formData?: FormData,
) {
  await deleteEvent(eventId, formData);
  redirect("/studio");
}
