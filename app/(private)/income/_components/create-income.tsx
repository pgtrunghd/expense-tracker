"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  useCreateIncomeMutation,
  useUpdateIncomeMutation,
} from "@/features/income.slice";
import { useWindowSize } from "@/hooks/useWindowSize";
import { notification } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { formCreateIncomeSchema } from "@/lib/validate";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, Loader2 } from "lucide-react";
import React, { memo, useEffect } from "react";
import { FormProps, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface IProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  income?: Income;
}

const CreateIncome = ({ open, setOpen, income }: IProps) => {
  const form = useForm<z.infer<typeof formCreateIncomeSchema>>({
    resolver: zodResolver(formCreateIncomeSchema),
  });
  const { width } = useWindowSize();
  const [createIncome, { isLoading: isCreating }] = useCreateIncomeMutation();
  const [updateIncome, { isLoading: isUpdating }] = useUpdateIncomeMutation();

  const onSubmit = async (data: z.infer<typeof formCreateIncomeSchema>) => {
    try {
      if (income) {
        await updateIncome({
          ...data,
          amount: Number(data.amount),
          id: income.id,
        }).unwrap();
        toast.success(notification.UPDATE_SUCCESS);
      } else {
        await createIncome({
          ...data,
          amount: Number(data.amount),
        }).unwrap();
        toast.success(notification.CREATE_SUCCESS);
      }
      setOpen(false);
      form.reset();
    } catch (error: any) {
      toast.error(error?.data.message);
    }
  };

  useEffect(() => {
    if (income) {
      form.reset({
        description: income?.description,
        amount: income?.amount.toString(),
        createDate: income?.createDate,
      });
    }
  }, [income]);

  if (width && width < 768) {
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <Form {...form}>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>
                {income ? "Cập nhật incom" : "Tạo income"}
              </DrawerTitle>
            </DrawerHeader>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="space-y-3 px-4 sm:space-y-4">
                <CreateForm form={form} />
              </div>
              <DrawerFooter className="mt-0">
                <Button
                  size="sm"
                  type="submit"
                  disabled={isCreating || isUpdating}
                >
                  {isCreating || isUpdating ? (
                    <Loader2 className="mr-2 size-4 animate-spin" />
                  ) : null}
                  {income ? "Cập nhật" : "Tạo"}
                </Button>
                {/* <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setOpen(false)}
                  type="button"
                >
                  Hủy
                </Button> */}
              </DrawerFooter>
            </form>
          </DrawerContent>
        </Form>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Form {...form}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {income ? "Cập nhật income" : "Tạo income"}
            </DialogTitle>
          </DialogHeader>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <CreateForm form={form} />

            <DialogFooter>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setOpen(false)}
                type="button"
              >
                Hủy
              </Button>
              <Button
                size="sm"
                type="submit"
                disabled={isCreating || isUpdating}
              >
                {isCreating || isUpdating ? (
                  <Loader2 className="mr-2 size-4 animate-spin" />
                ) : null}
                {income ? "Cập nhật" : "Tạo"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Form>
    </Dialog>
  );
};

export const CreateIncomeMemo = memo(CreateIncome);

const CreateForm = ({
  form,
}: {
  form: FormProps<z.infer<typeof formCreateIncomeSchema>>;
}) => {
  return (
    <>
      <FormField
        name="createDate"
        control={form.control}
        defaultValue={new Date()}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Ngày</FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full font-normal",
                      !field.value && "text-muted-foreground",
                    )}
                  >
                    {field.value ? (
                      new Date(field.value).toLocaleDateString()
                    ) : (
                      <span>Chọn ngày</span>
                    )}
                    <CalendarIcon className="ml-auto size-4 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={field.onChange}
                  disabled={(date) => date > new Date()}
                />
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="amount"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Số tiền</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="description"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Mô tả</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
