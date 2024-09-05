"use client";

import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useGetDailyCategoryQuery } from "@/features/category.slice";
import { useGetDailyExpenseQuery } from "@/features/expense.slice";
import React, { useMemo } from "react";
import { Pie, PieChart } from "recharts";

export const ChartExpense = () => {
  const { data } = useGetDailyCategoryQuery("2024-08-23T00:00:00.000Z");
  const chartData = useMemo(
    () =>
      data?.map((item: Category) => ({
        amount: item.expenses.reduce((acc, curr) => acc + curr.amount, 0),
        category: item.name.toLowerCase(),
        fill: "hsl(var(--chart-1))",
      })),
    [data],
  );

  const chartConfig = {
    electronic: {
      label: "Electronic",
      color: "hsl(var(--chart-1))",
    },
    shopping: {
      label: "Shopping",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig;

  return (
    <>
      <CardHeader>
        <CardTitle>Chart</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  className="flex items-center gap-4"
                  hideLabel
                />
              }
            />
            <Pie data={chartData} dataKey="amount" nameKey="category" />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </>
  );
};
