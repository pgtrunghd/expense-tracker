"use client";

import { NoDataFound } from "@/components/no-data-found";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetBalanceQuery } from "@/features/balance.slice";
import { useMemo } from "react";
import { Pie, PieChart } from "recharts";

const ReportOverview = () => {
  const { data, isLoading } = useGetBalanceQuery();

  const chartData = useMemo(
    () => [
      {
        amount: data?.totalExpense ?? 0,
        category: "Chi tiêu",
        fill: "hsl(var(--chart-1))",
      },
      {
        amount: data?.totalIncome ?? 0,
        category: "Thu nhập",
        fill: "hsl(var(--chart-2))",
      },
      // {
      //   amount: data?.totalSaving ?? 0,
      //   category: "Tiết kiệm",
      //   fill: "hsl(var(--chart-3))",
      // },
    ],
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

  if (isLoading) return <Skeleton className="h-[250px] w-full md:col-span-1" />;

  return chartData?.find((item) => item.amount > 0) ? (
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
        <Pie
          data={chartData}
          dataKey="amount"
          nameKey="category"
          className="flex"
          innerRadius={60}
        />
        <ChartLegend content={<ChartLegendContent nameKey="category" />} />
      </PieChart>
    </ChartContainer>
  ) : (
    <div className="flex h-full items-center justify-center">
      <NoDataFound />
    </div>
  );
};

export default ReportOverview;
