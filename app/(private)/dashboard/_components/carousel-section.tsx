"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const ChartExpenseWeek = dynamic(() => import("./chart-expense-week"));

const TopExpenses = dynamic(() => import("./top-expenses"));

const ReportOverview = dynamic(() => import("./report-overview"));

const CarouselSection = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [count, setCount] = useState(0);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <Carousel setApi={setApi} className="block md:hidden">
      <CarouselContent>
        <CarouselItem>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Top chi tiêu</CardTitle>
            </CardHeader>
            <CardContent>
              <TopExpenses />
            </CardContent>
          </Card>
        </CarouselItem>

        <CarouselItem>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Báo cáo tổng quan</CardTitle>
            </CardHeader>
            <CardContent>
              <ReportOverview />
            </CardContent>
          </Card>
        </CarouselItem>

        <CarouselItem>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Chi tiêu trong tuần</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartExpenseWeek />
            </CardContent>
          </Card>
        </CarouselItem>
      </CarouselContent>
      <div className="flex items-center justify-center gap-2 py-2">
        {Array.from({ length: count }).map((_, index) => (
          <div
            className={cn(
              "size-2 rounded-full bg-white",
              index + 1 === current && "bg-muted-foreground",
            )}
            key={index}
          />
        ))}
      </div>
    </Carousel>
  );
};

export default CarouselSection;
