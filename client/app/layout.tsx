import type { Metadata } from "next";

import { siteConfig } from "@/config/site";

import "@/styles/globals.css";

import { env } from "@/env.mjs";

import { fontSans } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { SiteHeader } from "@/components/header/site-header";
import { ProfilerLink } from "@/components/profiler-link";
import { Providers } from "@/components/providers";

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable)}>
        <Providers>
          <SiteHeader appName={siteConfig.name} />
          {children}
          {env.NODE_ENV !== "production" && <ProfilerLink />}
        </Providers>
      </body>
    </html>
  );
}
