import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Session } from "next-auth";

export const Hero = ({
  className,
  session,
  ...props
}: React.ComponentProps<"div"> & { session: Session | null }) => {
  return (
    <div
      className={cn(
        "flex-1 grid grid-rows-[1fr,auto] gap-y-3 py-5 items-center h-full",
        className
      )}
      {...props}
    >
      {/* <h1 className="text-xl md:text-3xl font-bold">Shorten your URLs</h1> */}
      <Link
        href="https://storyset.com/online"
        aria-label="Online illustrations by Storyset"
        rel="noopener noreferrer"
        target="_blank"
        title="Online illustrations by Storyset"
      >
        <Image
          src="/hero.svg"
          alt="Hero illustration - Online illustrations by Storyset"
          width={720}
          height={720}
          className="w-full aspect-video object-contain"
        />
      </Link>
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
};
