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
import {
  useGetExpensesQuery,
  useGetRecentActivityQuery,
} from "@/features/expense.slice";
import { formatter } from "@/lib/utils";
import { format } from "date-fns";
import { Ellipsis, ListCollapse, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import CreateExpense from "../../expense/_components/create-expense";
import { useFilter } from "@/hooks/useFilter";

export const RecentExpense = () => {
  const [modal, setModal] = useState(false);
  // const { filter } = useFilter({ take: 5 });
  const { data: res, isLoading, isSuccess } = useGetRecentActivityQuery();
  const expenseData = res?.slice(0, 5);
  // const expenseMeta = res?.meta;
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

  if (isSuccess && !expenseData?.length) {
    return (
      <div className="items flex h-full justify-center">
        <NoDataFound />
      </div>
    );
  }

  return (
    <>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Hoạt động gần đây
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button size="iconSm" variant="ghost">
                <Ellipsis className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setModal(true)}>
                <Plus className="mr-2 size-4" />
                Tạo chi tiêu
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => router.push("/expense")}>
                <ListCollapse className="mr-2 size-4" />
                Xem chi tiết
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          loading()
        ) : (
          <div className="relative pl-4 before:absolute before:bottom-[38px] before:left-0 before:top-[38px] before:z-[2] before:block before:w-[2px] before:-translate-x-1/2 before:bg-primary">
            {expenseData?.map((expense) => (
              <div
                className="mt-4 flex items-center justify-between rounded-md bg-muted p-3 before:absolute before:left-0 before:z-[2] before:block before:size-2 before:-translate-x-1/2 before:rounded-full before:bg-primary first:mt-0"
                key={expense.id}
              >
                <div className="space-y-1">
                  {/* <Badge style={{ backgroundColor: expense.category.color }}>
                    {expense.category.name}
                  </Badge> */}
                  <p className="text-sm">{expense.description}</p>
                  <p className="text-sm text-muted-foreground">
                    {format(expense.createDate, "dd/MM/yyyy")}
                  </p>
                </div>
                {expense.type === "income" ? (
                  <p className="text-sm text-green-500">
                    +{formatter.format(expense.amount)}
                  </p>
                ) : (
                  <p className="text-sm text-destructive">
                    -{formatter.format(expense.amount)}
                  </p>
                )}
              </div>
            ))}
            <div className="z-1 absolute bottom-0 left-0 top-0 w-[2px] -translate-x-1/2 bg-primary-foreground" />
          </div>
        )}
      </CardContent>

      <CreateExpense open={modal} setOpen={setModal} />
    </>
  );
};
