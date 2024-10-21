"use client";

import { ResponsiveDialog } from "@/components/responsive-dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
import { notification } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { formCreateIncomeSchema } from "@/lib/validate";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, Loader2 } from "lucide-react";
import React, { memo, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface IProps {
  income?: Income;
  callback?: (open: boolean) => void;
  trigger: React.ReactNode;
}

const CreateIncome = ({ income, callback, trigger }: IProps) => {
  const [open, setOpen] = useState(false);

  return (
    <ResponsiveDialog
      title={income ? "Cập nhật thu nhập" : "Tạo thu nhập"}
      trigger={trigger}
      open={open}
      setOpen={(open: boolean) => {
        setOpen(open);
        callback && callback(open);
      }}
    >
      <CreateForm income={income} setOpen={setOpen} />
    </ResponsiveDialog>
  );
};

export const CreateIncomeMemo = memo(CreateIncome);

const CreateForm = ({
  income,
  setOpen,
}: {
  income?: Income;
  setOpen: (open: boolean) => void;
}) => {
  const form = useForm<z.infer<typeof formCreateIncomeSchema>>({
    resolver: zodResolver(formCreateIncomeSchema),
  });
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
        createDate: new Date(income?.createDate),
      });
    }
  }, [income]);

  return (
    <Form {...form}>
      <form className="space-y-3 sm:space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
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

        <Button
          size="sm"
          type="submit"
          disabled={isCreating || isUpdating}
          className="w-full"
        >
          {isCreating || isUpdating ? (
            <Loader2 className="mr-2 size-4 animate-spin" />
          ) : null}
          {income ? "Cập nhật" : "Tạo"}
        </Button>
      </form>
    </Form>
  );
};
