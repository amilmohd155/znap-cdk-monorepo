import ShortUrlResult from "@/components/form/result";
import { createShortUrl } from "@/lib/dynamodb";
import { isValidUrl } from "@/lib/utils";
import { redirect, RedirectType } from "next/navigation";

export default async function ResultPage({
  params: { url },
}: {
  params: { url: string };
}) {
  const decodedUrl = decodeURIComponent(url);

  if (!isValidUrl(decodedUrl)) {
    return redirect("/", RedirectType.replace);

    // TODO implement toast that notify user about invalid url
  }

  const shortUrl = await createShortUrl(decodedUrl);

  return <ShortUrlResult oldUrl={decodeURIComponent(url)} newUrl={shortUrl} />;
}
