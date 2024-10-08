"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetCategoriesQuery } from "@/features/category.slice";
import { formatter } from "@/lib/utils";
import { CreditCard } from "lucide-react";
import React from "react";

export const CardList = () => {
  const { data, isLoading } = useGetCategoriesQuery();

  if (isLoading)
    return (
      <div className="grid grid-cols-1 gap-4 duration-200 sm:grid-cols-2 lg:grid-cols-4">
        {Array(4)
          .fill(0)
          .map((_, index) => (
            <Skeleton className="h-28 w-full" key={index} />
          ))}
      </div>
    );

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {data?.map((category: Category) => (
        <Card key={category.id}>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center justify-between">
              {category.name} <CreditCard className="size-5" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-semibold text-muted-foreground">
              {formatter.format(
                category.expenses.reduce((acc, curr) => acc + curr.amount, 0),
              )}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
