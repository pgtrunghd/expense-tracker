"use client";

import { setExpand } from "@/features/global.slice";
import { cn } from "@/lib/utils";
import { RootState } from "@/store";
import {
  ChevronRight,
  CreditCard,
  HandCoins,
  LayoutDashboard,
  Tags,
} from "lucide-react";
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
import { navList } from "@/lib/nav-list";

const Sidebar = () => {
  const pathname = usePathname();
  const { expand } = useSelector((state: RootState) => state.global);
  const dispatch = useDispatch();

  return (
    <aside
      className={cn(
        "fixed z-10 hidden min-h-screen w-16 space-y-1 border bg-background px-3 py-16 shadow-md duration-200 md:block lg:w-48",
        // expand ? "w-48" : "w-16",
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
                  "relative h-10 w-full rounded-md duration-200 hover:bg-secondary",
                  pathname === item.path ? "bg-secondary" : "",
                )}
              >
                <item.icon className="absolute inset-1/2 left-2 size-5 -translate-y-1/2" />
                <p
                  className={cn(
                    "absolute left-10 top-1/2 hidden -translate-y-1/2 text-sm duration-200 lg:block",
                    // expand ? "block" : "hidden",
                  )}
                >
                  {item.name}
                </p>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">{item.name}</TooltipContent>
            {/* {expand ? (
              ""
            ) : (
              <TooltipContent side="right">{item.name}</TooltipContent>
            )} */}
          </Tooltip>
        ))}
      </div>

      {/* <Button
        size="icon"
        variant="outline"
        className="absolute right-0 top-3 size-7 translate-x-1/2"
        onClick={() => dispatch(setExpand(!expand))}
      >
        <ChevronRight
          className={cn("size-4 duration-500", expand ? "rotate-180" : "")}
        />
      </Button> */}
    </aside>
  );
};

export default Sidebar;
