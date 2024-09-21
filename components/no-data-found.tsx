import { DatabaseZap } from "lucide-react";
import React from "react";

export const NoDataFound = () => {
  return (
    <div className="flex flex-col items-center justify-center text-muted-foreground">
      <DatabaseZap className="size-12 sm:size-16" />
      <p className="mt-4 text-sm sm:text-base">Không có dữ liệu</p>
    </div>
  );
};
