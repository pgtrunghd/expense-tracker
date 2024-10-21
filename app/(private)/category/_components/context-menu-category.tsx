import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Eraser, FilePenLine } from "lucide-react";
import { useState } from "react";
import CreateCategory from "./create-category";
import DeleteCategory from "./delete-category";

interface IProps {
  data: Category;
}

export function ContextMenuCategory({ data }: IProps) {
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
        <CreateCategory
          callback={handleDialogItemOpenChange}
          category={data}
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

        <DeleteCategory
          callback={handleDialogItemOpenChange}
          category={data}
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
