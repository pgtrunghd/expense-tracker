"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  useGetBalanceQuery,
  useGetOverviewQuery,
} from "@/features/balance.slice";
import { cn, formatter } from "@/lib/utils";
import { RootState } from "@/store";
import {
  CircleDollarSign,
  HandCoins,
  TrendingUp,
  TrendingDown,
  Wallet,
} from "lucide-react";
import { useMemo } from "react";
import { useSelector } from "react-redux";

const CardList = () => {
  // const { data: balanceData, isLoading } = useGetBalanceQuery();
  const { date } = useSelector((state: RootState) => state.global);
  const { data: overviewData } = useGetOverviewQuery(date);

  const cardList = useMemo(
    () => [
      {
        title: "Chi tiêu",
        icon: CircleDollarSign,
        value: overviewData?.totalExpense ?? 0,
        prevValue: overviewData?.totalExpensePrevMonth ?? 0,
      },
      {
        title: "Thu nhập",
        icon: HandCoins,
        value: overviewData?.totalIncome ?? 0,
        prevValue: overviewData?.totalIncomePrevMonth ?? 0,
      },
      {
        title: "Tiết kiệm",
        icon: Wallet,
        value: overviewData?.totalSaving ?? 0,
        prevValue: overviewData?.totalSavingPrevMonth ?? 0,
      },
    ],
    [overviewData],
  );

  const calculateDiff = (prev: number, current: number) => {
    return (
      <div className="flex items-center gap-1 text-xs text-muted-foreground">
        <span
          className={cn(
            "flex items-center gap-1",
            prev > current ? "text-destructive" : "text-green-500",
          )}
        >
          {prev > current ? (
            <TrendingDown className="size-4" />
          ) : (
            <TrendingUp className="size-4" />
          )}
          {formatter.format(current - prev)}
        </span>
        <span className="inline-block truncate"> cùng kỳ</span>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
      {cardList.map((card) => (
        <Card key={card.title}>
          <CardHeader className="!pb-2">
            <CardTitle className="flex items-center justify-between text-sm font-medium">
              {card.title} <card.icon className="size-5 text-muted-foreground" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="truncate text-base font-bold md:text-2xl">
              {formatter.format(card.value)}
            </p>
            {calculateDiff(card.prevValue, card.value)}
          </CardContent>
        </Card>
      ))}
      {/* <Card>
        <CardHeader className="!pb-2">
          <CardTitle className="flex items-center justify-between text-sm font-medium">
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
          <CardTitle className="flex items-center justify-between text-sm font-medium">
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
          <CardTitle className="flex items-center justify-between text-sm font-medium">
            Tiết kiệm <Wallet className="size-5" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className={cn("truncate text-base font-semibold md:text-lg")}>
            {formatter.format(overviewData?.totalSaving ?? 0)}
          </p>
          {calculateDiff(
            overviewData?.totalSavingPrevMonth ?? 0,
            overviewData?.totalSaving ?? 0,
          )}
        </CardContent>
      </Card> */}
    </div>
  );
};

export default CardList;
