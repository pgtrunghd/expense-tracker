"use client";

import { LucideIcon } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export function NavMain({
  items,
}: {
  items: { title: string; url: string; icon: LucideIcon }[];
}) {
  const pathname = usePathname();

  const [activeItem, setActiveItem] = useState<{
    title: string;
    url: string;
    icon: LucideIcon;
  }>();

  useEffect(() => {
    setActiveItem(items.find((item) => item.url === pathname));
  }, [pathname]);

  return (
    // <SidebarGroup>
    // <SidebarGroupLabel>Menu</SidebarGroupLabel>
    <SidebarMenu>
      {items.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton
            asChild
            isActive={activeItem?.title === item.title}
            onClick={() => setActiveItem(item)}
          >
            <Link href={item.url}>
              <item.icon />
              <span>{item.title}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
    // </SidebarGroup>
  );
}
