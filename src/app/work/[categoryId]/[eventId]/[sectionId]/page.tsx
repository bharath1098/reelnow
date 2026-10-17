import { notFound, redirect } from "next/navigation";
import { WorkSectionView } from "@/components/work/WorkEventView";
import { getEvent } from "@/db/queries";
import { eventPath, getSection } from "@/lib/work";

export const dynamic = "force-dynamic";

export default async function WorkSectionPage({
  params,
}: {
  params: Promise<{
    categoryId: string;
    eventId: string;
    sectionId: string;
  }>;
}) {
  const { categoryId, eventId, sectionId } = await params;
  const event = await getEvent(categoryId, eventId);
  if (!event) notFound();
  const section = getSection(event, sectionId);
  if (!section) redirect(eventPath(event));
  return <WorkSectionView event={event} section={section} />;
}
