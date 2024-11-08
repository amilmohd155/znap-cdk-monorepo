import { cn } from "@/lib/utils";
import { ExternalLinkIcon } from "lucide-react";
import Link from "next/link";

type BaseLinkProps = React.ComponentProps<typeof Link>;

type ExternalLinkProps = BaseLinkProps & {
  hasIcon?: boolean;
};

export const BaseLink = ({ className, ...props }: BaseLinkProps) => (
  <Link {...props} className={cn("", className)} />
);

export const ExternalLink = ({
  className,
  href,
  children,
  hasIcon = false,
  ...props
}: ExternalLinkProps) => (
  <BaseLink
    {...props}
    href={href}
    className={cn("", className)}
    target="_blank"
    rel="noopener noreferrer"
  >
    {children}
    {hasIcon && <ExternalLinkIcon className="ml-1 inline align-baseline" />}
  </BaseLink>
);
