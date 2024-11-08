"use client";

import { NavigationItems, Segment } from "@/lib/utils";
import { useSelectedLayoutSegment } from "next/navigation";
import { NavigationElement } from "./nav-element";
import { Session } from "next-auth";

type TabNavigationProps = {
  session: Session | null;
};

export const TabNavigation = ({ session }: TabNavigationProps) => {
  const segment = useSelectedLayoutSegment();

  return (
    <nav>
      <ul className="flex justify-start">
        {NavigationItems.map((link) => {
          // if (link.segment === Segment.HISTORY && !session?.user) {
          //   return null;
          // }

          if (link.segment === Segment.AUTH && session?.user) {
            return null;
          }

          return (
            <NavigationElement
              key={link.href}
              isActivePath={segment === link.segment}
              href={link.href}
              label={link.label}
              icon={link.icon}
              disabled={!session?.user && link.segment === Segment.HISTORY}
            />
          );
        })}
      </ul>
    </nav>
  );
};
