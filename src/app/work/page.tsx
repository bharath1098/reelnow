import { WorkIndex } from "@/components/work/WorkIndex";
import { getAllEvents } from "@/db/queries";

export const dynamic = "force-dynamic";

export default async function WorkPage() {
  const events = await getAllEvents();
  return <WorkIndex events={events} />;
}
