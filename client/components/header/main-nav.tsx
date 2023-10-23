"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useAuth } from "@/hooks/use-auth";
import { Cross1Icon, HamburgerMenuIcon, HomeIcon } from "@radix-ui/react-icons";

import { NavItem } from "@/types/nav";
import { cn } from "@/lib/utils";

import { MobileNav } from "./mobile-nav";

const Home = ({ appName }: { appName: string }) => {
  return (
    <>
      <HomeIcon className="h-6 w-6" />
      <span className="hidden text-xl font-bold sm:inline-block">{appName}</span>
    </>
  );
};

interface MainNavProps {
  appName: string;
  items?: NavItem[];
}

export const MainNav = ({ appName, items }: MainNavProps) => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const pathname = usePathname();
  const { isAuthenticated } = useAuth();

  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="hidden items-center space-x-2 md:flex">
        <Home appName={appName} />
      </Link>
      {isAuthenticated && (
        <nav className="hidden gap-6 md:flex">
          {items?.map(
            (item, index) =>
              item.href && (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    "flex items-center text-lg font-semibold text-muted-foreground sm:text-sm",
                    item.disabled && "cursor-not-allowed opacity-80",
                    pathname === item.href && "text-secondary-foreground",
                  )}>
                  {item.title}
                </Link>
              ),
          )}
        </nav>
      )}
      <button
        className="flex items-center space-x-2 md:hidden"
        onClick={() => setShowMobileMenu(!showMobileMenu)}>
        {showMobileMenu ? <Cross1Icon /> : <HamburgerMenuIcon />}
        <span className="font-bold">Menu</span>
      </button>
      {showMobileMenu && items && <MobileNav items={items} />}
    </div>
  );
};
