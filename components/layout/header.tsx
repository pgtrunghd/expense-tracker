"use client";

import React, { useTransition } from "react";
import { Button } from "../ui/button";
import { logout } from "@/app/(private)/actions";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { LogOut } from "lucide-react";

export default function Header() {
  const [isPending, startTransition] = useTransition();

  const signOut = () => {
    startTransition(async () => {
      logout();
    });
  };

  return (
    <header className="flex items-center justify-end px-6">
      {/* <Button disabled={isPending} onClick={signOut}>
        Logout
      </Button> */}
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Avatar className="cursor-pointer duration-200 hover:opacity-75">
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
