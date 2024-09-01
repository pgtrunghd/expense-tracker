"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { formatter } from "@/lib/utils";
import { Delete, Ellipsis, Eraser, FilePenLine } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import CreateExpense from "./_components/create-expense";
import { Dialog } from "@/components/ui/dialog";
import DeleteExpense from "./_components/delete-expense";

export const getColumns = (): ColumnDef<any>[] => {
  return [
    {
      accessorKey: "createDate",
      header: "Date",
      cell: ({ row }) => {
        const date = row?.original?.createDate;
        return <p>{new Date(date).toLocaleDateString()}</p>;
      },
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => {
        const category = row?.original?.category;

        return <Badge>{category?.name}</Badge>;
      },
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => {
        const description = row?.original?.description;
        return <p className="line-clamp-1">{description}</p>;
      },
    },
    {
      accessorKey: "amount",
      header: "Amount",

      cell: ({ row }) => {
        const amount = row?.original?.amount;
        return <p>{formatter.format(amount)}</p>;
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
