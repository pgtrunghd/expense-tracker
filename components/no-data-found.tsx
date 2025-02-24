import { cn } from "@/lib/utils";
import { Inbox } from "lucide-react";
import React from "react";

type TProps = {} & React.HTMLAttributes<HTMLDivElement>;

export const NoDataFound = ({ ...props }: TProps) => {
  return (
    <div
      className={cn(
        "pointer-events-none flex flex-col items-center justify-center text-muted-foreground",
        props.className,
      )}
    >
      <Inbox className="size-12" />
      <p className="mt-1 text-sm sm:text-base">Không có dữ liệu</p>
    </div>
  );
};
