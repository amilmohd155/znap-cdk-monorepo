import siteConfig from "@/config/site";

import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { IoMdGlobe } from "react-icons/io";
import { ExternalLink } from "@/components/core/links";

export const Footer = () => {
  return (
    <footer className="flex items-center flex-row gap-6 py-5 border-t md:border md:border-b-0 md:rounded-t-lg px-4">
      <div className="flex flex-row items-center space-x-2">
        <p className="!text-sm space-x-1 uppercase">
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
  );
};
