"use client";

import { LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { cn, formatter } from "@/lib/utils";
import { useGetBalanceQuery } from "@/features/balance.slice";
import { Skeleton } from "../ui/skeleton";

export default function Header() {
  const router = useRouter();
  const [scroll, setScroll] = useState(false);
  const { data: overviewData, isLoading } = useGetBalanceQuery();

  const signOut = () => {
    localStorage.removeItem("user");
    router.push("/login");
  };

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 12) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <header
      className={cn(
        "z-10 flex items-center justify-end gap-4 px-4 py-2 transition duration-200 sm:px-6",
        scroll ? "sticky inset-0 bg-background shadow-md" : "",
      )}
    >
      <div className="flex flex-col items-end text-xs md:text-sm">
        <p>Số dư</p>
        {isLoading ? (
          <Skeleton className="h-5 w-20" />
        ) : (
          <p className="font-semibold">
            {formatter.format(overviewData?.balance ?? 0)}
          </p>
        )}
      </div>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Avatar className="size-9 cursor-pointer duration-200 hover:opacity-75 sm:size-10">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={signOut}>
            <LogOut className="mr-2 size-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
