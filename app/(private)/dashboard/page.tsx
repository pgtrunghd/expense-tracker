import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import dynamic from "next/dynamic";

const ChartExpenseWeek = dynamic(
  () => import("./_components/chart-expense-week"),
);

const TopExpenses = dynamic(() => import("./_components/top-expenses"));

const ReportOverview = dynamic(() => import("./_components/report-overview"));

const CardList = dynamic(() => import("./_components/card-list"));

const RecentExpense = dynamic(() => import("./_components/recent-expense"));

const CarouselSection = dynamic(() => import("./_components/carousel-section"));

const AddTransaction = dynamic(() => import("@/components/add-transaction"));

function DashboardPage() {
  return (
    <section className="flex flex-col gap-2">
      <CarouselSection />

      <CardList />

      <Card className="block md:hidden">
        <RecentExpense />
      </Card>

      <div className="hidden gap-2 md:grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-7">
        <Card className="order-2 md:order-1 lg:col-span-2 2xl:col-span-4">
          <CardHeader>
            <CardTitle>Top chi tiêu</CardTitle>
          </CardHeader>
          <CardContent>
            <TopExpenses />
          </CardContent>
        </Card>

        <Card className="order-1 md:order-2 2xl:col-span-3">
          <RecentExpense />
        </Card>

        <Card className="order-3 lg:col-span-2 2xl:col-span-5">
          <CardHeader>
            <CardTitle>Chi tiêu trong tháng</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartExpenseWeek />
          </CardContent>
        </Card>

        <Card className="order-4 col-span-2 2xl:col-span-2">
          <CardHeader>
            <CardTitle>Báo cáo tổng quan</CardTitle>
          </CardHeader>
          <CardContent>
            <ReportOverview />
          </CardContent>
        </Card>
      </div>

      <AddTransaction />
    </section>
  );
}

export default DashboardPage;
