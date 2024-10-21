"use client";

import { ResponsiveDialog } from "@/components/responsive-dialog";
import { Button } from "@/components/ui/button";
import { useDeleteCategoryMutation } from "@/features/category.slice";
import { notification } from "@/lib/constants";
import { Loader2 } from "lucide-react";
import { memo, useState } from "react";
import { toast } from "sonner";

interface IProps {
  category: Category;
  trigger: React.ReactNode;
  callback?: (open: boolean) => void;
}

const DeleteCategory = ({ category, trigger, callback }: IProps) => {
  const [open, setOpen] = useState(false);
  const [deleteCategory, { isLoading: isDeleting }] =
    useDeleteCategoryMutation();

  const onDelete = async () => {
    try {
      await deleteCategory(category.id).unwrap();
      toast.success(notification.DELETE_SUCCESS);
      setOpen(false);
    } catch (error: any) {
      console.log(error);
      toast.error(error?.data.message);
    }
  };

  return (
    <ResponsiveDialog
      title="Bạn có chắc chắn không?"
      description="Không thể hoàn tác hành động này. Bạn có muốn xóa category này."
      trigger={trigger}
      open={open}
      setOpen={(open: boolean) => {
        setOpen(open);
        callback && callback(open);
      }}
    >
      <Button
        variant="destructive"
        onClick={onDelete}
        disabled={isDeleting}
        className="mt-2 w-full"
      >
        {isDeleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Xóa
      </Button>
    </ResponsiveDialog>
  );
};

export default memo(DeleteCategory);
