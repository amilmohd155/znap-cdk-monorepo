import { getUrlFromShortCode } from "@/actions/items";
import { isUrlExpired } from "@/lib/utils";
import { notFound, permanentRedirect } from "next/navigation";

type AliasPageProps = {
  params: {
    alias: string;
  };
};

// Todo implement this page
export default async function AliasPage({ params: { alias } }: AliasPageProps) {
  const result = await getUrlFromShortCode(alias);

  // Not found if not founf or link expired
  if (!result || isUrlExpired(result.expires)) {
    notFound();
  }

  return permanentRedirect(result.longUrl);
}
