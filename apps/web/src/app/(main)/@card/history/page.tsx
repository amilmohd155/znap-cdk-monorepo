import { getUserHistory } from "@/actions/items";
import { auth } from "@/auth";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { CopyClipboard } from "@/components/ui/copy-clipboard";
import siteConfig from "@/config/site";
import { isUrlExpired, removeHttps } from "@/lib/utils";
import { redirect, RedirectType } from "next/navigation";

export default async function HistoryPage() {
  const session = await auth();

  if (!session?.user || !session.user.id) {
    redirect("/", RedirectType.replace);
  }

  const history = await getUserHistory(session.user.id);

  if (!history) {
    return null;
  }

  return (
    <div className="space-y-3 md:px-3 py-5">
      {history.map((link) => {
        const shortLink = new URL(link.shortCode, siteConfig.url);

        return (
          <Card key={link.shortCode} className="bg-muted/10 break-all">
            <CardHeader className="py-2">
              <div className="flex *:py-2 flex-row justify-between items-center text-muted-foreground text-xs">
                <p>
                  {new Date(link.createdAt).toLocaleString("en-UK", {
                    dateStyle: "short",
                  })}
                </p>
                {isUrlExpired(link.expires) ? (
                  <p>Expired</p>
                ) : (
                  <CopyClipboard value={shortLink.href} className="py-0" />
                )}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-base md:text-xl font-semibold">
                {removeHttps(new URL(link.shortCode, siteConfig.url).href)}
              </p>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-muted-foreground">{link.longUrl}</p>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
