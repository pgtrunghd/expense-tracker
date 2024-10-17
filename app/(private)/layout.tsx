// import MainLayout from "@/components/layout/main-layout";
import { Navigation } from "@/components/layout/navigation";
import Sidebar from "@/components/layout/sidebar";
import dynamic from "next/dynamic";

const MainLayout = dynamic(() => import("@/components/layout/main-layout"));

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Sidebar />
      <MainLayout>{children}</MainLayout>
      <Navigation />
    </>
  );
}
