import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import { cn } from "@/lib/utils";

export const Illustration = ({
  src,
  alt,
  className,
  illustrationClassName,
}: {
  src: string | StaticImageData;
  className?: string;
  illustrationClassName?: string;
  alt?: string;
}) => {
  return (
    <Link
      href="https://storyset.com/online"
      aria-label="Online illustrations by Storyset"
      rel="noopener noreferrer"
      target="_blank"
      title="Online illustrations by Storyset"
      className={className}
    >
      <Image
        src={src}
        alt={`${alt} - Online illustrations by Storyset`}
        width={720}
        height={720}
        className={cn(
          "w-full aspect-video object-contain",
          illustrationClassName
        )}
      />
    </Link>
  );
};
