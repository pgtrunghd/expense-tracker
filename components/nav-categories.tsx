"use client";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  useSidebar,
} from "@/components/ui/sidebar";
import { Edit, MoreHorizontal, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { useRouter } from "next/navigation";
import CreateCategory from "@/app/(private)/category/_components/create-category";
import { useState } from "react";

interface INavCategoryItemsProps {
  title: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  color: string;
  data: Category;
}

interface INavCategoriesProps {
  items: INavCategoryItemsProps[] | undefined;
  isLoading: boolean;
}

export function NavCategories({ items, isLoading }: INavCategoriesProps) {
  const router = useRouter();

  if (!isLoading && !items) return null;

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Danh mục</SidebarGroupLabel>
      <SidebarMenu>
        {isLoading
          ? Array.from({ length: 5 }).map((_, index) => (
              <SidebarMenuItem key={index}>
                <SidebarMenuSkeleton showIcon />
              </SidebarMenuItem>
            ))
          : items?.map((item) => <NavCategoryItem key={item.title} {...item} />)}
        <SidebarMenuItem>
          <SidebarMenuButton
            className="text-sidebar-foreground/70"
            onClick={() => router.push("/category")}
          >
            <MoreHorizontal className="text-sidebar-foreground/70" />
            <span>More</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}

const NavCategoryItem = ({
  title,
  icon,
  color,
  data,
}: INavCategoryItemsProps) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { isMobile } = useSidebar();
  const Icon = icon;

  const handleDialogOpenChange = (open: boolean) => {
    if (!open) {
      setDropdownOpen(false);
    }
  };

  return (
    <SidebarMenuItem key={title}>
      <SidebarMenuButton asChild>
        <span className="cursor-pointer">
          <span
            className="grid size-5 place-items-center rounded-md"
            style={{ backgroundColor: color }}
          >
            <Icon className="size-3 text-white" />
          </span>
          <span>{title}</span>
        </span>
      </SidebarMenuButton>
      <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
        <DropdownMenuTrigger asChild>
          <SidebarMenuAction showOnHover>
            <MoreHorizontal />
          </SidebarMenuAction>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className="w-fit rounded-lg"
          side={isMobile ? "bottom" : "right"}
          align={isMobile ? "end" : "start"}
        >
          <CreateCategory
            callback={handleDialogOpenChange}
            category={data}
            trigger={
              <DropdownMenuItem
                onSelect={(event) => {
                  event.preventDefault();
                }}
              >
                <Edit className="text-muted-foreground" />
                Sửa
              </DropdownMenuItem>
            }
          />
          <DropdownMenuItem>
            <Trash2 className="text-muted-foreground" />
            Xóa
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  );
};
