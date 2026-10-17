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
    <div className="space-y-6 sm:space-y-8">
      <div>
        <p className="eyebrow">Studio</p>
        <h1 className="mt-2 font-serif text-3xl font-medium sm:mt-3 sm:text-4xl md:text-5xl">
          Enquiries
        </h1>
        <p className="mt-2 hidden max-w-xl font-sans text-sm text-silver sm:block">
          Booking requests from the public site. Approve to create a shoot
          event, set the date, and assign a worker.
        </p>
      </div>

      <section className="space-y-3 sm:space-y-4">
        <h2 className="font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-silver">
          Pending ({pending.length})
        </h2>
        {pending.length === 0 ? (
          <p className="rounded-2xl border border-platinum/10 bg-charcoal/40 px-4 py-6 text-center font-sans text-sm text-silver sm:py-8">
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
              <article
                key={inquiry.id}
                className="space-y-4 rounded-[1.25rem] border border-platinum/15 bg-charcoal/40 p-4 sm:space-y-5 sm:rounded-[1.75rem] sm:p-6 md:p-8"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="font-serif text-xl text-platinum sm:text-2xl">
                      {inquiry.fullName}
                    </h3>
                    <p className="mt-1 font-sans text-sm text-silver">
                      {inquiry.packageName}
                    </p>
                    <p className="mt-1 font-sans text-xs text-silver">
                      {inquiry.preferredDate} · {inquiry.preferredTime}
                      <span className="hidden sm:inline">
                        {" "}
                        · {inquiry.city}, {inquiry.state}
                      </span>
                    </p>
                  </div>
                  <a
                    href={wa}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-platinum/30 px-3 py-2 font-sans text-[10px] font-semibold uppercase tracking-[0.12em] text-platinum hover:bg-platinum/10 sm:gap-2 sm:px-4 sm:text-[11px]"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    WhatsApp
                  </a>
                </div>

                <div className="grid gap-2 rounded-xl border border-platinum/10 bg-noir/40 p-3 font-sans text-xs text-silver sm:grid-cols-2 sm:text-sm">
                  <p>
                    <span className="text-platinum">Phone</span>
                    <br />
                    +91 {inquiry.phone}
                  </p>
                  <p className="min-w-0 break-all">
                    <span className="text-platinum">Email</span>
                    <br />
                    {inquiry.email}
                  </p>
                  <p className="sm:hidden">
                    <span className="text-platinum">Location</span>
                    <br />
                    {[inquiry.city, inquiry.state].filter(Boolean).join(", ")}
                  </p>
                  {inquiry.address && (
                    <p className="sm:col-span-2">
                      <span className="text-platinum">Address</span>
                      <br />
                      {inquiry.address}
                    </p>
                  )}
                  {inquiry.details && (
                    <p className="sm:col-span-2">
                      <span className="text-platinum">Details</span>
                      <br />
                      {inquiry.details}
                    </p>
                  )}
                </div>

                <form
                  action={approveInquiry.bind(null, inquiry.id)}
                  className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
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
                  <div className="grid grid-cols-2 gap-2 sm:col-span-2 sm:flex sm:flex-wrap lg:col-span-4">
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-platinum px-4 py-3 font-sans text-[11px] font-semibold uppercase tracking-[0.12em] text-noir sm:px-5 sm:tracking-[0.14em]"
                    >
                      <Check className="h-3.5 w-3.5" />
                      Approve
                    </button>
                    <button
                      formAction={rejectInquiry.bind(null, inquiry.id)}
                      type="submit"
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-red-400/30 px-4 py-3 font-sans text-[11px] font-semibold uppercase tracking-[0.12em] text-red-300 hover:bg-red-500/10 sm:px-5 sm:tracking-[0.14em]"
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
            <article
              key={inquiry.id}
              className="rounded-2xl border border-platinum/10 bg-charcoal/40 p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate font-serif text-lg text-platinum">
                    {inquiry.fullName}
                  </p>
                  <p className="mt-0.5 truncate font-sans text-xs text-silver">
                    {inquiry.packageName}
                    {inquiry.preferredDate ? ` · ${inquiry.preferredDate}` : ""}
                  </p>
                </div>
                <span
                  className={`shrink-0 rounded-full px-2.5 py-1 font-sans text-[10px] font-semibold uppercase tracking-[0.12em] ${
                    inquiry.status === "approved"
                      ? "bg-emerald-400/15 text-emerald-200"
                      : "bg-white/10 text-silver"
                  }`}
                >
                  {inquiry.status}
                </span>
              </div>
              {inquiry.eventId && (
                <Link
                  href={`/studio/events/${inquiry.eventId}`}
                  className="mt-3 flex w-full items-center justify-center rounded-full border border-platinum/25 py-2.5 font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-platinum hover:bg-platinum/10"
                >
                  Open event
                </Link>
              )}
            </article>
          ))}
        </section>
      )}
    </div>
  );
}
