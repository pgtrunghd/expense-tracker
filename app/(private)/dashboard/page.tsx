import { Card, CardContent } from "@/components/ui/card";
import { DataTable } from "./data-table";

export default function DashboardPage() {
  return (
    <div>
      <Card>
        <CardContent>
          <DataTable />
        </CardContent>
      </Card>
    </div>
  );
}
