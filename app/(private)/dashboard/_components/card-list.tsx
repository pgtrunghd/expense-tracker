"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetBalanceQuery } from "@/features/balance.slice";
import { useGetCategoriesQuery } from "@/features/category.slice";
import { cn, formatter } from "@/lib/utils";
import {
  CircleDollarSign,
  CreditCard,
  HandCoins,
  PiggyBank,
  Wallet,
} from "lucide-react";
import React from "react";

const CardList = () => {
  const { data: overviewData, isLoading } = useGetBalanceQuery();

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center justify-between">
            Chi tiêu <CircleDollarSign className="size-5" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-base font-semibold text-destructive md:text-lg">
            -{formatter.format(overviewData?.totalExpense ?? 0)}
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center justify-between">
            Thu nhập <HandCoins className="size-5" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-base font-semibold text-green-500 md:text-lg">
            +{formatter.format(overviewData?.totalIncome ?? 0)}
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center justify-between">
            Tiết kiệm <Wallet className="size-5" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p
            className={cn(
              "text-base font-semibold md:text-lg",
              !overviewData?.totalSaving
                ? "text-muted-foreground"
                : overviewData?.totalSaving < 0
                  ? "text-destructive"
                  : "text-green-500",
            )}
          >
            {formatter.format(overviewData?.totalSaving ?? 0)}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default CardList;
