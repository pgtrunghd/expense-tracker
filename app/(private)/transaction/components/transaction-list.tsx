"use client";

import { useGetRecentActivityQuery } from "@/features/expense.slice";
import { format } from "date-fns";
import { useCallback, useMemo } from "react";
import { vi } from "date-fns/locale";
import CategoryIcon from "@/components/category-icon";
import * as LucideIcon from "lucide-react";
import { ChevronRight } from "lucide-react";
import { cn, formatter } from "@/lib/utils";

export const TransactionList = () => {
  const { data: res, isLoading, isSuccess } = useGetRecentActivityQuery();

  const dataList = useMemo(() => {
    const result = res?.reduce(
      (acc: { [key: string]: RecentActivity[] }, item) => {
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
  }, [isSuccess]);

  const sum = useCallback((transaction: RecentActivity[]) => {
    const result = formatter.format(
      transaction.reduce(
        (acc, item) =>
          acc + item.type === "income" ? item.amount : -item.amount,
        0,
      ),
    );

    return (
      <span
        className={cn(
          "font-medium",
          Number(result) > 0 ? "text-green-500" : "text-destructive",
        )}
      >
        {result}
      </span>
    );
  }, []);

  if (!dataList) return null;

  return (
    <section className="mt-6 space-y-4">
      {dataList.length &&
        dataList?.map((item, index) => (
          <div key={index} className="space-y-2">
            <h3 className="text-lg font-semibold">{item[0]}</h3>
            <div className="rounded-xl border bg-background shadow">
              {item[1].map((activity) => {
                return (
                  activity.category && (
                    <div
                      key={activity.id}
                      className="flex cursor-pointer items-center justify-between border-b py-3 pl-4 pr-2 last:border-none hover:bg-muted hover:transition first:hover:rounded-t-[11px] last:hover:rounded-b-[11px]"
                    >
                      <span className="flex items-center gap-2">
                        <CategoryIcon
                          color={activity.category?.color as string}
                          icon={activity.category?.icon as string}
                          containerClass="size-7"
                          iconClass="size-4"
                        />
                        <p>{activity.category?.name}</p>
                      </span>
                      <span className="flex items-center gap-1">
                        {activity.type === "income" ? (
                          <p className="rounded-lg bg-green-500/10 px-2 py-1 text-xs font-medium text-green-500">
                            +{formatter.format(activity.amount)}
                          </p>
                        ) : (
                          <p className="rounded-lg bg-destructive/10 px-2 py-1 text-xs font-medium text-destructive">
                            -{formatter.format(activity.amount)}
                          </p>
                        )}
                        <LucideIcon.ChevronRight className="size-5 text-muted-foreground" />
                      </span>
                    </div>
                  )
                );
              })}
            </div>
            <p className="pl-3 text-sm text-muted-foreground">
              Tổng: {sum(item[1])}
            </p>
          </div>
        ))}
    </section>
  );
};
