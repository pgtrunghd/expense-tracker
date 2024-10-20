import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Eraser, FilePenLine } from "lucide-react";
import React, { useState } from "react";
import CreateExpense from "./create-expense";
import { Dialog } from "@/components/ui/dialog";
import DeleteExpense from "./delete-expense";

interface IProps {
  data: Expense;
}

export function ContextMenuExpense({ data }: IProps) {
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <div className="absolute inset-0 md:hidden"></div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem onSelect={() => setModalEdit(true)}>
          <FilePenLine className="mr-2 size-4" />
          <span>Sửa</span>
        </ContextMenuItem>
        <ContextMenuItem onSelect={() => setModalDelete(true)}>
          <Eraser className="mr-2 size-4" />
          <span>Xóa</span>
        </ContextMenuItem>
      </ContextMenuContent>

      {/* <CreateExpense open={modalEdit} expense={data} setOpen={setModalEdit} /> */}
      <DeleteExpense
        open={modalDelete}
        setOpen={setModalDelete}
        expense={data}
      />
    </ContextMenu>
  );
}
