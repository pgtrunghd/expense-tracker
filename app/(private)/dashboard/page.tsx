import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CardList } from "./_components/card-list";
import { ChartExpenseToday } from "./_components/chart-expense-today";
import { ChartExpenseWeek } from "./_components/chart-expense-week";
import { RecentExpense } from "./_components/recent-expense";
import { TopExpenses } from "./_components/top-expenses";

export default function DashboardPage() {
  return (
    <section className="space-y-4">
      <CardList />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
        {/* <Card className="col-span-2">
          <CardContent className="p-6">
            <Tabs defaultValue="today">
              <TabsList>
                <TabsTrigger value="today">Chi tiêu hôm nay</TabsTrigger>
                <TabsTrigger value="week">Chi tiêu trong tuần</TabsTrigger>
              </TabsList>

              <TabsContent value="today" className="mt-10">
                <ChartExpenseToday />
              </TabsContent>
              <TabsContent value="week" className="mt-10">
                <ChartExpenseWeek />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card> */}

        <Card className="lg:col-span-2 2xl:col-span-3">
          <CardHeader>
            <CardTitle>Top chi tiêu</CardTitle>
          </CardHeader>
          <CardContent>
            <TopExpenses />
          </CardContent>
        </Card>

        <Card className="">
          <RecentExpense />
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Chi tiêu hôm nay</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartExpenseToday />
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 2xl:col-span-3">
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
