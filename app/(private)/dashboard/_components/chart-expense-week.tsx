"use client";

import { NoDataFound } from "@/components/no-data-found";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetWeeklyExpenseQuery } from "@/features/expense.slice";
import { useWindowSize } from "@/hooks/use-window-size";
import { formatDate, formatter } from "@/lib/utils";
import React, { useCallback, useMemo } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from "recharts";

export const ChartExpenseWeek = () => {
  const { data, isLoading } = useGetWeeklyExpenseQuery(formatDate(new Date()));
  // const { width } = useWindowSize();

  const getCategories = useCallback(() => {
    const checkDuplicate: { [key: string]: boolean } = {};
    const result: { name: string; color: string }[] = [];
    data?.forEach((item: Expense) => {
      if (!checkDuplicate[item.category.name]) {
        checkDuplicate[item.category.name] = true;
        result.push({
          name: item.category.name,
          color: item.category.color,
        });
      }
    });
    return result;
  }, [data]);

  const categories = useMemo(getCategories, [data]);

  const chartData = useMemo(
    () =>
      data?.reduce((acc: any[], curr: Expense) => {
        const date = formatDate(new Date(curr.createDate));
        let entry = acc.find((item) => item.date === date);
        if (!entry) {
          entry = { date };
          // categories.forEach((category: string) => (entry[category] = 0));
          acc.push(entry);
        }
        entry[curr.category.name] =
          (entry[curr.category.name] || 0) + curr.amount;
        return acc;
      }, []),
    [data],
  );

  const chartConfig = useMemo(() => {
    const config: ChartConfig = {};
    for (let item of categories) {
      config[item.name] = {
        label: item.name,
        color: item.color,
      };
    }

    return config;
  }, [chartData]) satisfies ChartConfig;

  if (isLoading) return <Skeleton className="h-60 w-full md:col-span-2" />;

  return (
    <Card className="md:col-span-2">
      <CardHeader>
        <CardTitle>Chi tiêu tuần này</CardTitle>
      </CardHeader>

      <CardContent>
        {chartData?.length > 0 ? (
          <ChartContainer
            config={chartConfig}
            className="w-full md:max-h-[300px]"
          >
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                tickMargin={8}
                axisLine={false}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return date.toLocaleDateString("vi-VN", {
                    month: "numeric",
                    day: "numeric",
                  });
                }}
              />
              {/* <YAxis axisLine={false} tickLine={false} tickCount={3} /> */}
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    labelFormatter={(value) => {
                      const date = new Date(value);
                      return date.toLocaleDateString("vi-VN", {
                        month: "numeric",
                        day: "numeric",
                      });
                    }}
                  />
                }
              />
              {/* <ChartLegend content={<ChartLegendContent />} /> */}
              {categories.map((category, index) => (
                <Bar
                  key={category.name}
                  dataKey={category.name}
                  type="natural"
                  // stackId="a"
                  fill={category.color}
                  // stroke={category.color}
                  // strokeWidth={2}
                  fillOpacity={0.8}
                  radius={4}
                  // dot={{
                  //   fill: category.color,
                  // }}
                  // radius={8}
                  // radius={
                  //   categories.length > 1
                  //     ? index === 0
                  //       ? [0, 0, 8, 8]
                  //       : index === categories.length - 1
                  //         ? [8, 8, 0, 0]
                  //         : [0, 0, 0, 0]
                  //     : 8
                  // }
                >
                  {/* <LabelList dataKey={category.name} /> */}
                </Bar>
              ))}
            </BarChart>
          </ChartContainer>
        ) : (
          <NoDataFound />
        )}
      </CardContent>
    </Card>
  );
};
