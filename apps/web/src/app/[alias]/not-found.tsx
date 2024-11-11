import Link from "next/link";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Illustration } from "@/components/ui/illustration";

export default function AliasNotFound() {
  return (
    <main className="mx-auto max-h-screen h-screen max-w-7xl grid grid-rows-[auto,1fr,auto] gap-3">
      <Header />
      <div className="px-7 flex md:flex-row flex-col-reverse gap-y-5 items-center justify-center">
        <div className="flex flex-col gap-y-5">
          <h1 className="text-2xl font-semibold">Lost in the shortness ?</h1>
          <p className="text-muted-foreground text-sm">
            This link&apos;s history may have vanished, but you can always start
            fresh with a new one!
          </p>
          <Button variant="outline" asChild>
            <Link href="/" title="Go home">
              Go home
            </Link>
          </Button>
        </div>
        <Illustration
          src="/not-found.svg"
          alt="Not found"
          className="md:w-1/2"
          illustrationClassName="aspect-square"
        />
      </div>
      <Footer />
    </main>
  );
}
