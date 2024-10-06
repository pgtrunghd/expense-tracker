"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { DatabaseZap } from "lucide-react";
import React, { useMemo } from "react";
import { Skeleton } from "./ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { NoDataFound } from "./no-data-found";
import { getCommonPinningStyles } from "@/lib/data-table";

interface DataTableProps<TData> extends React.HTMLAttributes<HTMLDivElement> {
  data: any;
  loading: boolean;
  columns: ColumnDef<TData>[];
}

function DataTable<TData>({
  data,
  loading,
  columns,
  ...props
}: DataTableProps<TData>) {
  const tableData = useMemo(
    () => (loading ? Array(5).fill({}) : data),
    [loading, data],
  );

  const tableColumns = useMemo(
    () =>
      loading
        ? columns.map((column) => ({
            ...column,
            cell: () => <Skeleton className="h-8 w-full" />,
          }))
        : columns,
    [loading],
  );

  const table = useReactTable({
    data: tableData,
    columns: tableColumns,
    getCoreRowModel: getCoreRowModel(),
    initialState: {
      columnPinning: { right: ["actions"] },
    },
  });

  return (
    <div className="" {...props}>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    style={{
                      ...getCommonPinningStyles({ column: header.column }),
                    }}
                    className="bg-muted"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    style={{
                      ...getCommonPinningStyles({ column: cell.column }),
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={table.getAllColumns().length}>
                <NoDataFound />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default DataTable;
