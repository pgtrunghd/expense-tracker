"use client";

import AddTransaction from "@/components/add-transaction";
import { NoDataFound } from "@/components/no-data-found";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetRecentActivityQuery } from "@/features/expense.slice";
import { cn, formatter } from "@/lib/utils";
import { RootState } from "@/store";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import { TransactionItem } from "./transaction-item";

export const TransactionList = () => {
  const { date } = useSelector((state: RootState) => state.global);
  const { data: res, isLoading } = useGetRecentActivityQuery(date);

  const dataList = useMemo(() => {
    const result = res?.data?.reduce(
      (acc: { [key: string]: typeof res.data }, item) => {
        const date = format(new Date(item.createDate), "iiiiii, dd MMM,yyyy", {
          locale: vi,
        });
        if (!acc[date]) {
          acc[date] = [item];
        } else {
          acc[date] = [...acc[date], item];
        }
        return acc;
      },
      {},
    );

    if (!result) return;

    return Object.entries(result);
  }, [res]);

  const sum = useCallback((transaction: RecentActivityData[]) => {
    const result = transaction.reduce(
      (acc, item) =>
        acc + (item.type === "income" ? item.amount : -item.amount),
      0,
    );

    return (
      <span
        className={cn(
          "font-medium",
          result > 0 ? "text-green-500" : "text-destructive",
        )}
      >
        {formatter.format(result)}
      </span>
    );
  }, []);

  if (isLoading) {
    return (
      <div className="mt-6 space-y-6">
        {Array.from({ length: 5 }).map((item, index) => (
          <div className="space-y-2" key={index}>
            <Skeleton className="h-7 w-60" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-5 w-60" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <section className="mt-6 space-y-6">
      {dataList && dataList.length > 0 ? (
        dataList?.map((item, index) => (
          <div key={index} className="space-y-2">
            <h3 className="pl-3 text-lg font-semibold">{item[0]}</h3>
            <div className="rounded-xl border bg-background shadow">
              {item[1].map((activity) => (
                <TransactionItem activity={activity} key={activity.id} />
              ))}
            </div>
            <p className="pl-3 text-sm text-muted-foreground">
              Tổng: {sum(item[1])}
            </p>
          </div>
        ))
      ) : (
        <NoDataFound />
      )}
      <AddTransaction />
    </section>
  );
};
