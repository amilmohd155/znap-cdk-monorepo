"use client";

import Image from "next/image";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <article className="flex-1 flex flex-col justify-center gap-y-3 h-full">
      <Link
        href="https://storyset.com/online"
        aria-label="Online illustrations by Storyset"
        rel="noopener noreferrer"
        target="_blank"
        title="Online illustrations by Storyset"
      >
        <Image
          src="/oops.svg"
          alt="oops"
          width={720}
          height={720}
          className="w-full aspect-video object-contain"
        />
      </Link>
      <section className="text-center leading-snug text-sm">
        <h1 className="text-xl md:text-2xl my-1 font-semibold tracking-wide text-destructive">
          Oops! Something went wrong
        </h1>
        <h2>Brace yourself till we get the issue fixed</h2>
        <h2>You may also refresh the page or try again</h2>
      </section>
    </article>
  );
}
