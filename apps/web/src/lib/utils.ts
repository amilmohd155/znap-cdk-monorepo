import { clsx, type ClassValue } from "clsx";
import { customAlphabet } from "nanoid";
import { AiOutlineLogin } from "react-icons/ai";
import { MdHistory } from "react-icons/md";
import { RiHomeLine } from "react-icons/ri";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const DEFAULT_ALIAS_LENGTH = 6 as const;
export const URL_LIFETIME_IN_MINUTES = 5 as const;

export function isUrlExpired(expires: number) {
  const now = Math.floor(Date.now() / 1000);

  return now >= expires;
}

export function removeHttps(url: string) {
  return url.replace(/^https?:\/\//, "");
}

export function isValidUrl(url: string) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export const nanoid = customAlphabet(
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
);

export enum Segment {
  AUTH = "(auth)",
  HISTORY = "history",
}

export const NavigationItems = [
  {
    label: "Home",
    href: "/",
    icon: RiHomeLine,
    segment: null,
  },
  {
    label: "Login",
    href: "/login",
    icon: AiOutlineLogin,
    segment: Segment.AUTH,
  },
  {
    label: "History",
    href: "/history",
    icon: MdHistory,
    segment: Segment.HISTORY,
  },
];
