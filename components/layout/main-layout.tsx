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
        "min-h-screen py-4 flex flex-col gap-4 bg-muted/40 duration-200",
        expand ? "pl-48" : "pl-16"
      )}
    >
      <Header />
      <section className="px-6 flex-1">{children}</section>
    </main>
  );
};

export default MainLayout;
