"use client";

import { NoDataFound } from "@/components/no-data-found";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useGetWeeklyExpenseQuery } from "@/features/expense.slice";
import { formatDate, formatter } from "@/lib/utils";
import React, { useCallback, useMemo } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";

export const ChartExpenseWeek = () => {
  const { data } = useGetWeeklyExpenseQuery(formatDate(new Date()));
  // const categories = useMemo(
  //   () => [...new Set(data?.map((item: Expense) => item.category.name))],
  //   [data],
  // );
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
    // const categories = getCategories();
    for (let item of categories) {
      config[item.name] = {
        label: item.name,
        color: item.color,
      };
    }

    return config;
  }, [chartData]) satisfies ChartConfig;

  console.log(chartData);

  return (
    <>
      <CardHeader>
        <CardTitle>Chi tiêu tuần này</CardTitle>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig} className="max-h-[300px] w-full">
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
            <YAxis  />
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
            <ChartLegend content={<ChartLegendContent />} />
            {categories.map((category, index) => (
              <Bar
                dataKey={category.name}
                stackId="a"
                fill={category.color}
                radius={
                  categories.length > 1
                    ? index === 0
                      ? [0, 0, 8, 8]
                      : index === categories.length - 1
                        ? [8, 8, 0, 0]
                        : [0, 0, 0, 0]
                    : 8
                }
              >
                <LabelList dataKey={category.name} />
              </Bar>
            ))}
            {/* <Bar dataKey="Ăn uống" stackId="a" fill="red">
              <LabelList dataKey="Ăn uống" position="top" />
            </Bar>
            <Bar dataKey="Mua sắm" stackId="a" fill="black">
              <LabelList dataKey="Mua sắm" position="top" />
            </Bar> */}
          </BarChart>
        </ChartContainer>
      </CardContent>
    </>
  );
};
