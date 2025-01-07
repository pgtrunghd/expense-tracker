"use client";

import { NoDataFound } from "@/components/no-data-found";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetRecentActivityQuery } from "@/features/expense.slice";
import { formatter } from "@/lib/utils";
import { format } from "date-fns";
import { Ellipsis, ListCollapse } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const RecentExpense = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { data: res, isLoading, isSuccess } = useGetRecentActivityQuery();
  const expenseData = res?.slice(0, 5);
  const router = useRouter();

  const loading = () => {
    return (
      <div className="space-y-4">
        {Array(5)
          .fill(0)
          .map((_, index) => (
            <Skeleton className="h-16 w-full" key={index} />
          ))}
      </div>
    );
  };

  const empty = () => {
    return (
      <div className="items flex h-full justify-center">
        <NoDataFound />
      </div>
    );
  };

  return (
    <>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Hoạt động gần đây
          <DropdownMenu
            modal={false}
            open={dropdownOpen}
            onOpenChange={setDropdownOpen}
          >
            <DropdownMenuTrigger asChild>
              <Button size="iconSm" variant="ghost" aria-label="detail">
                <Ellipsis className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              onCloseAutoFocus={(event) => event.preventDefault()}
            >
              <DropdownMenuItem onClick={() => router.push("/expense")}>
                <ListCollapse className="mr-2 size-4" />
                Chi tiết chi tiêu
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => router.push("/income")}>
                <ListCollapse className="mr-2 size-4" />
                Chi tiết thu nhập
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          loading()
        ) : isSuccess && !expenseData?.length ? (
          empty()
        ) : (
          <div className="relative">
            {expenseData?.map((expense) => (
              <div
                className="relative mt-4 flex justify-between rounded-md bg-muted p-3 first:mt-0"
                key={expense.id}
              >
                <div className="space-y-1">
                  <p className="line-clamp-1 text-sm">{expense.description}</p>
                  {expense?.category && (
                    <Badge
                      style={{ backgroundColor: expense?.category?.color }}
                      className="text-[10px]"
                    >
                      {expense?.category?.name}
                    </Badge>
                  )}
                </div>
                <div className="space-y-1 text-right">
                  {expense.type === "income" ? (
                    <p className="text-sm font-medium text-green-500">
                      +{formatter.format(expense.amount)}
                    </p>
                  ) : (
                    <p className="text-sm font-medium text-destructive">
                      -{formatter.format(expense.amount)}
                    </p>
                  )}
                  <p className="text-sm text-muted-foreground">
                    {format(expense.createDate, "dd/MM/yyyy")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </>
  );
};

export default RecentExpense;
