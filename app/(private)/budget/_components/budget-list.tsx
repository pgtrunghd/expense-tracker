"use client";

import { NoDataFound } from "@/components/no-data-found";
import { useGetBudgetQuery } from "@/features/budget.slice";
import { BudgetRepeatList } from "@/lib/budget-repeat-list";
import { useCallback, useMemo } from "react";
import { BudgetItem } from "./budget-item";
import { cn, formatter } from "@/lib/utils";
import AddBudget from "@/components/add-budget";

export const BudgetList = () => {
  const { data: budgetData, isLoading } = useGetBudgetQuery();

  const budgetList = useMemo(() => {
    const list = budgetData?.data?.reduce(
      (acc: { [key: string]: any[] }, item) => {
        if (!acc[item.cycle]) {
          acc[item.cycle] = [item];
        } else {
          acc[item.cycle] = [...acc[item.cycle], item];
        }
        return acc;
      },
      {},
    );

    return list;
  }, [budgetData?.data]);

  const sum = useCallback((budget: Budget[]) => {
    const result = budget.reduce((acc, item) => acc + item.amount, 0);

    return (
      <span className={cn("font-medium text-green-500")}>
        {formatter.format(result)}
      </span>
    );
  }, []);

  if (!budgetList) return null;

  return (
    <section className="mt-6 space-y-6">
      {Object.keys(budgetList).length > 0 ? (
        Object.keys(budgetList)?.map((item, index) => (
          <div key={index} className="space-y-2">
            <h3 className="pl-3 text-lg font-semibold">
              {BudgetRepeatList.find((v) => v.value === item)?.label}
            </h3>
            <div className="rounded-xl border bg-background shadow">
              {budgetList?.[item].map((budget) => (
                <BudgetItem budget={budget} key={budget.id} />
              ))}
            </div>
            <p className="pl-3 text-sm text-muted-foreground">
              Tổng: {sum(budgetList[item])}
            </p>
          </div>
        ))
      ) : (
        <NoDataFound />
      )}

      <AddBudget />
    </section>
  );
};
