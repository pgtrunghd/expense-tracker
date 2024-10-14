"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import useLocalStorage from "./useLocalStorage";

type AuthError = {
  data: {
    message: string;
    statusCode: number;
  };
  status: number;
};

export const useAuthRedirect = () => {
  const router = useRouter();
  const [value, setValue] = useLocalStorage("access_token", "");

  const handleAuthError = (error: AuthError) => {
    if (error.status === 401) {
      console.log(value);
      const currentPath = window.location.pathname;
      sessionStorage.setItem("currentPath", currentPath);
      toast.error("Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại");
      router.push("/login");
    }
  };

  const redirectAfterLogin = () => {
    const redirectPath = sessionStorage.getItem("currentPath");
    if (redirectPath) {
      sessionStorage.removeItem("currentPath");
      router.push(redirectPath);
    } else {
      router.push("/dashboard");
    }
  };

  return { handleAuthError, redirectAfterLogin };
};
