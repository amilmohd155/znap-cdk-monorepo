import { auth } from "@/auth";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { CopyClipboard } from "@/components/ui/copy-clipboard";
import { removeHttps } from "@/lib/utils";
import { redirect, RedirectType } from "next/navigation";

export default async function HistoryPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/", RedirectType.replace);
  }

  const links: {
    id: string;
    alias: string;
    target: string;
    createdAt: Date;
  }[] = [
    {
      id: "1",
      alias: "https://znapurl.com/4d4c-8c45",
      target: "https://www.linkedin.com/jobs/view/3790008722",
      createdAt: new Date(),
    },
    {
      id: "2",
      alias: "https://znapurl.com/06e0b5120ae5",
      target:
        "https://gawje3lq37gd65xypwvmjfrdda.srv.us/blog/2024-01-09-broken-flowers/broken-flowers",
      createdAt: new Date(),
    },
    {
      id: "3",
      alias: "https://znapurl.com/d9a06dd0",
      target: "https://github.com/amilmohd155/nextjs-blog",
      createdAt: new Date("2022-12-01T00:00:00.000Z"),
    },
    {
      id: "4",
      alias: "https://znapurl.com/d9a06dd0",
      target: "https://github.com/amilmohd155/nextjs-blog",
      createdAt: new Date("2022-12-01T00:00:00.000Z"),
    },
    {
      id: "5",
      alias: "https://znapurl.com/d9a06dd0",
      target: "https://github.com/amilmohd155/nextjs-blog",
      createdAt: new Date("2022-12-01T00:00:00.000Z"),
    },
    {
      id: "6",
      alias: "https://znapurl.com/d9a06dd0",
      target: "https://github.com/amilmohd155/nextjs-blog",
      createdAt: new Date("2022-12-01T00:00:00.000Z"),
    },
  ];

  return (
    <div className="space-y-3 md:px-3 py-5">
      {links.map((link) => {
        return (
          <Card key={link.id} className="bg-muted/10 break-all">
            <CardHeader className="py-2">
              <div className="flex *:py-2 flex-row justify-between items-center text-muted-foreground text-xs">
                <p>
                  {link.createdAt.toLocaleString("en-UK", {
                    dateStyle: "short",
                  })}
                </p>
                {/* !TODO change this to use the db data and copy to clipboard button */}
                {new Date() >= link.createdAt ? (
                  <p>Expired</p>
                ) : (
                  <CopyClipboard value={link.alias} className="py-0" />
                )}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-base md:text-xl font-semibold">
                {removeHttps(link.alias)}
              </p>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-muted-foreground">{link.target}</p>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
