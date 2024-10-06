"use client";

import { NoDataFound } from "@/components/no-data-found";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetExpensesQuery } from "@/features/expense.slice";
import { useFilter } from "@/hooks/use-filter";
import { formatDate, formatter } from "@/lib/utils";
import { format } from "date-fns";
import React, { useState } from "react";

export const RecentExpense = () => {
  const { filter } = useFilter({ take: 8 });
  const { data: res, isLoading, isSuccess } = useGetExpensesQuery(filter);
  const expenseData = res?.data;
  const expenseMeta = res?.meta;

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array(5)
          .fill(0)
          .map((_, index) => (
            <Skeleton className="h-16 w-full" key={index} />
          ))}
      </div>
    );
  }

  if (isSuccess && !expenseData?.length) {
    return (
      <div className="items flex h-full justify-center">
        <NoDataFound />
      </div>
    );
  }

  return (
    <div className="relative pl-4 before:absolute before:bottom-[38px] before:left-0 before:top-[38px] before:z-[2] before:block before:w-[2px] before:-translate-x-1/2 before:bg-primary">
      {expenseData?.map((expense: Expense) => (
        <div
          className="mt-4 flex items-center justify-between rounded-md bg-muted p-3 before:absolute before:left-0 before:z-[2] before:block before:size-2 before:-translate-x-1/2 before:rounded-full before:bg-primary first:mt-0"
          key={expense.id}
        >
          <div className="space-y-1">
            <Badge style={{ backgroundColor: expense.category.color }}>
              {expense.category.name}
            </Badge>
            <p className="text-sm text-muted-foreground">
              {format(expense.createDate, "dd/MM/yyyy")}
            </p>
          </div>
          <p className="text-sm text-destructive">
            -{formatter.format(expense.amount)}
          </p>
        </div>
      ))}
      <div className="z-1 absolute bottom-0 left-0 top-0 w-[2px] -translate-x-1/2 bg-primary-foreground" />
    </div>
  );
};
