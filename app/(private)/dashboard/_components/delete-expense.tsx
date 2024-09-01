"use client";

import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDeleteExpenseMutation } from "@/features/expense.slice";
import React, { memo } from "react";
import { toast } from "sonner";

interface IProps {
  onClose: () => void;
  expense: Expense;
}

const DeleteExpense = ({ onClose, expense }: IProps) => {
  const [deleteExpense, { isLoading: isDeleting }] = useDeleteExpenseMutation();

  const onDelete = async () => {
    try {
      await deleteExpense(expense.id).unwrap();
      toast.success("Expense deleted successfully");
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
        <Button variant="destructive" onClick={onDelete}>
          Delete
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default memo(DeleteExpense);
