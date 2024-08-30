"use client";

import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import {
  useCreateCategoryMutation,
  useGetCategoriesQuery,
  useUpdateCategoryMutation,
} from "@/features/category.slice";
import {
  useCreateExpenseMutation,
  useUpdateExpenseMutation,
} from "@/features/expense.slice";
import {
  formCreateCatogorySchema,
  formCreateExpenseSchema,
} from "@/lib/validate";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { memo, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface IProps {
  open: boolean;
  onClose: () => void;
  category?: Category;
}

const CreateCategory = ({ onClose, open, category }: IProps) => {
  const form = useForm<z.infer<typeof formCreateCatogorySchema>>({
    resolver: zodResolver(formCreateCatogorySchema),
  });
  //   const { data } = useGetCategoriesQuery(open, { skip: !open });
  const [createCategory, { isLoading: isCreating }] =
    useCreateCategoryMutation();
  const [updateCategory, { isLoading: isUpdating }] =
    useUpdateCategoryMutation();

  const onSubmit = async (data: z.infer<typeof formCreateCatogorySchema>) => {
    try {
      category
        ? await updateCategory({
            ...data,
            id: category.id,
          }).unwrap()
        : await createCategory({
            ...data,
          }).unwrap();
      toast.success("Category created successfully");
      onClose();
      form.reset();
    } catch (error: any) {
      toast.error(error?.data.message);
    }
  };

  useEffect(() => {
    if (category) {
      form.reset({
        name: category.name,
      });
    }
  }, [category]);

  return (
    <Form {...form}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {category ? "Edit category" : "Create category"}
          </DialogTitle>
        </DialogHeader>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <DialogFooter>
            <Button variant="outline" size="sm" onClick={onClose} type="button">
              Cancel
            </Button>
            <Button size="sm" type="submit" disabled={isCreating || isUpdating}>
              {isCreating || isUpdating ? (
                <Loader2 className="mr-2 size-4 animate-spin" />
              ) : null}
              {category ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Form>
  );
};

export default memo(CreateCategory);
