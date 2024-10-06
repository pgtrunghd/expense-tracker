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
import CreateCategory from "./create-category";
import DeleteCategory from "./delete-category";
import { ContextMenuCategory } from "./context-menu-category";

export const getColumns = (): ColumnDef<any>[] => {
  return [
    {
      accessorKey: "name",
      header: "Category",
      cell: ({ row }) => {
        const name = row?.original?.name;
        return (
          <>
            <p>{name}</p>
            <ContextMenuCategory data={row.original} />
          </>
        );
      },
    },
    {
      accessorKey: "color",
      header: "Color",
      cell: ({ row }) => {
        const color = row?.original?.color;
        return (
          <>
            <div className="flex items-center gap-2">
              <span
                style={{ backgroundColor: color }}
                className="block size-4 rounded-sm"
              ></span>
              <p>{color}</p>
            </div>
            <ContextMenuCategory data={row.original} />
          </>
        );
      },
    },
    {
      id: "actions",
      enableHiding: false,
      size: 40,
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
                  <span>Sửa</span>
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setModalDelete(true)}>
                  <Eraser className="mr-2 size-4" />
                  <span>Xóa</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <CreateCategory
              open={modalEdit}
              setOpen={setModalEdit}
              category={row.original}
            />

            <DeleteCategory
              open={modalDelete}
              setOpen={setModalDelete}
              category={row.original}
            />
          </div>
        );
      },
    },
  ];
};
