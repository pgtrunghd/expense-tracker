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
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useGetCategoriesQuery } from "@/features/category.slice";
import { useGetRecentActivityQuery } from "@/features/expense.slice";
import {
  useCreateIncomeMutation,
  useUpdateIncomeMutation,
} from "@/features/income.slice";
import { formatDate, notification } from "@/lib/constants";
import { cn, formatToNumber, formatWithDots } from "@/lib/utils";
import { formCreateIncomeSchema } from "@/lib/validate";
import { RootState } from "@/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, Loader2 } from "lucide-react";
import React, { memo, useEffect, useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { z } from "zod";
import CategoryIcon from "./category-icon";
import { CategoryList } from "@/app/(private)/category/_components/category-list";

interface IProps {
  income?: Income | RecentActivityData;
  callback?: (open: boolean) => void;
  trigger: React.ReactNode;
}

const CreateIncome = ({ income, callback, trigger }: IProps) => {
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof formCreateIncomeSchema>>({
    resolver: zodResolver(formCreateIncomeSchema),
  });

  useEffect(() => {
    if (income) {
      form.reset({
        description: income?.description,
        amount: income?.amount.toString(),
        createDate: new Date(income?.createDate),
        categoryId: {
          id: income?.category?.id,
          name: income?.category?.name,
        },
      });
    }
  }, [income]);

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
      <CreateForm income={income} setOpen={setOpen} form={form} />
    </ResponsiveDialog>
  );
};

export const CreateIncomeMemo = memo(CreateIncome);

export const CreateForm = ({
  income,
  setOpen,
  form,
}: {
  income?: Income | RecentActivityData;
  setOpen: (open: boolean) => void;
  form: UseFormReturn<z.infer<typeof formCreateIncomeSchema>>;
}) => {
  const [openCalendar, setOpenCalendar] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);

  const { data } = useGetCategoriesQuery();
  const [createIncome, { isLoading: isCreating }] = useCreateIncomeMutation();
  const [updateIncome, { isLoading: isUpdating }] = useUpdateIncomeMutation();

  const onSubmit = async (data: z.infer<typeof formCreateIncomeSchema>) => {
    try {
      if (income) {
        await updateIncome({
          ...data,
          amount: formatToNumber(data.amount),
          id: income.id,
        }).unwrap();
        toast.success(notification.UPDATE_SUCCESS);
      } else {
        await createIncome({
          ...data,
          amount: formatToNumber(data.amount),
        }).unwrap();
        toast.success(notification.CREATE_SUCCESS);
      }
      setOpen(false);
      form.reset();
    } catch (error: any) {
      toast.error(error?.data.message);
    }
  };

  return (
    <Form {...form}>
      <form
        className="space-y-3 sm:space-y-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          name="amount"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Số tiền</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  value={formatWithDots(field.value)}
                  onChange={(e) => {
                    field.onChange(formatWithDots(e.target.value));
                  }}
                  placeholder="Nhập số tiền"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="createDate"
          control={form.control}
          defaultValue={new Date()}
          render={({ field }) => (
            <FormItem>
              {/* <FormLabel>Ngày</FormLabel> */}
              <ResponsiveDialog
                title="Chọn ngày"
                open={openCalendar}
                setOpen={setOpenCalendar}
                trigger={
                  <FormControl>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-between font-normal",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      <span className="flex items-center gap-2">
                        <CategoryIcon icon="CalendarDays" color="red" />
                        Ngày
                      </span>
                      {/* <CalendarIcon className="size-4 opacity-50" /> */}
                      {field.value ? (
                        format(field.value, formatDate)
                      ) : (
                        <span>Chọn ngày</span>
                      )}
                    </Button>
                  </FormControl>
                }
              >
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={(date) => {
                    field.onChange(date);
                    setOpenCalendar(false);
                  }}
                  disabled={(date) => date > new Date()}
                />
              </ResponsiveDialog>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="categoryId"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              {/* <FormLabel>Danh mục</FormLabel> */}
              <FormControl>
                {/* <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={data?.length === 0}
                >
                  <SelectTrigger>
                    <SelectValue
                      placeholder={
                        data?.length ? "Chọn category" : "Không có category"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {data?.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select> */}
                <ResponsiveDialog
                  title="Danh mục"
                  trigger={
                    <Button
                      variant="outline"
                      className={cn("w-full justify-between font-normal")}
                    >
                      <span className="flex items-center gap-2">
                        <CategoryIcon icon="Tag" color="red" />
                        Danh mục
                      </span>
                      {field.value ? field.value.name : "Không có"}
                    </Button>
                  }
                  open={openCategory}
                  setOpen={(open: boolean) => {
                    setOpenCategory(open);
                  }}
                >
                  <CategoryList
                    selected={field.value}
                    inTransaction
                    onSelect={(value) => {
                      field.onChange(value);
                      setOpenCategory(false);
                    }}
                  />
                </ResponsiveDialog>
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
              <FormLabel>Ghi chú</FormLabel>
              <FormControl>
                <Textarea placeholder="Nhập ghi chú" {...field} rows={3} />
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
