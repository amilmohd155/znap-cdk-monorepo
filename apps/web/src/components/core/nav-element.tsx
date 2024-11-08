import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { MdOutlineLock } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { BaseLink } from "@/components/core/links";

export const NavigationElement = ({
  isActivePath = false,
  href,
  label,
  icon: Icon,
  disabled = false,
  className,
}: {
  isActivePath?: boolean;
  href: string;
  label?: string;
  icon: React.ElementType;
  disabled?: boolean;
  className?: string;
}) => {
  return (
    <li className={cn("flex-1", className)}>
      <Button
        disabled={disabled}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : 0}
        variant="ghost"
        className={cn(
          "hover:bg-muted hover:rounded-t-sm",
          isActivePath ? "text-foreground" : "text-muted-foreground",
          disabled
            ? "text-destructive cursor-not-allowed pointer-events-auto"
            : "cursor-pointer",
          "py-3 w-full text-center relative transition-all duration-500 ease-in-out"
        )}
      >
        <BaseLink
          href={href}
          className="flex flex-1 items-center text-center justify-center gap-2"
        >
          <Icon
            className={cn(
              label?.includes("Result") && isActivePath && "text-green-600"
            )}
          />
          {label && label}
          {disabled && <MdOutlineLock />}
          {isActivePath && (
            <motion.span
              layoutId="underline"
              className="absolute bottom-0 left-0 right-0 bg-foreground h-px"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
        </BaseLink>
      </Button>
    </li>
  );
};
