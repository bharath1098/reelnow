import { notFound } from "next/navigation";
import { WorkIndex } from "@/components/work/WorkIndex";
import { getEventsByCategory } from "@/db/queries";
import { isWorkCategoryId } from "@/lib/work";

export const dynamic = "force-dynamic";

export default async function WorkCategoryPage({
  params,
}: {
  params: Promise<{ categoryId: string }>;
}) {
  const { categoryId } = await params;
  if (!isWorkCategoryId(categoryId)) notFound();
  const events = await getEventsByCategory(categoryId);
  return <WorkIndex events={events} categoryId={categoryId} />;
}
