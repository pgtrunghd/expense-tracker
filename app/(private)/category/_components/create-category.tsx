"use client";

import { ResponsiveDialog } from "@/components/responsive-dialog";
import { Button } from "@/components/ui/button";
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
  useUpdateCategoryMutation,
} from "@/features/category.slice";
import { colorList } from "@/lib/color-list";
import { notification } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { formCreateCatogorySchema } from "@/lib/validate";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { memo, useEffect, useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface IProps {
  category?: Category;
  trigger: React.ReactNode;
  callback?: (open: boolean) => void;
}

const CreateCategory = ({ category, trigger, callback }: IProps) => {
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof formCreateCatogorySchema>>({
    resolver: zodResolver(formCreateCatogorySchema),
  });

  useEffect(() => {
    if (category) {
      form.reset({
        name: category.name,
        color: category.color,
      });
    }
  }, [category]);

  return (
    <ResponsiveDialog
      title={category ? "Sửa category" : "Tạo category"}
      trigger={trigger}
      open={open}
      setOpen={(open: boolean) => {
        setOpen(open);
        callback && callback(open);
      }}
    >
      <CreateForm category={category} setOpen={setOpen} form={form} />
    </ResponsiveDialog>
  );
};

export default memo(CreateCategory);

const CreateForm = ({
  category,
  setOpen,
  form,
}: {
  category?: Category;
  setOpen: (open: boolean) => void;
  form: UseFormReturn<z.infer<typeof formCreateCatogorySchema>>;
}) => {
  const [createCategory, { isLoading: isCreating }] =
    useCreateCategoryMutation();
  const [updateCategory, { isLoading: isUpdating }] =
    useUpdateCategoryMutation();

  const onSubmit = async (data: z.infer<typeof formCreateCatogorySchema>) => {
    try {
      if (category) {
        await updateCategory({
          ...data,
          id: category.id,
        }).unwrap();
        toast.success(notification.UPDATE_SUCCESS);
      } else {
        await createCategory({
          ...data,
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
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tên category</FormLabel>
              <FormControl>
                <Input placeholder="Nhập tên category" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="color"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Chọn màu sắc</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn màu sắc" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {colorList?.map((item) => (
                        <SelectItem key={item.color} value={item.color}>
                          <div className="flex items-center gap-2">
                            <span
                              style={{ backgroundColor: item.color }}
                              className={cn(`block size-4 rounded-sm`)}
                            ></span>
                            <p>{item.name}</p>
                          </div>
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

        <Button
          size="sm"
          type="submit"
          disabled={isCreating || isUpdating}
          className="w-full"
        >
          {isCreating || isUpdating ? (
            <Loader2 className="mr-2 size-4 animate-spin" />
          ) : null}
          {category ? "Cập nhật" : "Tạo"}
        </Button>
      </form>
    </Form>
  );
};
