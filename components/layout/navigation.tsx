"use client";

import { navList } from "@/lib/nav-list";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Tags } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export const Navigation = () => {
  const pathname = usePathname();

  return (
    <section className="sticky inset-x-0 bottom-0 z-20 block bg-background/95 shadow-md backdrop-blur md:hidden">
      <ul className="flex h-full items-center justify-evenly">
        {navList.map((item) => (
          <Link
            href={item.path}
            key={item.path}
            className={cn(
              "flex-1 flex flex-col items-center justify-center pb-2 pt-3 duration-200",
              item.path === pathname ? "bg-secondary" : "",
            )}
          >
            <item.icon className="mb-1 size-5" />
            <p className="text-xs">{item.name}</p>
          </Link>
        ))}
      </ul>
    </section>
  );
};
