import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import dynamic from "next/dynamic";

const ChartExpenseWeek = dynamic(
  () => import("./_components/chart-expense-week"),
);

const TopExpenses = dynamic(() => import("./_components/top-expenses"));

const ReportOverview = dynamic(() => import("./_components/report-overview"));

const CardList = dynamic(() => import("./_components/card-list"));

const RecentExpense = dynamic(() => import("./_components/recent-expense"));

function DashboardPage() {
  return (
    <section className="space-y-2 sm:space-y-4">
      <CardList />

      <div className="grid gap-2 sm:gap-4 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
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

        <Card className="order-3 col-span-1">
          <CardHeader>
            <CardTitle>Báo cáo tổng quan</CardTitle>
          </CardHeader>
          <CardContent>
            <ReportOverview />
          </CardContent>
        </Card>

        <Card className="order-4 lg:col-span-2 2xl:col-span-3">
          <CardHeader>
            <CardTitle>Chi tiêu trong tuần</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartExpenseWeek />
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

export default DashboardPage;
