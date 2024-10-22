"use client";

import { navList, navListMobile } from "@/lib/nav-list";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Plus, Tags } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { Button } from "../ui/button";
import CreateExpense from "@/app/(private)/expense/_components/create-expense";

export const Navigation = () => {
  const pathname = usePathname();

  return (
    <section className="sticky inset-x-0 bottom-0 z-20 block border-t bg-background/60 shadow-md backdrop-blur md:hidden">
      <ul className="relative flex h-full items-center justify-evenly pt-2 pb-6">
        {navListMobile.map((item) =>
          item.type === "link" ? (
            <Link
              href={item.path}
              key={item.path}
              className={cn(
                "flex flex-1 flex-col items-center justify-center text-zinc-400 duration-200 active:scale-90",
                item.path === pathname ? "text-primary" : "",
              )}
            >
              <item.icon className="mb-1 size-5" />
              <p className="text-[10px] sm:text-xs">{item.name}</p>
            </Link>
          ) : (
            <CreateExpense
              key={item.path}
              trigger={
                <Button size="iconSm" className="rounded-lg">
                  <Plus className="size-5" />
                </Button>
              }
            />
          ),
        )}
      </ul>
    </section>
  );
};
