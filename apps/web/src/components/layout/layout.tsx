import { Header } from "./header";
import { Footer } from "./footer";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="mx-auto max-h-screen h-screen max-w-7xl grid grid-rows-[auto,1fr,auto] gap-3">
      <Header />
      <div className="grid md:grid-cols-[1fr,1fr] gap-y-5 md:gap-x-3 px-4 md:px-0 md:overflow-hidden">
        {children}
      </div>
      <Footer />
    </main>
  );
}
