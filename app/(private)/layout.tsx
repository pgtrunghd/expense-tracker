// import MainLayout from "@/components/layout/main-layout";
import AppSidebar from "@/components/layout/app-sidebar";
import { Navigation } from "@/components/layout/navigation";
import Sidebar from "@/components/layout/sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import dynamic from "next/dynamic";

const MainLayout = dynamic(() => import("@/components/layout/main-layout"));

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      {/* <Sidebar /> */}
      <AppSidebar />
      <SidebarInset>
        <MainLayout>{children}</MainLayout>
      </SidebarInset>
      {/* <Navigation /> */}
    </SidebarProvider>
  );
}
