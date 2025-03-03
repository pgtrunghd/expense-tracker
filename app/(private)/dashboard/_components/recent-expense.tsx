"use client";

import CategoryIcon from "@/components/category-icon";
import { NoDataFound } from "@/components/no-data-found";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetRecentActivityQuery } from "@/features/expense.slice";
import { formatDate } from "@/lib/constants";
import { formatter } from "@/lib/utils";
import { RootState } from "@/store";
import { format } from "date-fns";
import * as LucideIcon from "lucide-react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

const RecentExpense = () => {
  const { date } = useSelector((state: RootState) => state.global);
  const { data: res, isLoading } = useGetRecentActivityQuery(date);
  const router = useRouter();
  const expenseData = res?.slice(0, 5);

  const loading = () => {
    return (
      <div className="space-y-4">
        {Array(5)
          .fill(0)
          .map((_, index) => (
            <Skeleton className="h-16 w-full" key={index} />
          ))}
      </div>
    );
  };

  const empty = () => {
    return (
      <div className="items flex h-full justify-center">
        <NoDataFound />
      </div>
    );
  };

  return (
    <>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Giao dịch gần đây
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          loading()
        ) : expenseData?.length === 0 ? (
          empty()
        ) : (
          <div className="relative space-y-4">
            {expenseData?.map((expense) => {
              const Icon = LucideIcon[
                (expense?.category?.icon as keyof typeof LucideIcon) ?? "Tag"
              ] as React.FC<React.SVGProps<SVGSVGElement>>;

              return (
                <div
                  className="relative flex justify-between rounded-xl bg-muted px-4 py-2"
                  key={expense.id}
                >
                  <div className="flex items-center gap-4">
                    {expense?.category && (
                      <CategoryIcon
                        color={expense?.category?.color}
                        icon={expense?.category?.icon}
                        containerClass="size-7"
                        iconClass="size-4"
                      />
                    )}

                    <div className="space-y-1">
                      {expense?.category && (
                        <p className="text-sm font-medium leading-none">
                          {expense?.category?.name}
                        </p>
                      )}
                      <p className="line-clamp-1 text-sm text-muted-foreground">
                        {expense.description}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-1 text-right">
                    {expense.type === "income" ? (
                      <p className="rounded-lg bg-green-500/10 px-2 py-1 text-xs font-medium text-green-500">
                        +{formatter.format(expense.amount)}
                      </p>
                    ) : (
                      <p className="rounded-lg bg-destructive/10 px-2 py-1 text-xs font-medium text-destructive">
                        -{formatter.format(expense.amount)}
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground">
                      {format(expense.createDate, formatDate)}
                    </p>
                  </div>
                </div>
              );
            })}
            <Button
              size="sm"
              variant="outline"
              className="w-full"
              onClick={() => router.push("/transaction")}
            >
              Xem thêm
            </Button>
          </div>
        )}
      </CardContent>
    </>
  );
};

export default RecentExpense;
