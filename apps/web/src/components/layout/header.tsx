import { auth, signOut } from "@/auth";
import siteConfig from "@/config/site";

import { AiFillGithub } from "react-icons/ai";
import { IoMdLogOut } from "react-icons/io";
import { BaseLink, ExternalLink } from "@/components/core/links";
import LogoSVGComponent from "@/components/ui/logo";
import { Typewriter } from "@/components/ui/typewriter";

export async function Header() {
  const session = await auth();

  return (
    <header className="flex items-center px-4 py-3 gap-x-5 border-b md:border md:border-t-0 md:rounded-b-lg">
      <div className="flex flex-row items-center gap-x-2">
        <BaseLink href="/" title={siteConfig.name}>
          <LogoSVGComponent className="h-12 aspect-auto" />
          <span className="sr-only">{siteConfig.name}</span>
        </BaseLink>
        <div className="w-px self-stretch bg-gradient-to-tr from-transparent via-neutral-500 to-transparent opacity-25 dark:via-neutral-400 hidden md:block" />
        <Typewriter className="md:block hidden" />
      </div>
      <div className="flex-grow" />
      {session?.user && (
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
          className="flex items-center"
        >
          <button
            className="text-destructive hover:text-destructive/90 hover:scale-90 transition-all duration-150"
            title="Logout"
          >
            <IoMdLogOut className="h-6 w-6" />
            <span className="sr-only">Logout</span>
          </button>
        </form>
      )}
      <ExternalLink
        href={siteConfig.links.github}
        className="group border border-transparent hover:border-foreground rounded-full transition-all duration-150"
      >
        <AiFillGithub className="h-6 w-6 group-hover:text-teal-300 group-hover:scale-90 transition-colors duration-150" />
      </ExternalLink>
    </header>
  );
}
