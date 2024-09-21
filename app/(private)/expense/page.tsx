import { Card, CardContent } from "@/components/ui/card";
import { ExpenseTable } from "./_components/expense-table";

export default function CategoryPage() {
  return (
    <>
      <Card>
        <CardContent>
          <ExpenseTable />
        </CardContent>
      </Card>
    </>
  );
}
