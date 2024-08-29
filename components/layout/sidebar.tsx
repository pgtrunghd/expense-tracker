"use client";

import { setExpand } from "@/features/global.slice";
import { cn } from "@/lib/utils";
import { RootState } from "@/store";
import { ChevronRight, LayoutDashboard, Tags } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

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

const Sidebar = () => {
  const pathname = usePathname();
  const { expand } = useSelector((state: RootState) => state.global);
  const dispatch = useDispatch();

  return (
    <aside
      className={cn(
        "fixed border min-h-screen py-16 px-3 bg-background space-y-1 shadow-md z-10 duration-200",
        expand ? "w-48" : "w-16"
      )}
    >
      <div className="flex flex-col items-center gap-1">
        {navList.map((item) => (
          <Tooltip key={item.name}>
            <TooltipTrigger asChild>
              <Link
                href={item.path}
                key={item.name}
                className={cn(
                  "rounded-md duration-200 hover:bg-secondary w-full h-10 relative",
                  pathname === item.path ? "bg-secondary" : ""
                )}
              >
                <item.icon
                  className={cn(
                    "size-5 absolute inset-1/2 -translate-y-1/2",
                    expand ? "left-2" : "left-2"
                  )}
                />
                <p
                  className={cn(
                    "absolute top-1/2 -translate-y-1/2 left-10 text-sm duration-200",
                    expand ? "block" : "hidden"
                  )}
                >
                  {item.name}
                </p>
              </Link>
            </TooltipTrigger>

            {expand ? (
              ""
            ) : (
              <TooltipContent side="right">{item.name}</TooltipContent>
            )}
          </Tooltip>
        ))}
      </div>

      <Button
        size="icon"
        variant="outline"
        className="size-7 absolute top-3 right-0 translate-x-1/2"
        onClick={() => dispatch(setExpand(!expand))}
      >
        <ChevronRight
          className={cn("size-4 duration-500", expand ? "rotate-180" : "")}
        />
      </Button>
    </aside>
  );
};

export default Sidebar;
