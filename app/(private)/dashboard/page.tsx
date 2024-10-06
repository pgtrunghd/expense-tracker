import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartExpenseToday } from "./_components/chart-expense-today";
import { CardList } from "./_components/card-list";
import { ExpenseTable } from "../expense/_components/expense-table";
import { ChartExpenseWeek } from "./_components/chart-expense-week";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RecentExpense } from "./_components/recent-expense";

export default function DashboardPage() {
  return (
    <section className="space-y-4">
      <CardList />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 md:grid-rows-2 gap-4">
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

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Chi tiêu hôm nay</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartExpenseToday />
          </CardContent>
        </Card>
        <Card className="row-span-2">
          <CardHeader>
            <CardTitle>Chi tiêu gần đây</CardTitle>
          </CardHeader>
          <CardContent>
            <RecentExpense />
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
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
