import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import siteConfig from "@/config/site";
import { cn } from "@/lib/utils";
import React from "react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: siteConfig.headerTitle,
  description: siteConfig.description,
  creator: siteConfig.author,
  applicationName: siteConfig.name,
  metadataBase: new URL(siteConfig.url!),
  alternates: {
    canonical: "/",
  },
  twitter: {
    creator: "@amilmohd155",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  // maximumScale: 1,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  console.log("RootLayout: AUTH_SECRET", process.env.AUTH_SECRET);
  console.log("RootLayout: AWS_REGION", process.env.AWS_REGION);
  console.log("RootLayout: AWS_ACCESS_KEY_ID", process.env.AWS_ACCESS_KEY_ID);
  console.log(
    "RootLayout: AWS_SECRET_ACCESS_KEY",
    process.env.AWS_SECRET_ACCESS_KEY
  );
  console.log("RootLayout: AUTH_GITHUB_ID", process.env.AUTH_GITHUB_ID);
  console.log("RootLayout: AUTH_GITHUB_SECRET", process.env.AUTH_GITHUB_SECRET);

  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={cn(
          geistSans.variable,
          geistMono.variable,
          "antialiased font-sans",
          "text-[clamp(0.875rem,0.667rem+0.52vw,1rem)]",
          "bg-background text-foreground overflow-x-hidden",
          "selection:bg-[#a4e1ae] selection:text-black"
        )}
      >
        {children}
      </body>
    </html>
  );
}
