import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExpenseTable } from "./expense-table";
import { ChartExpense } from "./_components/chart-expense";

export default function DashboardPage() {
  return (
    <section className="grid grid-cols-2 gap-4">
      <Card>
        <ChartExpense />
      </Card>

      <Card>
        <CardContent>
          <ExpenseTable />
        </CardContent>
      </Card>
    </section>
  );
}
