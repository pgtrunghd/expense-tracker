import { Card, CardContent } from "@/components/ui/card";
import { ExpenseTable } from "./expense-table";

export default function DashboardPage() {
  return (
    <div>
      <Card>
        <CardContent>
          <ExpenseTable />
        </CardContent>
      </Card>
    </div>
  );
}
