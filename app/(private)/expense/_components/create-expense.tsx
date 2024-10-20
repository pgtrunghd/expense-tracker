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
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetCategoriesQuery } from "@/features/category.slice";
import {
  useCreateExpenseMutation,
  useUpdateExpenseMutation,
} from "@/features/expense.slice";
import { useWindowSize } from "@/hooks/useWindowSize";
import { notification } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { formCreateExpenseSchema } from "@/lib/validate";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, Loader2 } from "lucide-react";
import { memo, useEffect } from "react";
import { FormProps, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface IProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  expense?: Expense;
}

const CreateExpense = ({ open, expense, setOpen }: IProps) => {
  const form = useForm<z.infer<typeof formCreateExpenseSchema>>({
    resolver: zodResolver(formCreateExpenseSchema),
  });
  const { data } = useGetCategoriesQuery(open, { skip: !open });
  const { width } = useWindowSize();
  const [createExpense, { isLoading: isCreating }] = useCreateExpenseMutation();
  const [updateExpense, { isLoading: isUpdating }] = useUpdateExpenseMutation();

  const onSubmit = async (data: z.infer<typeof formCreateExpenseSchema>) => {
    try {
      if (expense) {
        await updateExpense({
          ...data,
          amount: Number(data.amount),
          id: expense.id,
        }).unwrap();
        toast.success(notification.UPDATE_SUCCESS);
      } else {
        await createExpense({
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
    if (expense) {
      form.reset({
        description: expense?.description,
        amount: expense?.amount?.toString(),
        categoryId: expense?.category?.id,
        createDate: expense?.createDate,
      });
    }
  }, [expense]);

  if (width && width < 768) {
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        {/* <Form {...form}> */}
        <DrawerContent>
          {/* <DrawerHeader> */}
          <DrawerTitle>
            {expense ? "Cập nhật chi tiêu" : "Tạo chi tiêu"}
          </DrawerTitle>
          {/* </DrawerHeader> */}
          {/* <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-3 sm:space-y-4"
            > */}
          {/* <CreateForm form={form} data={data} /> */}
          <label
            htmlFor="name"
            className="mb-2 mt-8 block text-sm font-medium text-gray-900"
          >
            Project name
          </label>
          <input
            id="name"
            className="h-9 w-full rounded-lg border border-gray-200 bg-white px-3 text-gray-900 outline-none focus:ring-2 focus:ring-black/5"
          />
          <label
            htmlFor="name"
            className="mb-2 mt-8 block text-sm font-medium text-gray-900"
          >
            Description
          </label>
          <textarea
            rows={6}
            className="w-full resize-none rounded-lg border border-gray-200 bg-white p-3 pt-2.5 text-gray-900 outline-none focus:ring-2 focus:ring-black/5 focus:ring-offset-0"
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
          {/* </form> */}
        </DrawerContent>
        {/* </Form> */}
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Form {...form}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {expense ? "Cập nhật chi tiêu" : "Tạo chi tiêu"}
            </DialogTitle>
          </DialogHeader>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <CreateForm form={form} data={data} />
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
                {expense ? "Cập nhật" : "Tạo"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Form>
    </Dialog>
  );
};

export default memo(CreateExpense);

const CreateForm = ({
  form,
  data,
}: {
  form: FormProps<z.infer<typeof formCreateExpenseSchema>>;
  data: Category[] | undefined;
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
        name="categoryId"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Category</FormLabel>
            <FormControl>
              <Select
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
                    {data?.map((category: any) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
