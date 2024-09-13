"use client";

import { Badge } from "@/components/ui/badge";
import { formatter } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Ellipsis, Eraser, FilePenLine } from "lucide-react";
import { Dialog } from "@radix-ui/react-dialog";
import { useState } from "react";
import { ContextMenuExpense } from "./context-menu-expense";
import CreateExpense from "./create-expense";
import DeleteExpense from "./delete-expense";

export const getColumns = (): ColumnDef<any>[] => {
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

    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const [modalEdit, setModalEdit] = useState(false);
        const [modalDelete, setModalDelete] = useState(false);

        return (
          <>
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Ellipsis className="size-4" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end">
                <DropdownMenuItem onSelect={() => setModalEdit(true)}>
                  <FilePenLine className="mr-2 size-4" />
                  <span>Edit</span>
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setModalDelete(true)}>
                  <Eraser className="mr-2 size-4" />
                  <span>Delete</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Dialog open={modalEdit} onOpenChange={setModalEdit}>
              <CreateExpense
                onClose={() => setModalEdit(false)}
                open={modalEdit}
                expense={row.original}
              />
            </Dialog>
            <Dialog open={modalDelete} onOpenChange={setModalDelete}>
              <DeleteExpense
                onClose={() => setModalDelete(false)}
                expense={row.original}
              />
            </Dialog>
          </>
        );
      },
    },
  ];
};
