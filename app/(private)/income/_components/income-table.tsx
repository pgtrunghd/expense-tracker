"use client";

import React, { useMemo } from "react";
import { ToolbarActions } from "./toolbar-actions";
import { useFilter } from "@/hooks/useFilter";
import { useGetIncomeQuery } from "@/features/income.slice";
import { desktopColumns } from "./columns";
import DataTable from "@/components/data-table";
import { PaginationWithLinks } from "@/components/ui/pagination-with-links";
import MyDrawer from "./my-drawer";

export const IncomeTable = () => {
  const { filter, setPage } = useFilter();

  const { data: incomeData, isLoading, isFetching } = useGetIncomeQuery(filter);
  const columns = useMemo(desktopColumns, []);

  return (
    <>
      <ToolbarActions />
      {/* <MyDrawer /> */}
      <DataTable
        data={incomeData?.data}
        loading={isLoading || isFetching}
        columns={columns}
      />

      {incomeData?.meta && (
        <PaginationWithLinks
          page={incomeData?.meta?.page}
          pageSize={incomeData?.meta?.take}
          totalCount={incomeData?.meta?.itemCount}
          onChange={setPage}
        />
      )}
    </>
  );
};
