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
import { formCreateCategorySchema } from "@/lib/validate";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Tag } from "lucide-react";
import { createElement, memo, useEffect, useState } from "react";
import { useForm, UseFormReturn, useWatch } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { IconList } from "./icon-list";
import * as LucideIcon from "lucide-react";
import { PaletteList } from "./color-list";

interface IProps {
  category?: Category;
  trigger: React.ReactNode;
  callback?: (open: boolean) => void;
}

const CreateCategory = ({ category, trigger, callback }: IProps) => {
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof formCreateCategorySchema>>({
    resolver: zodResolver(formCreateCategorySchema),
    defaultValues: {
      name: "",
      color: colorList[0].color,
    },
  });

  useEffect(() => {
    if (category) {
      form.reset({
        name: category.name,
        color: category.color,
        icon: category.icon,
      });
    }
  }, [category]);

  return (
    <ResponsiveDialog
      title={category ? "Sửa danh mục" : "Tạo danh mục"}
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
  form: UseFormReturn<z.infer<typeof formCreateCategorySchema>>;
}) => {
  const [openSelectIcon, setOpenSelectIcon] = useState(false);
  const [openSelectColor, setOpenSelectColor] = useState(false);
  const [createCategory, { isLoading: isCreating }] =
    useCreateCategoryMutation();
  const [updateCategory, { isLoading: isUpdating }] =
    useUpdateCategoryMutation();
  const color = useWatch({ control: form.control, name: "color" });
  const icon = useWatch({ control: form.control, name: "icon" });
  const Icon = LucideIcon[
    icon ? (icon as keyof typeof LucideIcon) : "Tag"
  ] as React.FC<React.SVGProps<SVGSVGElement>>;

  const onSubmit = async (data: z.infer<typeof formCreateCategorySchema>) => {
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
    <>
      <span
        className="mx-auto flex size-28 items-center justify-center rounded-3xl"
        style={{ backgroundColor: color }}
      >
        <Icon className="size-14 text-white" />
      </span>
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tên</FormLabel>
                <FormControl>
                  <Input placeholder="Nhập tên danh mục" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="color"
            control={form.control}
            defaultValue={colorList[0].color}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Màu</FormLabel>
                <FormControl>
                  <ResponsiveDialog
                    title="Màu"
                    trigger={
                      <Button
                        type="button"
                        className="w-full justify-between"
                        variant="outline"
                      >
                        <span className="flex items-center gap-2">
                          <span className="grid size-6 place-items-center rounded-md bg-yellow-700">
                            <LucideIcon.Palette className="size-4 text-white" />
                          </span>
                          Đã chọn
                        </span>
                        <span className="grid size-7 place-items-center rounded-full bg-primary">
                          <span
                            style={{ backgroundColor: color }}
                            className="size-7 rounded-full"
                          />
                        </span>
                      </Button>
                    }
                    open={openSelectColor}
                    setOpen={(open: boolean) => {
                      setOpenSelectColor(open);
                    }}
                  >
                    <PaletteList
                      selected={field.value}
                      onSelect={(value) => {
                        field.onChange(value);
                        setOpenSelectColor(false);
                      }}
                    />
                  </ResponsiveDialog>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="icon"
            defaultValue="Tag"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Biểu tượng</FormLabel>
                <FormControl>
                  <div>
                    <ResponsiveDialog
                      title="Biểu tượng"
                      trigger={
                        <Button
                          type="button"
                          className="w-full justify-between"
                          variant="outline"
                        >
                          <span className="flex items-center gap-2">
                            <span className="grid size-6 place-items-center rounded-md bg-blue-700">
                              <LucideIcon.Blocks className="size-4 text-white" />
                            </span>
                            Đã chọn
                          </span>
                          <span className="grid size-7 place-items-center rounded-full bg-primary">
                            <Icon className="size-4 text-muted" />
                          </span>
                        </Button>
                      }
                      open={openSelectIcon}
                      setOpen={(open: boolean) => {
                        setOpenSelectIcon(open);
                      }}
                    >
                      <IconList
                        selected={field.value}
                        onSelect={(value) => {
                          field.onChange(value);
                          setOpenSelectIcon(false);
                        }}
                      />
                    </ResponsiveDialog>
                  </div>
                </FormControl>
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
    </>
  );
};
