"use client";

import React from "react";
import Header from "./header";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { cn } from "@/lib/utils";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { expand } = useSelector((state: RootState) => state.global);

  return (
    <main
      className={cn(
        "flex min-h-screen flex-col gap-4 bg-muted/40 py-4 pl-16 duration-200 lg:pl-48",
        // expand ? "pl-48" : "pl-16",
      )}
    >
      <Header />
      <section className="flex-1 px-6">{children}</section>
    </main>
  );
};

export default MainLayout;
