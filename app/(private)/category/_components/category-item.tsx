import CategoryIcon from "@/components/category-icon";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Check,
  ChevronRight,
  Edit,
  EllipsisVertical,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import CreateCategory from "./create-category";
import DeleteCategory from "./delete-category";

interface ICategoryItem {
  category: Category;
  selected?: any;
  onSelect?: (value: any) => void;
  inTransaction?: boolean;
}

export const CategoryItem = ({
  category,
  selected,
  onSelect,
  inTransaction,
}: ICategoryItem) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleDialogOpenChange = (open: boolean) => {
    if (!open) {
      setDropdownOpen(false);
    }
  };

  return (
    <div
      className="flex items-center justify-between border-b px-4 py-3 last:border-none hover:bg-muted hover:transition first:hover:rounded-t-[11px] last:hover:rounded-b-[11px]"
      onClick={() =>
        onSelect
          ? onSelect({
              id: category.id,
              name: category.name,
            })
          : {
              // implement this later
            }
      }
    >
      <span className="flex items-center gap-2">
        <CategoryIcon
          color={category?.color as string}
          icon={category?.icon as string}
          containerClass="size-7"
          iconClass="size-4"
        />
        <p>{category?.name}</p>
      </span>
      <span className="flex items-center gap-1">
        {inTransaction ? (
          selected?.id === category.id && <Check className="size-4" />
        ) : (
          <>
            <span className="text-sm text-muted-foreground">
              {category?.expenses?.length + category?.incomes?.length}
            </span>
            <ChevronRight className="size-5 text-muted-foreground" />
          </>
        )}

        <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
          <DropdownMenuTrigger>
            <EllipsisVertical className="size-4 text-muted-foreground" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuGroup>
              <CreateCategory
                callback={handleDialogOpenChange}
                category={category}
                trigger={
                  <DropdownMenuItem
                    onSelect={(event) => {
                      event.preventDefault();
                    }}
                  >
                    <Edit />
                    Sửa
                  </DropdownMenuItem>
                }
              />

              <DeleteCategory
                callback={handleDialogOpenChange}
                category={category}
                trigger={
                  <DropdownMenuItem
                    onSelect={(event) => {
                      event.preventDefault();
                    }}
                  >
                    <Trash2 />
                    Xóa
                  </DropdownMenuItem>
                }
              />
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </span>
    </div>
  );
};
