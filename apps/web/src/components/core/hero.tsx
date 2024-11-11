import { cn } from "@/lib/utils";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Illustration } from "../ui/illustration";
import { auth } from "@/auth";

export async function Hero({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const session = await auth();

  return (
    <div
      className={cn(
        "flex-1 grid grid-rows-[1fr,auto] gap-y-3 py-5 items-center h-full",
        className
      )}
      {...props}
    >
      <Illustration src="/hero.svg" alt="Hero illustration" />

      <div className="items-center flex flex-col gap-y-3">
        <h4 className="text-xs md:text-lg">
          Track and manage your shortened URLs with ease.
        </h4>
        <Button
          asChild
          variant="default"
          size="lg"
          className="w-2/5 py-2 min-w-fit"
        >
          <Link href={session?.user ? "/history" : "/login"}>
            {session?.user ? "History" : "Unlock more features"}
          </Link>
        </Button>

        <div className="flex-grow" />
        <h2 className="px-5 text-xs text-center text-muted-foreground">
          Since this is a demo site, shortened URLs are temporary and will only
          be valid for 1 hour
        </h2>
      </div>
    </div>
  );
}
