import { env } from "@/env.mjs";

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: env.NEXT_PUBLIC_APP_NAME,
  description: "Managing orders and invoices made easy.",
  mainNav: [
    {
      title: "Projekte",
      href: "/projects",
    },
    {
      title: "Kunden",
      href: "/clients",
    },
    {
      title: "Benutzer",
      href: "/users",
    },
  ],
  links: {
    bug: env.NEXT_PUBLIC_BUG_REPORT_URL,
  },
};
