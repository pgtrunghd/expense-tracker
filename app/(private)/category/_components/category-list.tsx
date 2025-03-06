"use client";

import { useGetCategoriesQuery } from "@/features/category.slice";
import { CategoryItem } from "./category-item";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus } from "lucide-react";
import CreateCategory from "./create-category";

interface ICategoryListProps {
  selected?: any;
  onSelect?: (value: any) => void;
  inTransaction?: boolean;
}

export const CategoryList = ({
  selected,
  onSelect,
  inTransaction,
}: ICategoryListProps) => {
  const { data: categoryData, isLoading, error } = useGetCategoriesQuery();

  if (isLoading) {
    return (
      <div className="space-y-6">
        {Array.from({ length: 5 }).map((item, index) => (
          <div className="space-y-2" key={index}>
            <Skeleton className="h-12 w-full" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <section>
      <div className="rounded-xl border bg-background shadow">
        {categoryData?.map((category) => (
          <CategoryItem
            key={category.id}
            category={category}
            selected={selected}
            onSelect={onSelect}
            inTransaction={inTransaction}
          />
        ))}
        <CreateCategory
          trigger={
            <div className="flex items-center justify-between px-4 py-3 hover:bg-muted hover:transition first:hover:rounded-t-[11px] last:hover:rounded-b-[11px]">
              <p className="text-muted-foreground">Danh mục mới</p>
              <Plus className="size-4 text-muted-foreground" />
            </div>
          }
        />
      </div>
    </section>
  );
};
