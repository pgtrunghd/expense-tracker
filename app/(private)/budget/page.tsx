import { BudgetList } from "./_components/budget-list";
import { OverviewBudget } from "./_components/overview-budget";

export default function BudgetPage() {
  return (
    <>
      <OverviewBudget />
      <BudgetList />
    </>
  );
}
