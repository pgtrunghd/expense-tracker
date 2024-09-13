import { Card, CardContent } from "@/components/ui/card";
import { ChartExpenseToday } from "./_components/chart-expense-today";
import { CardList } from "./_components/card-list";
import { ExpenseTable } from "./_components/expense-table";
import { ChartExpenseWeek } from "./_components/chart-expense-week";

export default function DashboardPage() {
  return (
    <section className="space-y-4">
      <CardList />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="md:col-span-1">
          <ChartExpenseToday />
        </Card>
        <Card className="md:col-span-2">
          <ChartExpenseWeek />
        </Card>
      </div>

      <Card>
        <CardContent>
          <ExpenseTable />
        </CardContent>
      </Card>
    </section>
  );
}
