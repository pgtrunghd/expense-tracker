"use client";

import React, { useMemo } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Boxes,
  ClipboardList,
  Command,
  FileStack,
  LayoutDashboard,
} from "lucide-react";
import { NavMain } from "../nav-main";
import { useGetCategoriesQuery } from "@/features/category.slice";
import { NavCategories } from "../nav-categories";
import * as LucideIcon from "lucide-react";

export default function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const { data: categoryData, isLoading, isSuccess } = useGetCategoriesQuery();

  const data = useMemo(
    () => ({
      navMain: [
        {
          title: "Dashboard",
          url: "/dashboard",
          icon: LayoutDashboard,
        },
        {
          title: "Chi tiêu",
          url: "/expense",
          icon: ClipboardList,
        },
        {
          title: "Thu nhập",
          url: "/income",
          icon: Boxes,
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
        };
      }),
    }),
    [categoryData],
  );

  return (
    <Sidebar collapsible="icon" variant="floating" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Acme Inc</span>
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
    </Sidebar>
  );
}
