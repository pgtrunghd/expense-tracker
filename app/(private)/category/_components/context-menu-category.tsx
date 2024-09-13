import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Eraser, FilePenLine } from "lucide-react";
import React, { useState } from "react";
import { Dialog } from "@/components/ui/dialog";
import CreateCategory from "./create-category";
import DeleteCategory from "./delete-category";

interface IProps {
  data: Category;
}

export function ContextMenuCategory({ data }: IProps) {
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

      <Dialog open={modalEdit} onOpenChange={setModalEdit}>
        <CreateCategory
          onClose={() => setModalEdit(false)}
          open={modalEdit}
          category={data}
        />
      </Dialog>
      <Dialog open={modalDelete} onOpenChange={setModalDelete}>
        <DeleteCategory onClose={() => setModalDelete(false)} category={data} />
      </Dialog>
    </ContextMenu>
  );
}
