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
import {
  useCreateExpenseMutation,
  useUpdateExpenseMutation,
} from "@/features/expense.slice";
import { formatDate, notification } from "@/lib/constants";
import { cn, formatToNumber, formatWithDots } from "@/lib/utils";
import { formCreateExpenseSchema } from "@/lib/validate";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, Loader2 } from "lucide-react";
import { memo, useEffect, useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import CategoryIcon from "./category-icon";
import { CategoryList } from "@/app/(private)/category/_components/category-list";

interface IProps {
  expense?: Expense | RecentActivityData;
  trigger?: React.ReactNode;
  callback?: (open: boolean) => void;
}

const CreateExpense = ({ expense, trigger, callback }: IProps) => {
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof formCreateExpenseSchema>>({
    resolver: zodResolver(formCreateExpenseSchema),
  });

  useEffect(() => {
    if (expense) {
      form.reset({
        description: expense?.description,
        amount: expense?.amount?.toString(),
        categoryId: {
          id: expense?.category?.id,
          name: expense?.category?.name,
        },
        createDate: new Date(expense?.createDate),
      });
    }
  }, [expense]);

  return (
    <ResponsiveDialog
      title={expense ? "Cập nhật chi tiêu" : "Tạo chi tiêu"}
      trigger={trigger}
      open={open}
      // accept={<Button size="drawer">Tạo</Button>}
      setOpen={(open: boolean) => {
        setOpen(open);
        callback && callback(open);
      }}
    >
      <CreateForm expense={expense} setOpen={setOpen} form={form} />
    </ResponsiveDialog>
  );
};

export const CreateExpenseMemo = memo(CreateExpense);

export const CreateForm = ({
  expense,
  setOpen,
  form,
}: {
  expense?: Expense | RecentActivityData;
  setOpen: (open: boolean) => void;
  form: UseFormReturn<z.infer<typeof formCreateExpenseSchema>>;
}) => {
  const [openCalendar, setOpenCalendar] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);
  const [createExpense, { isLoading: isCreating }] = useCreateExpenseMutation();
  const [updateExpense, { isLoading: isUpdating }] = useUpdateExpenseMutation();

  const onSubmit = async (data: z.infer<typeof formCreateExpenseSchema>) => {
    try {
      if (expense) {
        await updateExpense({
          ...data,
          amount: formatToNumber(data.amount),
          id: expense.id,
          categoryId: data.categoryId.id,
        }).unwrap();
        toast.success(notification.UPDATE_SUCCESS);
      } else {
        await createExpense({
          ...data,
          amount: formatToNumber(data.amount),
          categoryId: data.categoryId.id,
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
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-3 sm:space-y-4"
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
          {expense ? "Cập nhật" : "Tạo"}
        </Button>
      </form>
    </Form>
  );
};
