import { MdArrowOutward } from "react-icons/md";
import { CopyClipboard } from "@/components/ui/copy-clipboard";
import { QRCode } from "@/components/ui/qr-code";
import { ShareLayout } from "@/components/ui/share";
import { ExternalLink } from "@/components/core/links";

type ShortUrlResultProps = {
  oldUrl: string;
  newUrl: string;
};

export default function ShortUrlResult({
  oldUrl,
  newUrl,
}: ShortUrlResultProps) {
  return (
    <section className="py-5 md:px-4 flex flex-col gap-y-5 break-words">
      {/* Success message */}
      <p className="border p-5 rounded-md border-green-900">
        Your new URL has been created successfully! 🎉
      </p>
      {/* <hr /> */}
      {/* Old URL */}
      <div className="border p-5 rounded-md">
        <h3 className="text-wrap">Old URL</h3>
        <ExternalLink href={oldUrl}>
          <span className="flex items-baseline gap-x-1 break-all">
            {oldUrl}
            <MdArrowOutward />
          </span>
        </ExternalLink>
        <p className="text-sm text-card-foreground/75">
          <span className="text-muted-foreground">{oldUrl.length} </span>
          characters
        </p>
      </div>
      {/* New URL */}
      <div className="border p-5 rounded-md flex flex-col gap-y-2 justify-between md:flex-row">
        <div className="">
          <h3>New URL</h3>
          <ExternalLink href={newUrl}>
            <span className="flex items-baseline gap-x-1 break-all">
              {newUrl}
              <MdArrowOutward />
            </span>
          </ExternalLink>
          <p className="text-sm text-card-foreground/75">
            <span className="text-muted-foreground">{newUrl.length} </span>
            characters
          </p>
        </div>
        {/* Copy to clipboard */}
        <CopyClipboard value={newUrl} />
      </div>
      {/* QR Code */}
      <QRCode value={newUrl} />

      <hr />
      <ShareLayout />
    </section>
  );
}
