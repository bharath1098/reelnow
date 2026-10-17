import { notFound } from "next/navigation";
import { WorkEventView } from "@/components/work/WorkEventView";
import { getEvent } from "@/db/queries";

export const dynamic = "force-dynamic";

export default async function WorkEventPage({
  params,
}: {
  params: Promise<{ categoryId: string; eventId: string }>;
}) {
  const { categoryId, eventId } = await params;
  const event = await getEvent(categoryId, eventId);
  if (!event?.cover) notFound();
  return <WorkEventView event={event} />;
}
