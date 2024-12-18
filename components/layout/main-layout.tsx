// "use client";

import React from "react";
import Header from "./header";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { cn } from "@/lib/utils";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  // const { expand } = useSelector((state: RootState) => state.global);

  return (
    <main
      className={cn(
        "flex min-h-screen flex-col gap-6 pb-4 duration-200 md:pl-16 lg:pl-40 xl:pl-60",
        // expand ? "pl-48" : "pl-16",
      )}
    >
      <Header />
      <section className="flex-1 px-4 sm:px-6">{children}</section>
    </main>
  );
};

export default MainLayout;
