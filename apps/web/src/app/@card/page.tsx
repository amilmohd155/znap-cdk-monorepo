import { auth } from "@/auth";
import { Hero } from "@/components/core/hero";

export default async function HomePage() {
  const session = await auth();

  return <Hero session={session} />;
}
