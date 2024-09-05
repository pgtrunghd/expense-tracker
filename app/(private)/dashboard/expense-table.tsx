"use client";

import DataTable from "@/components/data-table";
import { PaginationWithLinks } from "@/components/ui/pagination-with-links";
import { useGetExpensesQuery } from "@/features/expense.slice";
import { useMemo, useState } from "react";
import { getColumns } from "./columns";
import ToolbarActions from "./toolbar-actions";

export const ExpenseTable = () => {
  const [page, setPage] = useState(1);

  const {
    data: expenseData,
    isLoading,
    error,
    isFetching,
  } = useGetExpensesQuery(page);
  const columns = useMemo(() => getColumns(), []);

  return (
    <div>
      <ToolbarActions />
      <DataTable
        data={expenseData?.data}
        loading={isLoading || isFetching}
        columns={columns}
      />

      <PaginationWithLinks
        page={expenseData?.meta?.page}
        pageSize={expenseData?.meta?.take}
        totalCount={expenseData?.meta?.itemCount}
        onChange={(page) => {
          setPage(page);
        }}
      />
    </div>
  );
};
