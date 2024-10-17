"use client";

import useLocalStorage from "@/hooks/useLocalStorage";
import { useRouter } from "next/navigation";
import React, { useEffect, useLayoutEffect } from "react";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [value] = useLocalStorage("user", "");
  const router = useRouter();

  useLayoutEffect(() => {
    if (value) {
      router.replace("/dashboard");
    }
  }, [value]);

  return <>{children}</>;
};

export default AuthProvider;
