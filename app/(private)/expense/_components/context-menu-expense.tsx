import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Eraser, FilePenLine } from "lucide-react";
import { useState } from "react";
import CreateExpense from "./create-expense";
import DeleteExpense from "./delete-expense";

interface IProps {
  data: Expense;
}

export function ContextMenuExpense({ data }: IProps) {
  const [contextOpen, setContextOpen] = useState(false);

  const handleDialogItemOpenChange = (open: boolean) => {
    if (open === false) {
      setContextOpen(false);
    }
  };

  return (
    <ContextMenu onOpenChange={setContextOpen}>
      <ContextMenuTrigger asChild>
        <div className="absolute inset-0 md:hidden"></div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <CreateExpense
          callback={handleDialogItemOpenChange}
          expense={data}
          trigger={
            <ContextMenuItem
              onSelect={(event) => {
                event.preventDefault();
              }}
            >
              <FilePenLine className="mr-2 size-4" />
              <span>Sửa</span>
            </ContextMenuItem>
          }
        />

        <DeleteExpense
          callback={handleDialogItemOpenChange}
          expense={data}
          trigger={
            <ContextMenuItem
              onSelect={(event) => {
                event.preventDefault();
              }}
            >
              <Eraser className="mr-2 size-4" />
              <span>Xóa</span>
            </ContextMenuItem>
          }
        />
      </ContextMenuContent>
    </ContextMenu>
  );
}
