"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function Loading() {
  return (
    <div className="h-full justify-center flex flex-col gap-y-5 items-center">
      <DotLottieReact
        src="/loading.lottie"
        loop
        autoplay
        className="w-[35vh] aspect-video object-contain"
      />
    </div>
  );
}
