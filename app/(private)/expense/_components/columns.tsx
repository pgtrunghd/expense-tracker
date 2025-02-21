"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatter } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { Ellipsis, Eraser, FilePenLine } from "lucide-react";
import { useRef, useState } from "react";

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

        const handleDialogItemOpenChange = (open: boolean) => {
          if (open === false) {
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
                // hidden={hasOpenDialog}
                onCloseAutoFocus={(event) => {
                  event.preventDefault();
                }}
              >
                <DropdownMenuGroup>
                  <CreateExpense
                    callback={handleDialogItemOpenChange}
                    expense={row.original}
                    trigger={
                      <DropdownMenuItem
                        onSelect={(event) => {
                          event.preventDefault();
                        }}
                      >
                        <FilePenLine className="size-4" />
                        <span>Sửa</span>
                      </DropdownMenuItem>
                    }
                  />

                  <DeleteExpense
                    callback={handleDialogItemOpenChange}
                    expense={row.original}
                    trigger={
                      <DropdownMenuItem
                        onSelect={(event) => {
                          event.preventDefault();
                        }}
                      >
                        <Eraser className="size-4" />
                        <span>Xóa</span>
                      </DropdownMenuItem>
                    }
                  />
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];
};

// export const mobileColumns = (): ColumnDef<any>[] => {
//   return [
//     {
//       accessorKey: "createDate",
//       header: "Date",
//       cell: ({ row }) => {
//         const date = row?.original?.createDate;
//         return (
//           <>
//             <p>{new Date(date).toLocaleDateString()}</p>
//             <ContextMenuExpense data={row.original} />
//           </>
//         );
//       },
//     },
//     {
//       accessorKey: "category",
//       header: "Category",
//       cell: ({ row }) => {
//         const category = row?.original?.category;

//         return (
//           <>
//             <Badge style={{ backgroundColor: category?.color }}>
//               {category?.name}
//             </Badge>
//             <ContextMenuExpense data={row.original} />
//           </>
//         );
//       },
//     },
//     {
//       accessorKey: "description",
//       header: "Description",
//       cell: ({ row }) => {
//         const description = row?.original?.description;
//         return (
//           <>
//             <p className="line-clamp-1">{description}</p>
//             <ContextMenuExpense data={row.original} />
//           </>
//         );
//       },
//     },
//     {
//       accessorKey: "amount",
//       header: "Amount",

//       cell: ({ row }) => {
//         const amount = row?.original?.amount;
//         return (
//           <>
//             <p>{formatter.format(amount)}</p>
//             <ContextMenuExpense data={row.original} />
//           </>
//         );
//       },
//     },
//   ];
// };
