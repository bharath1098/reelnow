import HomePage from "@/components/home/HomePage";
import { getFeaturedWork } from "@/db/queries";

export const dynamic = "force-dynamic";

export default async function Page() {
  const featured = await getFeaturedWork();
  return <HomePage featured={featured} />;
}
