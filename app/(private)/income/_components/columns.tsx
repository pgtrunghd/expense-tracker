"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { Ellipsis, Eraser, FilePenLine } from "lucide-react";
import { useRef, useState } from "react";
import { CreateIncomeMemo } from "./create-income";
import { formatter } from "@/lib/utils";
import DeleteIncome from "./delete-income";

export const desktopColumns = (): ColumnDef<any>[] => {
  return [
    {
      accessorKey: "createDate",
      header: "Ngày",
      cell: ({ row }) => {
        const date = row?.original?.createDate;
        return (
          <>
            <p>{new Date(date).toLocaleDateString()}</p>
          </>
        );
      },
    },
    {
      accessorKey: "description",
      header: "Mô tả",
      cell: ({ row }) => {
        const description = row?.original?.description;
        return (
          <>
            <p className="max-w-[200px] truncate">{description}</p>
          </>
        );
      },
    },
    {
      accessorKey: "amount",
      header: "Số tiền",
      cell: ({ row }) => {
        const amount = row?.original?.amount;
        return (
          <>
            <p className="text-green-500">+{formatter.format(amount)}</p>
          </>
        );
      },
    },
    {
      id: "actions",
      size: 40,
      cell: function Cell({ row }) {
        const [dropdownOpen, setDropdownOpen] = useState(false);
        const dropdownTriggerRef = useRef(null);

        const handleDialogOpenChange = (open: boolean) => {
          if (!open) {
            setDropdownOpen(false);
          }
        };

        return (
          <div className="text-right">
            <DropdownMenu
              modal={false}
              open={dropdownOpen}
              onOpenChange={setDropdownOpen}
            >
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" ref={dropdownTriggerRef}>
                  <Ellipsis className="size-4" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                onCloseAutoFocus={(event) => {
                  event.preventDefault();
                }}
              >
                <CreateIncomeMemo
                  callback={handleDialogOpenChange}
                  income={row?.original}
                  trigger={
                    <DropdownMenuItem
                      onSelect={(event) => event.preventDefault()}
                    >
                      <FilePenLine className="mr-2 size-4" />
                      <span>Sửa</span>
                    </DropdownMenuItem>
                  }
                />

                <DeleteIncome
                  callback={handleDialogOpenChange}
                  income={row?.original}
                  trigger={
                    <DropdownMenuItem
                      onSelect={(event) => event.preventDefault()}
                    >
                      <Eraser className="mr-2 size-4" />
                      <span>Xóa</span>
                    </DropdownMenuItem>
                  }
                />
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];
};
