import Link from "next/link";

import { Toaster } from "sonner";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { MainNav } from "@/components/header/main-nav";
import { ThemeToggle } from "@/components/theme-toggle";

import { Icons } from "../icons";
import { AuthButton } from "./auth-button";

export function SiteHeader({ appName }: { appName: string }) {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <Toaster richColors={true} closeButton={true} />
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} appName={appName} />
        <div className="flex flex-1 items-center justify-end space-x-4 ">
          <nav className="flex items-center space-x-1">
            <Link
              href={siteConfig.links.bug}
              title="Einen Bug melden"
              target="_blank"
              rel="noreferrer"
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon", className: "flex items-center" }),
              )}>
              <Icons.bug className="absolute h-8 w-8" />
            </Link>
            <ThemeToggle />
            <AuthButton />
          </nav>
        </div>
      </div>
    </header>
  );
}
