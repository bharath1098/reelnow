import { NextResponse } from "next/server";
import { db } from "@/db";
import { ensureSchema } from "@/db/ensure-schema";
import { inquiries } from "@/db/schema";
import { notifyRoles } from "@/lib/notifications";
import {
  buildEnquiryWhatsAppMessage,
  whatsAppEnquiryUrl,
} from "@/lib/whatsapp";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    await ensureSchema();
    const body = await req.json();
    const fullName = String(body.fullName ?? "").trim();
    const phone = String(body.phone ?? "").trim();
    const email = String(body.email ?? "").trim().toLowerCase();
    const packageName = String(body.packageName ?? "").trim();
    const details = String(body.details ?? "").trim();
    const address = String(body.address ?? "").trim();
    const city = String(body.city ?? "").trim();
    const state = String(body.state ?? "").trim();
    const country = String(body.country ?? "India").trim() || "India";
    const preferredDate = String(body.preferredDate ?? "").trim();
    const preferredTime = String(body.preferredTime ?? "").trim();

    if (
      !fullName ||
      !phone ||
      !email ||
      !packageName ||
      !city ||
      !state ||
      !preferredDate ||
      !preferredTime
    ) {
      return NextResponse.json(
        { error: "Please fill all required fields." },
        { status: 400 },
      );
    }

    const id = crypto.randomUUID();
    await db.insert(inquiries).values({
      id,
      status: "pending",
      fullName,
      phone,
      email,
      packageName,
      details: details || null,
      address: address || null,
      city,
      state,
      country,
      preferredDate,
      preferredTime,
      createdAt: new Date(),
    });

    const message = buildEnquiryWhatsAppMessage({
      fullName,
      phone,
      email,
      packageName,
      details,
      address,
      city,
      state,
      country,
      preferredDate,
      preferredTime,
    });

    await notifyRoles(["admin", "manager"], {
      type: "inquiry_new",
      title: "New booking enquiry",
      body: `${fullName} · ${packageName} · ${city} · ${preferredDate}`,
      href: `/studio/inquiries`,
      inquiryId: id,
    });

    return NextResponse.json({
      ok: true,
      id,
      whatsappUrl: whatsAppEnquiryUrl(message),
    });
  } catch (error) {
    console.error("inquiry create failed", error);
    return NextResponse.json(
      { error: "Could not save enquiry. Try again." },
      { status: 500 },
    );
  }
}
