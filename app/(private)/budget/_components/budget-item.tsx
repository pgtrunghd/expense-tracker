import CategoryIcon from "@/components/category-icon";
import { CreateExpenseMemo } from "@/components/create-expense";
import { CreateIncomeMemo } from "@/components/create-income";
import { DeleteExpenseMemo } from "@/components/delete-expense";
import { DeleteIncomeMemo } from "@/components/delete-income";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatDate } from "@/lib/constants";
import { formatter } from "@/lib/utils";
import { endOfMonth, format, startOfMonth } from "date-fns";
import { ChevronRight, Edit, EllipsisVertical, Trash2 } from "lucide-react";
import { useState } from "react";
import { vi } from "date-fns/locale";

interface IBudgetItem {
  budget: Budget;
}

export const BudgetItem = ({ budget }: IBudgetItem) => {
  //   const [dropdownOpen, setDropdownOpen] = useState(false);

  //   const handleDialogItemOpenChange = (open: boolean) => {
  //     if (!open) {
  //       setDropdownOpen(false);
  //     }
  //   };

  return (
    <div
      key={budget.id}
      className="flex items-center justify-between border-b py-3 pl-4 pr-2 last:border-none hover:bg-muted hover:transition first:hover:rounded-t-[11px] last:hover:rounded-b-[11px]"
    >
      <span className="flex items-center gap-2">
        <CategoryIcon
          color={budget.category?.color as string}
          icon={budget.category?.icon as string}
          containerClass="size-7"
          iconClass="size-4"
        />
        <p>{budget.category?.name}</p>
      </span>
      <span className="flex items-center gap-1">
        {/* {activity.type === "income" ? (
          <p className="rounded-lg bg-green-500/10 px-2 py-1 text-xs font-medium text-green-500">
            +{formatter.format(activity.amount)}
          </p>
        ) : (
          <p className="rounded-lg bg-destructive/10 px-2 py-1 text-xs font-medium text-destructive">
            -{formatter.format(activity.amount)}
          </p>
        )} */}
        <span className="flex flex-col items-end gap-y-1">
          <span className="text-xs">
            {format(new Date(budget.startDate), "dd MMM", {
              locale: vi,
            })}{" "}
            -{" "}
            {format(new Date(budget.endDate), "dd MMM", {
              locale: vi,
            })}
          </span>
          <span className="rounded-lg bg-green-500/10 px-2 py-1 text-xs font-medium text-green-500">
            {formatter.format(budget.amount)}
          </span>
        </span>
        <ChevronRight className="size-5 text-muted-foreground" />

        {/* <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
          <DropdownMenuTrigger>
            <EllipsisVertical className="size-4 text-muted-foreground" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuGroup>
              <CreateTransaction
                callback={handleDialogItemOpenChange}
                expense={activity}
                income={activity}
                trigger={
                  <DropdownMenuItem
                    onSelect={(event) => {
                      event.preventDefault();
                    }}
                  >
                    <Edit />
                    Sửa
                  </DropdownMenuItem>
                }
              />

              <DeleteTransaction
                callback={handleDialogItemOpenChange}
                expense={activity}
                income={activity}
                trigger={
                  <DropdownMenuItem
                    onSelect={(event) => {
                      event.preventDefault();
                    }}
                  >
                    <Trash2 />
                    Xóa
                  </DropdownMenuItem>
                }
              />
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu> */}
      </span>
    </div>
  );
};
