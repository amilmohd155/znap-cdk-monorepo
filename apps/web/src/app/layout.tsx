import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import siteConfig from "@/config/site";
import { cn } from "@/lib/utils";
import { Layout } from "@/components/layout/layout";
import React from "react";
import { auth } from "@/auth";

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
  alternates: {
    canonical: "/",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  card,
  children,
}: Readonly<{
  card: React.ReactNode;
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={cn(
          geistSans.variable,
          geistMono.variable,
          "antialiased font-sans",
          "text-[clamp(0.875rem,0.667rem+0.52vw,1rem)]",
          "bg-background text-foreground overflow-x-hidden"
        )}
      >
        <Layout session={session}>
          {children}
          {card}
        </Layout>
      </body>
    </html>
  );
}
