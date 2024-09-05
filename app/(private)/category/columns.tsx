"use client";

import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { Ellipsis, Eraser, FilePenLine } from "lucide-react";
import { useState } from "react";
import CreateCategory from "./_components/create-category";
import DeleteCategory from "./_components/delete-category";

export const getColumns = (): ColumnDef<any>[] => {
  return [
    {
      accessorKey: "name",
      header: "Category",
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
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
                  <span>Edit</span>
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setModalDelete(true)}>
                  <Eraser className="mr-2 size-4" />
                  <span>Delete</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Dialog open={modalEdit} onOpenChange={setModalEdit}>
              <CreateCategory
                onClose={() => setModalEdit(false)}
                open={modalEdit}
                category={row.original}
              />
            </Dialog>
            <Dialog open={modalDelete} onOpenChange={setModalDelete}>
              <DeleteCategory
                onClose={() => setModalDelete(false)}
                category={row.original}
              />
            </Dialog>
          </div>
        );
      },
    },
  ];
};
