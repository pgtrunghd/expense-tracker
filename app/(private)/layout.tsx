import MainLayout from "@/components/layout/main-layout";
import { Navigation } from "@/components/layout/navigation";
import Sidebar from "@/components/layout/sidebar";

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
