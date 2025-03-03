"use client";

import { NoDataFound } from "@/components/no-data-found";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useGetCategoriesQuery,
  useGetTopExpenseByCategoryQuery,
} from "@/features/category.slice";
import { RootState } from "@/store";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

const TopExpenses = () => {
  const { date } = useSelector((state: RootState) => state.global);
  const { data, isLoading } = useGetTopExpenseByCategoryQuery(date);

  const topExpensesData = useMemo(() => {
    if (!data) return [];

    return data
      ?.map((category) => ({
        category: category.name,
        expense: category?.expenses?.reduce(
          (acc, curr) => acc + curr.amount,
          0,
        ),
        fill: category.color,
      }))
      .filter((item) => item.expense > 0)
      .sort((a, b) => b.expense - a.expense)
      .slice(0, 5);
  }, [data]);

  const chartConfig = {
    expense: {
      label: "Chi tiêu",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig;

  if (isLoading) return <Skeleton className="h-full w-full" />;

  return (
    <>
      {topExpensesData.length > 0 ? (
        <ChartContainer
          config={chartConfig}
          className="h-full w-full xl:max-h-[400px]"
        >
          <BarChart accessibilityLayer data={topExpensesData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <Bar dataKey="expense" radius={8} barSize={`${100 / 5}%`} />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
          </BarChart>
        </ChartContainer>
      ) : (
        <div className="flex h-full items-center justify-center">
          <NoDataFound />
        </div>
      )}
    </>
  );
};

export default TopExpenses;
