import Link from "next/link";
import { desc, eq } from "drizzle-orm";
import { Check, ExternalLink, X } from "lucide-react";
import { db } from "@/db";
import { ensureSchema } from "@/db/ensure-schema";
import { inquiries, users } from "@/db/schema";
import { approveInquiry, rejectInquiry } from "@/app/studio/actions";
import { StudioTokenField } from "@/components/studio/StudioAuthProvider";
import { WORK_CATEGORIES } from "@/lib/work";
import {
  buildEnquiryWhatsAppMessage,
  whatsAppEnquiryUrl,
} from "@/lib/whatsapp";

export const dynamic = "force-dynamic";

export default async function InquiriesPage() {
  await ensureSchema();
  const rows = await db
    .select()
    .from(inquiries)
    .orderBy(desc(inquiries.createdAt));
  const workers = await db.select().from(users).where(eq(users.role, "worker"));
  const pending = rows.filter((row) => row.status === "pending");
  const others = rows.filter((row) => row.status !== "pending");

  return (
    <div className="space-y-8">
      <div>
        <p className="eyebrow">Studio</p>
        <h1 className="mt-3 font-serif text-4xl font-medium md:text-5xl">
          Enquiries
        </h1>
        <p className="mt-2 max-w-xl font-sans text-sm text-silver">
          Booking requests from the public site. Approve to create a shoot
          event, set the date, and assign a worker.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-silver">
          Pending ({pending.length})
        </h2>
        {pending.length === 0 ? (
          <p className="studio-panel font-sans text-sm text-silver">
            No pending enquiries.
          </p>
        ) : (
          pending.map((inquiry) => {
            const wa = whatsAppEnquiryUrl(
              buildEnquiryWhatsAppMessage({
                fullName: inquiry.fullName,
                phone: inquiry.phone,
                email: inquiry.email,
                packageName: inquiry.packageName,
                details: inquiry.details ?? undefined,
                address: inquiry.address ?? undefined,
                city: inquiry.city,
                state: inquiry.state,
                country: inquiry.country,
                preferredDate: inquiry.preferredDate,
                preferredTime: inquiry.preferredTime,
              }),
            );
            return (
              <article key={inquiry.id} className="studio-panel space-y-5">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="font-serif text-2xl text-platinum">
                      {inquiry.fullName}
                    </h3>
                    <p className="mt-1 font-sans text-sm text-silver">
                      {inquiry.packageName} · {inquiry.city}, {inquiry.state}
                    </p>
                    <p className="mt-2 font-sans text-xs text-silver">
                      {inquiry.preferredDate} · {inquiry.preferredTime}
                    </p>
                  </div>
                  <a
                    href={wa}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-platinum/30 px-4 py-2 font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-platinum hover:bg-platinum/10"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    WhatsApp
                  </a>
                </div>

                <div className="grid gap-2 font-sans text-sm text-silver sm:grid-cols-2">
                  <p>
                    <span className="text-platinum">Phone:</span> +91{" "}
                    {inquiry.phone}
                  </p>
                  <p>
                    <span className="text-platinum">Email:</span>{" "}
                    {inquiry.email}
                  </p>
                  {inquiry.address && (
                    <p className="sm:col-span-2">
                      <span className="text-platinum">Address:</span>{" "}
                      {inquiry.address}
                    </p>
                  )}
                  {inquiry.details && (
                    <p className="sm:col-span-2">
                      <span className="text-platinum">Details:</span>{" "}
                      {inquiry.details}
                    </p>
                  )}
                </div>

                <form
                  action={approveInquiry.bind(null, inquiry.id)}
                  className="grid gap-3 rounded-2xl border border-platinum/10 bg-noir/40 p-4 sm:grid-cols-2 lg:grid-cols-4"
                >
                  <StudioTokenField />
                  <label className="studio-label mt-0">
                    Event title
                    <input
                      name="title"
                      defaultValue={`${inquiry.fullName} · ${inquiry.packageName}`}
                      className="studio-input"
                    />
                  </label>
                  <label className="studio-label mt-0">
                    Shoot date
                    <input
                      name="shootDate"
                      type="date"
                      defaultValue={inquiry.preferredDate}
                      className="studio-input"
                      required
                    />
                  </label>
                  <label className="studio-label mt-0">
                    Category
                    <select
                      name="categoryId"
                      defaultValue="weddings"
                      className="studio-input"
                    >
                      {WORK_CATEGORIES.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.label}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="studio-label mt-0">
                    Assign worker
                    <select name="workerId" className="studio-input">
                      <option value="">Assign later</option>
                      {workers.map((worker) => (
                        <option key={worker.id} value={worker.id}>
                          {worker.name}
                        </option>
                      ))}
                    </select>
                  </label>
                  <div className="flex flex-wrap gap-2 sm:col-span-2 lg:col-span-4">
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 rounded-full bg-platinum px-5 py-3 font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-noir"
                    >
                      <Check className="h-3.5 w-3.5" />
                      Approve & create event
                    </button>
                    <button
                      formAction={rejectInquiry.bind(null, inquiry.id)}
                      type="submit"
                      className="inline-flex items-center gap-2 rounded-full border border-red-400/30 px-5 py-3 font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-red-300 hover:bg-red-500/10"
                    >
                      <X className="h-3.5 w-3.5" />
                      Reject
                    </button>
                  </div>
                </form>
              </article>
            );
          })
        )}
      </section>

      {others.length > 0 && (
        <section className="space-y-3">
          <h2 className="font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-silver">
            Reviewed
          </h2>
          {others.map((inquiry) => (
            <div
              key={inquiry.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-platinum/10 bg-charcoal/40 px-4 py-3"
            >
              <div>
                <p className="font-sans text-sm text-platinum">
                  {inquiry.fullName} · {inquiry.packageName}
                </p>
                <p className="font-sans text-xs uppercase tracking-[0.14em] text-silver">
                  {inquiry.status}
                  {inquiry.eventId ? ` · event ready` : ""}
                </p>
              </div>
              {inquiry.eventId && (
                <Link
                  href={`/studio/events/${inquiry.eventId}`}
                  className="font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-platinum hover:underline"
                >
                  Open event
                </Link>
              )}
            </div>
          ))}
        </section>
      )}
    </div>
  );
}
