"use client";

import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkToken = () => {
      const value = localStorage.getItem("user");

      if (value) {
        router.replace("/dashboard");
      } else {
        setLoading(false);
      }
    };

    checkToken();
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-white grid place-items-center">
        <Loader2 className="animate-spin size-10" />
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthProvider;
