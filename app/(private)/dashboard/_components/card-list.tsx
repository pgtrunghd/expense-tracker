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
import { formatter } from "@/lib/utils";
import { CircleDollarSign, CreditCard, PiggyBank, Wallet } from "lucide-react";
import React from "react";

export const CardList = () => {
  const { data: overviewData, isLoading } = useGetBalanceQuery();

  if (isLoading)
    return (
      <div className="grid grid-cols-1 gap-4 duration-200 sm:grid-cols-2 lg:grid-cols-4">
        {Array(3)
          .fill(0)
          .map((_, index) => (
            <Skeleton className="h-28 w-full" key={index} />
          ))}
      </div>
    );

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center justify-between">
            Chi tiêu <CircleDollarSign className="size-5" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-base font-semibold text-muted-foreground md:text-lg">
            {formatter.format(overviewData?.totalExpense ?? 0)}
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center justify-between">
            Thu nhập <CircleDollarSign className="size-5" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-base md:text-lg font-semibold text-muted-foreground">
            {formatter.format(overviewData?.totalIncome ?? 0)}
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
          <p className="text-base md:text-lg font-semibold text-muted-foreground">
            {formatter.format(overviewData?.totalSaving ?? 0)}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
