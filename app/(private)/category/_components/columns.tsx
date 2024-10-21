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
import CreateCategory from "./create-category";
import DeleteCategory from "./delete-category";

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
          </>
        );
      },
    },
    {
      id: "actions",
      enableHiding: false,
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
                <CreateCategory
                  callback={handleDialogOpenChange}
                  category={row.original}
                  trigger={
                    <DropdownMenuItem
                      onSelect={(event) => event.preventDefault()}
                    >
                      <FilePenLine className="mr-2 size-4" />
                      <span>Sửa</span>
                    </DropdownMenuItem>
                  }
                />
                <DeleteCategory
                  callback={handleDialogOpenChange}
                  category={row.original}
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
