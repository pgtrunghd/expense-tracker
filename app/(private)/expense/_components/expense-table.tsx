"use client";

import DataTable from "@/components/data-table";
import { PaginationWithLinks } from "@/components/ui/pagination-with-links";
import { useGetExpensesQuery } from "@/features/expense.slice";
import { useFilter } from "@/hooks/useFilter";
import { useMemo } from "react";
import { desktopColumns } from "./columns";
import ToolbarActions from "./toolbar-actions";

export const ExpenseTable = () => {
  const { filter, setPage } = useFilter();

  const {
    data: expenseData,
    isLoading,
    error,
    isFetching,
  } = useGetExpensesQuery(filter);
  const columns = useMemo(desktopColumns, []);

  return (
    <div>
      <ToolbarActions />
      <DataTable
        data={expenseData?.data}
        loading={isLoading || isFetching}
        columns={columns}
      />

      {expenseData?.meta && (
        <PaginationWithLinks
          page={expenseData?.meta?.page}
          pageSize={expenseData?.meta?.take}
          totalCount={expenseData?.meta?.itemCount}
          onChange={setPage}
        />
      )}
    </div>
  );
};
