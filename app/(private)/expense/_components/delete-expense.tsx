"use client";

import { ResponsiveDialog } from "@/components/responsive-dialog";
import { Button } from "@/components/ui/button";
import { useDeleteExpenseMutation } from "@/features/expense.slice";
import { notification } from "@/lib/constants";
import { Loader2 } from "lucide-react";
import React, { memo, useState } from "react";
import { toast } from "sonner";

interface IProps {
  expense: Expense;
  trigger: React.ReactNode;
  callback?: (open: boolean) => void;
}

const DeleteExpense = ({ expense, trigger, callback }: IProps) => {
  const [open, setOpen] = useState(false);
  const [deleteExpense, { isLoading: isDeleting }] = useDeleteExpenseMutation();

  const onDelete = async () => {
    try {
      await deleteExpense(expense.id).unwrap();
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
      description="Không thể hoàn tác hành động này. Bạn có muốn xóa chi tiêu của bạn."
      trigger={trigger}
      open={open}
      setOpen={(open: boolean) => {
        setOpen(open);
        callback && callback(open);
      }}
    >
      <Button
        className="mt-2 w-full"
        variant="destructive"
        onClick={onDelete}
        disabled={isDeleting}
      >
        {isDeleting ? <Loader2 className="mr-2 size-4 animate-spin" /> : null}
        Xóa
      </Button>
    </ResponsiveDialog>
  );
};

export default memo(DeleteExpense);
