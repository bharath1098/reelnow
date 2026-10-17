export function ownerWhatsAppNumber() {
  return (
    process.env.WHATSAPP_OWNER_NUMBER?.replace(/\D/g, "") ||
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "") ||
    "919010994207"
  );
}

export function buildEnquiryWhatsAppMessage(data: {
  fullName: string;
  phone: string;
  email: string;
  packageName: string;
  details?: string;
  address?: string;
  city: string;
  state: string;
  country: string;
  preferredDate: string;
  preferredTime: string;
}) {
  return [
    "*New ReelNow Enquiry*",
    "",
    `*Name:* ${data.fullName}`,
    `*Phone:* +91 ${data.phone}`,
    `*Email:* ${data.email}`,
    `*Package:* ${data.packageName}`,
    `*Event Details:* ${data.details || "—"}`,
    `*Location:* ${[data.address, data.city, data.state, data.country]
      .filter(Boolean)
      .join(", ")}`,
    `*Date:* ${data.preferredDate}`,
    `*Preferred Time:* ${data.preferredTime}`,
  ].join("\n");
}

export function whatsAppEnquiryUrl(message: string) {
  return `https://wa.me/${ownerWhatsAppNumber()}?text=${encodeURIComponent(message)}`;
}
