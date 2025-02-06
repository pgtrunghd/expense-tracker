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

const Action = dynamic(() => import("./_components/action"));

function DashboardPage() {
  return (
    <section className="space-y-4">
      <Action />

      <CarouselSection />

      <CardList />

      <Card className="block md:hidden">
        <RecentExpense />
      </Card>

      <div className="hidden gap-4 md:grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        <Card className="order-2 md:order-1 lg:col-span-2 2xl:col-span-3">
          <CardHeader>
            <CardTitle>Top chi tiêu</CardTitle>
          </CardHeader>
          <CardContent>
            <TopExpenses />
          </CardContent>
        </Card>

        <Card className="order-1 md:order-2">
          <RecentExpense />
        </Card>

        <Card className="order-3 lg:col-span-2 2xl:col-span-2">
          <CardHeader>
            <CardTitle>Chi tiêu trong tháng</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartExpenseWeek />
          </CardContent>
        </Card>

        <Card className="order-4 col-span-2">
          <CardHeader>
            <CardTitle>Báo cáo tổng quan</CardTitle>
          </CardHeader>
          <CardContent>
            <ReportOverview />
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

export default DashboardPage;
