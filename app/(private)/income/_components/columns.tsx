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
import { useState } from "react";
import { CreateIncomeMemo } from "./create-income";

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
            <p className="text-green-500">+{amount}</p>
          </>
        );
      },
    },
    {
      id: "actions",
      cell: function Cell({ row }) {
        const [modalEdit, setModalEdit] = useState(false);
        const [modalDelete, setModalDelete] = useState(false);

        return (
          <div className="text-right">
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Ellipsis className="size-4" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end">
                <DropdownMenuItem onSelect={() => setModalEdit(true)}>
                  <FilePenLine className="mr-2 size-4" />
                  <span>Sửa</span>
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setModalDelete(true)}>
                  <Eraser className="mr-2 size-4" />
                  <span>Xóa</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <CreateIncomeMemo open={modalEdit} setOpen={setModalEdit} />
          </div>
        );
      },
    },
  ];
};
