import {
  index,
  integer,
  primaryKey,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core";

export const ROLES = ["admin", "manager", "worker"] as const;
export type Role = (typeof ROLES)[number];

export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  passwordHash: text("password_hash").notNull(),
  role: text("role", { enum: ROLES }).notNull().default("worker"),
  createdAt: integer("created_at", { mode: "timestamp_ms" })
    .notNull()
    .$defaultFn(() => new Date()),
});

export const events = sqliteTable(
  "events",
  {
    id: text("id").primaryKey(),
    categoryId: text("category_id").notNull(),
    title: text("title").notNull(),
    subtitle: text("subtitle"),
    scheduledAt: text("scheduled_at"),
    /** 0 = upcoming (details only); 1 = shoot done, media upload unlocked */
    shootCompleted: integer("shoot_completed").notNull().default(1),
    createdBy: text("created_by").references(() => users.id),
    createdAt: integer("created_at", { mode: "timestamp_ms" })
      .notNull()
      .$defaultFn(() => new Date()),
    updatedAt: integer("updated_at", { mode: "timestamp_ms" })
      .notNull()
      .$defaultFn(() => new Date()),
  },
  (table) => [index("events_category_idx").on(table.categoryId)]
);

export const INQUIRY_STATUSES = ["pending", "approved", "rejected"] as const;
export type InquiryStatus = (typeof INQUIRY_STATUSES)[number];

export const inquiries = sqliteTable(
  "inquiries",
  {
    id: text("id").primaryKey(),
    status: text("status", { enum: INQUIRY_STATUSES })
      .notNull()
      .default("pending"),
    fullName: text("full_name").notNull(),
    phone: text("phone").notNull(),
    email: text("email").notNull(),
    packageName: text("package_name").notNull(),
    details: text("details"),
    address: text("address"),
    city: text("city").notNull(),
    state: text("state").notNull(),
    country: text("country").notNull().default("India"),
    preferredDate: text("preferred_date").notNull(),
    preferredTime: text("preferred_time").notNull(),
    eventId: text("event_id").references(() => events.id),
    reviewedBy: text("reviewed_by").references(() => users.id),
    createdAt: integer("created_at", { mode: "timestamp_ms" })
      .notNull()
      .$defaultFn(() => new Date()),
  },
  (table) => [
    index("inquiries_status_idx").on(table.status),
    index("inquiries_created_idx").on(table.createdAt),
  ]
);

export const NOTIFICATION_TYPES = [
  "inquiry_new",
  "inquiry_approved",
  "work_assigned",
] as const;
export type NotificationType = (typeof NOTIFICATION_TYPES)[number];

export const notifications = sqliteTable(
  "notifications",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type", { enum: NOTIFICATION_TYPES }).notNull(),
    title: text("title").notNull(),
    body: text("body").notNull(),
    href: text("href"),
    inquiryId: text("inquiry_id").references(() => inquiries.id, {
      onDelete: "cascade",
    }),
    eventId: text("event_id").references(() => events.id, {
      onDelete: "cascade",
    }),
    readAt: integer("read_at", { mode: "timestamp_ms" }),
    createdAt: integer("created_at", { mode: "timestamp_ms" })
      .notNull()
      .$defaultFn(() => new Date()),
  },
  (table) => [
    index("notifications_user_idx").on(table.userId),
    index("notifications_created_idx").on(table.createdAt),
  ]
);

export const sections = sqliteTable(
  "sections",
  {
    id: text("id").primaryKey(),
    eventId: text("event_id")
      .notNull()
      .references(() => events.id, { onDelete: "cascade" }),
    label: text("label").notNull(),
    sortOrder: integer("sort_order").notNull().default(0),
  },
  (table) => [index("sections_event_idx").on(table.eventId)]
);

export const CLIP_KINDS = ["cover", "gallery", "section"] as const;
export const CLIP_SOURCES = ["youtube", "file"] as const;

export const clips = sqliteTable(
  "clips",
  {
    id: text("id").primaryKey(),
    eventId: text("event_id")
      .notNull()
      .references(() => events.id, { onDelete: "cascade" }),
    sectionId: text("section_id").references(() => sections.id, {
      onDelete: "cascade",
    }),
    kind: text("kind", { enum: CLIP_KINDS }).notNull(),
    title: text("title").notNull(),
    subtitle: text("subtitle"),
    image: text("image").notNull(),
    source: text("source", { enum: CLIP_SOURCES }).notNull(),
    youtubeId: text("youtube_id"),
    videoUrl: text("video_url"),
    audioUrl: text("audio_url"),
    sortOrder: integer("sort_order").notNull().default(0),
  },
  (table) => [
    index("clips_event_idx").on(table.eventId),
    index("clips_section_idx").on(table.sectionId),
  ]
);

export const eventAssignments = sqliteTable(
  "event_assignments",
  {
    eventId: text("event_id")
      .notNull()
      .references(() => events.id, { onDelete: "cascade" }),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
  },
  (table) => [
    primaryKey({ columns: [table.eventId, table.userId] }),
    index("assign_user_idx").on(table.userId),
  ]
);
