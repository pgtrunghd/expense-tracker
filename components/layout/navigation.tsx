"use client";

import { LayoutDashboard, Tags } from "lucide-react";
import React from "react";

const navList = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Category",
    path: "/category",
    icon: Tags,
  },
  // {
  //   name: "Dashboard",
  //   path: "/dashboard",
  //   icon: <WalletCards />,
  // },
];

export const Navigation = () => {
  return (
    <section className="fixed inset-x-0 bottom-0 z-20 block h-14 bg-background/95 shadow-md backdrop-blur md:hidden">
      Navigation
    </section>
  );
};
