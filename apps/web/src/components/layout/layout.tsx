import siteConfig from "@/config/site";
import React from "react";
import { AiFillGithub } from "react-icons/ai";
import { BaseLink, ExternalLink } from "../core/links";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { Button } from "../ui/button";
import { IoMdGlobe } from "react-icons/io";
import { Session } from "next-auth";
import { signOut } from "@/auth";
import Image from "next/image";
import LogoSVGComponent from "../ui/logo";

export function Layout({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}) {
  const isLoggedIn = !!session?.user;

  return (
    <main className="mx-auto max-h-screen  h-screen max-w-7xl grid grid-rows-[auto,1fr,auto] gap-3">
      <header className="flex items-center px-4 py-3 gap-x-5 border-b md:border md:border-t-0 md:rounded-b-lg">
        <div className="flex flex-row items-center gap-x-2">
          <BaseLink href="/" title={siteConfig.name}>
            <LogoSVGComponent className="h-12 aspect-auto" />
            <p className="sr-only">{siteConfig.name}</p>
          </BaseLink>
          <div className="w-px self-stretch bg-gradient-to-tr from-transparent via-neutral-500 to-transparent opacity-25 dark:via-neutral-400" />
          Shorten your URLs
        </div>
        <div className="flex-grow" />
        {/* TODO: Check if logged in to display logout */}
        {isLoggedIn && (
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <Button size="sm" variant="outline" className="text-destructive">
              Logout
            </Button>
          </form>
        )}
        <ExternalLink
          href={siteConfig.links.github}
          className="group border border-transparent hover:border-foreground rounded-full transition-all duration-150"
        >
          <AiFillGithub className="h-6 w-6 group-hover:text-teal-300 group-hover:scale-90 transition-colors duration-150" />
        </ExternalLink>
      </header>
      <div className="grid md:grid-cols-[1fr,1fr] gap-y-5 md:gap-x-3 px-4 md:px-0 md:overflow-hidden">
        {children}
      </div>
      <footer className="flex items-center flex-row gap-6 py-5 border-t md:border md:border-b-0 md:rounded-t-lg px-4">
        <p className="!text-sm space-x-1">© 2024 - {siteConfig.name}</p>
        <div className="flex-grow" />
        <ExternalLink
          href={siteConfig.links.website}
          title="Portfolio Website"
          aria-label="Go to Portfolio"
          className="group border border-transparent hover:border-foreground rounded-full transition-all duration-150"
        >
          <IoMdGlobe className="md:w-6 md:h-6 h-5 w-5 group-hover:text-teal-300 group-hover:scale-90 transition-colors duration-150" />
        </ExternalLink>
        <ExternalLink
          href={siteConfig.links.github}
          title="Github"
          aria-label="Go to Github"
          className="group border border-transparent hover:border-foreground rounded-full transition-all duration-150"
        >
          <FaGithub className="md:w-6 md:h-6 h-5 w-5 group-hover:text-teal-300 group-hover:scale-90 transition-colors duration-150" />
        </ExternalLink>
        <ExternalLink
          href={siteConfig.links.linkedin}
          title="LinkedIn"
          aria-label="Go to LinkedIn"
          className="group border border-transparent hover:border-foreground rounded-full transition-all duration-150"
        >
          <FaLinkedinIn className="md:w-6 md:h-6 h-5 w-5 group-hover:text-teal-300 group-hover:scale-90 transition-colors duration-150" />
        </ExternalLink>
      </footer>
    </main>
  );
}
