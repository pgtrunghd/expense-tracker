"use client";

import React from "react";
import Header from "./header";
import { usePathname } from "next/navigation";
import { titlePage } from "@/lib/constants";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const title = pathname.split("/")[1] as keyof typeof titlePage;

  return (
    <main className="flex min-h-screen flex-col">
      <Header />

      <section className="flex-1 px-4 pb-4">
        <h1 className="mb-2 text-2xl tracking-tight font-bold leading-[44px]">{titlePage[title]}</h1>
        {children}
      </section>
    </main>
  );
};

export default MainLayout;
