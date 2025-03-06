"use client";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useGetCategoriesQuery } from "@/features/category.slice";
import * as LucideIcon from "lucide-react";
import {
  Command,
  FileStack,
  LayoutDashboard,
  List
} from "lucide-react";
import React, { useMemo } from "react";
import { NavCategories } from "../nav-categories";

export default function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const { data: categoryData, isLoading } = useGetCategoriesQuery();

  const data = useMemo(
    () => ({
      navMain: [
        {
          title: "Tổng quan",
          url: "/dashboard",
          icon: LayoutDashboard,
        },
        {
          title: "Giao dịch",
          url: "/transaction",
          icon: List,
        },
        {
          title: "Danh mục",
          url: "/category",
          icon: FileStack,
        },
      ],
      category: categoryData?.map((item) => {
        return {
          title: item.name,
          color: item.color,
          icon: LucideIcon[item.icon as keyof typeof LucideIcon] as React.FC<
            React.SVGProps<SVGSVGElement>
          >,
          data: item,
        };
      }),
    }),
    [categoryData],
  );

  return (
    <Sidebar collapsible="icon" variant="sidebar" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Expense Tracker</span>
                  <span className="truncate text-xs">Enterprise</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <NavMain items={data.navMain} />
      </SidebarHeader>
      <SidebarContent>
        <NavCategories items={data.category} isLoading={isLoading} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
