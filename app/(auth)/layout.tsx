import AuthProvider from "@/components/auth-provider";
import React, { Suspense } from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="container grid min-h-screen place-items-center py-10">
      <AuthProvider>{children}</AuthProvider>
    </main>
  );
}
