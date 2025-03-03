import { cn } from "@/lib/utils";
import React from "react";

type TProps = {} & React.HTMLAttributes<HTMLDivElement>;

export const NoDataFound = ({ ...props }: TProps) => {
  return (
    <div
      className={cn(
        "pointer-events-none flex flex-col items-center justify-center text-muted-foreground space-y-1",
        props.className,
      )}
    >
      {/* <Inbox className="size-12" /> */}
      <p className="text-sm font-semibold">Không có giao dịch</p>
      <p className="text-sm">Nhấp vào nút &quot;+&quot; để thêm giao dịch mới.</p>
    </div>
  );
};
