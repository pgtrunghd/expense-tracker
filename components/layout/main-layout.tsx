import { cn } from "@/lib/utils";
import React from "react";
import Header from "./header";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main
      className={cn(
        "flex min-h-screen flex-col",
        // 'md:pl-16 lg:pl-40 xl:pl-60'
        // expand ? "pl-48" : "pl-16",
      )}
    >
      <Header />
      <section className="flex-1 px-4 pb-4">{children}</section>
    </main>
  );
};

export default MainLayout;
