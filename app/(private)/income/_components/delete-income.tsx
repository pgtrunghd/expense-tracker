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
import { useDeleteExpenseMutation } from "@/features/expense.slice";
import { useDeleteIncomeMutation } from "@/features/income.slice";
import { useWindowSize } from "@/hooks/useWindowSize";
import { notification } from "@/lib/constants";
import { Loader2 } from "lucide-react";
import React, { memo } from "react";
import { toast } from "sonner";

interface IProps {
  income: Income;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DeleteIncome = ({ income, open, setOpen }: IProps) => {
  const [deleteExpense, { isLoading: isDeleting }] = useDeleteIncomeMutation();
  const { width } = useWindowSize();

  const onDelete = async () => {
    try {
      await deleteExpense(income.id).unwrap();
      toast.success(notification.DELETE_SUCCESS);
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
              Không thể hoàn tác hành động này. Bạn có muốn xóa thu nhập của
              bạn.
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Button
              variant="destructive"
              onClick={onDelete}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <Loader2 className="mr-2 size-4 animate-spin" />
              ) : null}
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
            Không thể hoàn tác hành động này. Bạn có muốn xóa thu nhập của bạn.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="destructive"
            onClick={onDelete}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <Loader2 className="mr-2 size-4 animate-spin" />
            ) : null}
            Xóa
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default memo(DeleteIncome);
