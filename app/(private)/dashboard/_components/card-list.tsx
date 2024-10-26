"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetBalanceQuery } from "@/features/balance.slice";
import { cn, formatter } from "@/lib/utils";
import { CircleDollarSign, HandCoins, TrendingUp, Wallet } from "lucide-react";

const CardList = () => {
  const { data: overviewData, isLoading } = useGetBalanceQuery();

  const calculateDiff = (prev: number, current: number) => {
    return (
      <div className="mt-1 flex items-center gap-1 text-xs sm:text-sm">
        <span
          className={cn(
            "flex items-center gap-1",
            prev > current ? "text-destructive" : "text-green-500",
          )}
        >
          <TrendingUp className="size-4" /> {formatter.format(current - prev)}
        </span>
        <span className="inline-block truncate"> cùng kỳ</span>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="!pb-2">
          <CardTitle className="flex items-center justify-between">
            Chi tiêu <CircleDollarSign className="size-5" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="truncate text-base font-semibold md:text-lg">
            {formatter.format(overviewData?.totalExpense ?? 0)}
          </p>
          {calculateDiff(
            overviewData?.totalExpensePrevMonth ?? 0,
            overviewData?.totalExpense ?? 0,
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="!pb-2">
          <CardTitle className="flex items-center justify-between">
            Thu nhập <HandCoins className="size-5" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="truncate text-base font-semibold md:text-lg">
            {formatter.format(overviewData?.totalIncome ?? 0)}
          </p>
          {calculateDiff(
            overviewData?.totalIncomePrevMonth ?? 0,
            overviewData?.totalIncome ?? 0,
          )}
        </CardContent>
      </Card>

      <Card className="col-span-2 md:col-span-1">
        <CardHeader className="!pb-2">
          <CardTitle className="flex items-center justify-between">
            Tiết kiệm <Wallet className="size-5" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p
            className={cn(
              "truncate text-base font-semibold md:text-lg",
              // !overviewData?.totalSaving
              //   ? "text-muted-foreground"
              //   : overviewData?.totalSaving < 0
              //     ? "text-destructive"
              //     : "text-green-500",
            )}
          >
            {formatter.format(overviewData?.totalSaving ?? 0)}
          </p>
          {calculateDiff(
            overviewData?.totalSavingPrevMonth ?? 0,
            overviewData?.totalSaving ?? 0,
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CardList;
