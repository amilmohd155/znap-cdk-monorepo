import { createShortUrl } from "@/actions/items";
import { auth } from "@/auth";
import ShortUrlResult from "@/components/form/result";
import { isValidUrl } from "@/lib/utils";
import { redirect, RedirectType } from "next/navigation";

export default async function ResultPage({
  params: { url },
}: {
  params: { url: string };
}) {
  const session = await auth();

  const decodedUrl = decodeURIComponent(url);

  if (!isValidUrl(decodedUrl)) {
    redirect("/?error=invalid", RedirectType.replace);

    // TODO implement toast that notify user about invalid url
  }

  const shortUrl = await createShortUrl(
    decodedUrl,
    undefined,
    session?.user?.id
  );

  return (
    <ShortUrlResult oldUrl={decodeURIComponent(url)} newUrl={shortUrl.href} />
  );
}
