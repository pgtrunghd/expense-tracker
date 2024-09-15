"use client";

import DataTable from "@/components/data-table";
import { useGetCategoriesQuery } from "@/features/category.slice";
import { useMemo } from "react";
import { getColumns } from "./columns";
import ToolbarActions from "./toolbar-actions";

export const CategoryTable = () => {
  const { data: categoryData, isLoading, error } = useGetCategoriesQuery();
  const columns = useMemo(() => getColumns(), []);

  return (
    <div>
      <ToolbarActions />
      <DataTable data={categoryData} loading={isLoading} columns={columns} />
    </div>
  );
};
