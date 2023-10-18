import { env } from "@/env.mjs";

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: env.NEXT_PUBLIC_APP_NAME,
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  mainNav: [
    {
      title: "Dashboard",
      href: "/dashboard",
    },
    {
      title: "Users",
      href: "/users",
    },
  ],
  links: {
    gitlab: "https://gitlab.boewa-software.de/",
  },
};
