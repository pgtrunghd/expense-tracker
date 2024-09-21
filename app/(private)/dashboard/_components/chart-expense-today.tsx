"use client";

import { NoDataFound } from "@/components/no-data-found";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetDailyCategoryQuery } from "@/features/category.slice";
import { formatDate } from "@/lib/utils";
import { DatabaseZap } from "lucide-react";
import { useMemo } from "react";
import { Pie, PieChart } from "recharts";

export const ChartExpenseToday = () => {
  const { data, isLoading } = useGetDailyCategoryQuery(formatDate(new Date()));

  const chartData = useMemo(
    () =>
      data?.map((item: Category) => ({
        amount: item.expenses.reduce((acc, curr) => acc + curr.amount, 0),
        category: item.name,
        fill: item.color,
      })),
    [data],
  );

  const chartConfig = useMemo(() => {
    const config: ChartConfig = {};
    for (let i = 0; i < chartData?.length; i++) {
      config[chartData[i].category] = {
        label: chartData[i].category,
        color: chartData[i].fill,
      };
    }
    return config;
  }, [data]) satisfies ChartConfig;

  if (isLoading) return <Skeleton className="h-60 w-full md:col-span-1" />;

  return (
    <Card className="md:col-span-1">
      <CardHeader>
        <CardTitle>Chi tiêu hôm nay</CardTitle>
      </CardHeader>
      <CardContent>
        {data?.length > 0 ? (
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px] sm:max-h-[300px]"
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
        ) : (
          <NoDataFound />
        )}
      </CardContent>
    </Card>
  );
};
