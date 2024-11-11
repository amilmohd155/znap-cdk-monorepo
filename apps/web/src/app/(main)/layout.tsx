import { Layout } from "@/components/layout/layout";

export default async function MainLayout({
  card,
  children,
}: Readonly<{
  card: React.ReactNode;
  children: React.ReactNode;
}>) {
  return (
    <Layout>
      {children}
      {card}
    </Layout>
  );
}
