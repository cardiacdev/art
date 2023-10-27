import type { Metadata, Viewport } from "next";

import { siteConfig } from "@/config/site";

import "@/styles/globals.css";

import { env } from "@/env.mjs";

import { fontSans } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { DocsLink } from "@/components/docs-link";
import { SiteHeader } from "@/components/header/site-header";
import { ProfilerLink } from "@/components/profiler-link";
import { Providers } from "@/components/providers";

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable)}>
        <Providers>
          <SiteHeader appName={siteConfig.name} />
          {children}
          {env.NODE_ENV !== "production" && <ProfilerLink />}
          {env.NODE_ENV !== "production" && <DocsLink />}
        </Providers>
      </body>
    </html>
  );
}
