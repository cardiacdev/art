"use client";

import Link from "next/link";

import { NavItem } from "@/types/nav";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

interface MobileNavProps {
  items: NavItem[];
  handleClose: () => void;
  children?: React.ReactNode;
}

export const MobileNav = ({ items, handleClose, children }: MobileNavProps) => {
  return (
    <div
      className={
        "fixed inset-0 top-16 z-50 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto p-6 pb-32 shadow-md animate-in slide-in-from-bottom-80 md:hidden"
      }>
      <div className="relative z-20 grid gap-6 rounded-md bg-popover p-4 text-popover-foreground shadow-md">
        <Link href="/" className="flex items-center space-x-2">
          <span className="font-bold">{siteConfig.name}</span>
        </Link>
        <nav className="grid grid-flow-row auto-rows-max text-sm">
          {items.map((item) => (
            <Link
              key={item.title}
              onClick={handleClose}
              href={item.disabled || !item.href ? "#" : item.href}
              className={cn(
                "flex w-full items-center rounded-md p-2 text-sm font-medium hover:underline",
                item.disabled && "cursor-not-allowed opacity-60",
              )}>
              {item.title}
            </Link>
          ))}
        </nav>
        {children}
      </div>
    </div>
  );
};
