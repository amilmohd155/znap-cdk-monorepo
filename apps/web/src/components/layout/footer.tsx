import siteConfig from "@/config/site";

import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { IoMdGlobe } from "react-icons/io";
import { ExternalLink } from "@/components/core/links";

export const Footer = () => {
  return (
    <footer className="py-5 border-t md:border md:border-b-0 md:rounded-t-lg px-4">
      {/* Desktop */}
      <div className="hidden md:flex items-center flex-row gap-6">
        <div className="flex flex-row items-center space-x-2">
          <p className="md:text-sm text-xs space-x-1 uppercase">
            {siteConfig.name} © {new Date().getFullYear()}
          </p>
          <span className="w-px self-stretch bg-gradient-to-tr from-transparent via-neutral-500 to-transparent opacity-25 dark:via-neutral-400" />
          <p className="!text-sm space-x-1">{siteConfig.author}</p>
        </div>
        <div className="flex-grow" />
        <ExternalLink
          href={siteConfig.links.website}
          title="Portfolio Website"
          aria-label="Go to Portfolio"
          className="group border border-transparent hover:border-foreground rounded-full transition-all duration-150"
        >
          <IoMdGlobe className="h-5 w-5 group-hover:text-teal-300 group-hover:scale-90 transition-colors duration-150" />
        </ExternalLink>
        <ExternalLink
          href={siteConfig.links.github}
          title="Github"
          aria-label="Go to Github"
          className="group border border-transparent hover:border-foreground rounded-full transition-all duration-150"
        >
          <FaGithub className="h-5 w-5 group-hover:text-teal-300 group-hover:scale-90 transition-colors duration-150" />
        </ExternalLink>
        <ExternalLink
          href={siteConfig.links.linkedin}
          title="LinkedIn"
          aria-label="Go to LinkedIn"
          className="group border border-transparent hover:border-foreground rounded-full transition-all duration-150"
        >
          <FaLinkedinIn className="h-5 w-5 group-hover:text-teal-300 group-hover:scale-90 transition-colors duration-150" />
        </ExternalLink>
      </div>

      {/* Mobile */}
      <div className="md:hidden space-y-5">
        <div className="flex flex-row items-center justify-center gap-x-4 flex-1">
          <ExternalLink
            href={siteConfig.links.website}
            title="Portfolio Website"
            aria-label="Go to Portfolio"
          >
            <IoMdGlobe className="w-6 h-6" />
          </ExternalLink>
          <ExternalLink
            href={siteConfig.links.github}
            title="Github"
            aria-label="Go to Github"
          >
            <FaGithub className="w-6 h-6" />
          </ExternalLink>
          <ExternalLink
            href={siteConfig.links.linkedin}
            title="LinkedIn"
            aria-label="Go to LinkedIn"
          >
            <FaLinkedinIn className="w-6 h-6" />
          </ExternalLink>
        </div>
        <hr className="h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:via-neutral-400" />
        <div className="text-center">
          <p className="uppercase tracking-wider">
            {siteConfig.name} © {new Date().getFullYear()}
          </p>
          <p>{siteConfig.author}</p>
        </div>
      </div>
    </footer>
  );
};
