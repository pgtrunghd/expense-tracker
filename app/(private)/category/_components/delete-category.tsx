"use client";

import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDeleteCategoryMutation } from "@/features/category.slice";
import { Loader2 } from "lucide-react";
import { memo } from "react";
import { toast } from "sonner";

interface IProps {
  onClose: () => void;
  category: Category;
}

const DeleteCategory = ({ onClose, category }: IProps) => {
  const [deleteCategory, { isLoading: isDeleting }] =
    useDeleteCategoryMutation();

  const onDelete = async () => {
    try {
      await deleteCategory(category.id).unwrap();
      toast.success("Category deleted successfully");
      onClose();
    } catch (error: any) {
      console.log(error);
      toast.error(error?.data.message);
    }
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Are you absolutely sure?</DialogTitle>
        <DialogDescription>
          This action cannot be undone. This will permanently delete your
          expense.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button variant="destructive" onClick={onDelete} disabled={isDeleting}>
          {isDeleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Delete
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default memo(DeleteCategory);
