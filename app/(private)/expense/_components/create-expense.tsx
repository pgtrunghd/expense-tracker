"use client";

import { Button } from "@/components/ui/button";
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
  DrawerTrigger,
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
import { useWindowSize } from "@/hooks/use-window-size";
import { formCreateExpenseSchema } from "@/lib/validate";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
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
      expense
        ? await updateExpense({
            ...data,
            amount: Number(data.amount),
            id: expense.id,
          }).unwrap()
        : await createExpense({
            ...data,
            amount: Number(data.amount),
          }).unwrap();
      toast.success("Expense created successfully");
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
      });
    }
  }, [expense]);

  if (width && width < 768) {
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <Form {...form}>
          <DrawerContent>
            <DrawerHeader>
              <DialogTitle>
                {expense ? "Cập nhật chi tiêu" : "Tạo chi tiêu"}
              </DialogTitle>
            </DrawerHeader>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="space-y-4 px-4">
                <CreateForm form={form} data={data} />
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
                  {expense ? "Cập nhật" : "Tạo"}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setOpen(false)}
                  type="button"
                >
                  Hủy
                </Button>
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
  data: Category[];
}) => {
  return (
    <>
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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn category" />
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
