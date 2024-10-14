"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatter } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { Ellipsis, Eraser, FilePenLine } from "lucide-react";
import { useState } from "react";

import { ContextMenuExpense } from "./context-menu-expense";
import CreateExpense from "./create-expense";
import DeleteExpense from "./delete-expense";

export const desktopColumns = (): ColumnDef<any>[] => {
  return [
    {
      accessorKey: "createDate",
      header: "Ngày",
      cell: ({ row }) => {
        const date = row?.original?.createDate;
        return (
          <>
            <p>{new Date(date).toLocaleDateString()}</p>
            <ContextMenuExpense data={row.original} />
          </>
        );
      },
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => {
        const category = row?.original?.category;

        return (
          <div className="w-20">
            <Badge style={{ backgroundColor: category?.color }}>
              {category?.name}
            </Badge>
            <ContextMenuExpense data={row.original} />
          </div>
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
            <ContextMenuExpense data={row.original} />
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
            <p className="text-destructive">-{formatter.format(amount)}</p>
            <ContextMenuExpense data={row.original} />
          </>
        );
      },
    },

    {
      id: "actions",
      size: 40,
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

            <CreateExpense
              open={modalEdit}
              setOpen={setModalEdit}
              expense={row.original}
            />

            <DeleteExpense
              expense={row.original}
              open={modalDelete}
              setOpen={setModalDelete}
            />
          </div>
        );
      },
    },
  ];
};

export const mobileColumns = (): ColumnDef<any>[] => {
  return [
    {
      accessorKey: "createDate",
      header: "Date",
      cell: ({ row }) => {
        const date = row?.original?.createDate;
        return (
          <>
            <p>{new Date(date).toLocaleDateString()}</p>
            <ContextMenuExpense data={row.original} />
          </>
        );
      },
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => {
        const category = row?.original?.category;

        return (
          <>
            <Badge style={{ backgroundColor: category?.color }}>
              {category?.name}
            </Badge>
            <ContextMenuExpense data={row.original} />
          </>
        );
      },
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => {
        const description = row?.original?.description;
        return (
          <>
            <p className="line-clamp-1">{description}</p>
            <ContextMenuExpense data={row.original} />
          </>
        );
      },
    },
    {
      accessorKey: "amount",
      header: "Amount",

      cell: ({ row }) => {
        const amount = row?.original?.amount;
        return (
          <>
            <p>{formatter.format(amount)}</p>
            <ContextMenuExpense data={row.original} />
          </>
        );
      },
    },
  ];
};
