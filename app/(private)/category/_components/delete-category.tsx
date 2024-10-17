"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useDeleteCategoryMutation } from "@/features/category.slice";
import { useWindowSize } from "@/hooks/useWindowSize";
import { Loader2 } from "lucide-react";
import { memo } from "react";
import { toast } from "sonner";

interface IProps {
  category: Category;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DeleteCategory = ({ category, open, setOpen }: IProps) => {
  const [deleteCategory, { isLoading: isDeleting }] =
    useDeleteCategoryMutation();
  const { width } = useWindowSize();

  const onDelete = async () => {
    try {
      await deleteCategory(category.id).unwrap();
      toast.success("Category deleted successfully");
      setOpen(false);
    } catch (error: any) {
      console.log(error);
      toast.error(error?.data.message);
    }
  };

  if (width && width < 768) {
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Bạn có chắc chắn không?</DrawerTitle>
            <DrawerDescription>
              Không thể hoàn tác hành động này. Bạn có muốn xóa category này.
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Button
              variant="destructive"
              onClick={onDelete}
              disabled={isDeleting}
            >
              {isDeleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Xóa
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Bạn có chắc chắn không?</DialogTitle>
          <DialogDescription>
            Không thể hoàn tác hành động này. Bạn có muốn xóa category này.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="destructive"
            onClick={onDelete}
            disabled={isDeleting}
          >
            {isDeleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Xóa
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default memo(DeleteCategory);
