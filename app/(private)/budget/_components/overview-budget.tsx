"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn, formatter } from "@/lib/utils";
import { CircleCheck, CircleEqual } from "lucide-react";

export const OverviewBudget = () => {
  const arr = [
    {
      title: "Đã lên kế hoạch",
      icon: CircleEqual,
      value: 320000000,
    },
    {
      title: "Hiện tại",
      icon: CircleCheck,
      value: 1000000,
    },
  ];

  return (
    <section className="grid grid-cols-2 gap-2">
      {arr?.map((card) => (
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
                // card.type === "income" ? "text-green-500" : "text-destructive",
              )}
            >
              {/* {card.type === "income" ? "" : "-"} */}
              {formatter.format(card.value)}
            </p>
          </CardContent>
        </Card>
      ))}
      <Card className="col-span-2">
        <CardContent className="md:p-4">
          <p>You are within your budget!</p>
        </CardContent>
      </Card>
    </section>
  );
};
