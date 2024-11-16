const siteName = "Znap URL" as const;

const siteConfig = {
  name: siteName,
  headerTitle: siteName,
  url: process.env.NEXT_PUBLIC_URL,
  year: 2024,
  repository: "https://github.com/amilmohd155/znap-cdk-monorepo",
  icon: `${process.env.NEXT_PUBLIC_URL || ""}/static/images/logo.png`,
  // socialBanner: `${process.env.BASE_PATH || ""}/static/images/twitter-card.png`,
  description: `${siteName} is a URL shortener which makes it easy to shorten and share your URLs.`,
  tagline: "Shorten your URLs",
  language: "en-UK",
  locale: "en-UK",
  author: "Amil Muhammed Hamza",
  links: {
    twitter: "",
    github: "https://github.com/amilmohd155",
    website: "https://amilmohd155.vercel.app",
    linkedin: "https://www.linkedin.com/in/amil-muhammed",
  },
} as const;

export type SiteConfig = typeof siteConfig;
export default siteConfig;
