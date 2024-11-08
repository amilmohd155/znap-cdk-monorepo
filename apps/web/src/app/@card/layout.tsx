import { auth } from "@/auth";
import { TabNavigation } from "@/components/core/tab-nav";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <section className="grid grid-rows-[auto,1fr] md:overflow-hidden">
      <TabNavigation session={session} />
      {children}
    </section>
  );
}
