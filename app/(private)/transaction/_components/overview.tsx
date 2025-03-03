"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetOverviewQuery } from "@/features/balance.slice";
import { cn, formatter } from "@/lib/utils";
import { RootState } from "@/store";
import { CircleMinus, CirclePlus } from "lucide-react";
import { useMemo } from "react";
import { useSelector } from "react-redux";

export const Overview = () => {
  const { date } = useSelector((state: RootState) => state.global);
  const { data: overviewData } = useGetOverviewQuery(date);

  const cardList = useMemo(
    () => [
      {
        title: "Chi tiêu",
        icon: CircleMinus,
        value: overviewData?.totalExpense ?? 0,
        type: "income",
      },
      {
        title: "Thu nhập",
        icon: CirclePlus,
        value: overviewData?.totalIncome ?? 0,
        type: "expense",
      },
    ],
    [overviewData],
  );

  return (
    <section className="grid grid-cols-2 gap-4">
      {cardList?.map((card) => (
        <Card key={card.title}>
          <CardHeader className="!px-4 !pb-2 !pt-4">
            <CardTitle className="flex items-center justify-between font-medium">
              {card.title}
              <span>
                <card.icon className="size-5 text-muted-foreground" />
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="md:p-4 md:pt-0">
            <p
              className={cn(
                "truncate text-base font-semibold",
                card.type === "income" ? "text-green-500" : "text-destructive",
              )}
            >
              {card.type === "income" ? "" : "-"}
              {formatter.format(card.value)}
            </p>
          </CardContent>
        </Card>
      ))}
    </section>
  );
};
