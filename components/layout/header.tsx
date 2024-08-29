"use client";

import React, { useTransition } from "react";
import { Button } from "../ui/button";
import { logout } from "@/app/(private)/actions";

export default function Header() {
  const [isPending, startTransition] = useTransition();

  const signOut = () => {
    startTransition(async () => {
      logout();
    });
  };

  return (
    <header className="px-6 text-end">
      <Button disabled={isPending} onClick={signOut}>
        Logout
      </Button>
    </header>
  );
}
