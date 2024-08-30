import { Card, CardContent } from "@/components/ui/card";
import { CategoryTable } from "./category-table";

export default function CategoryPage() {
  return (
    <>
      <Card>
        <CardContent>
          <CategoryTable />
        </CardContent>
      </Card>
    </>
  );
}
