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
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
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
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
} from "@/features/category.slice";
import { useWindowSize } from "@/hooks/use-window-size";
import { colorList } from "@/lib/color-list";
import { notification } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { formCreateCatogorySchema } from "@/lib/validate";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { memo, useEffect } from "react";
import { FormProps, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface IProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  category?: Category;
}

const CreateCategory = ({ open, setOpen, category }: IProps) => {
  const form = useForm<z.infer<typeof formCreateCatogorySchema>>({
    resolver: zodResolver(formCreateCatogorySchema),
  });
  //   const { data } = useGetCategoriesQuery(open, { skip: !open });
  const [createCategory, { isLoading: isCreating }] =
    useCreateCategoryMutation();
  const [updateCategory, { isLoading: isUpdating }] =
    useUpdateCategoryMutation();
  const { width } = useWindowSize();

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

  useEffect(() => {
    if (category) {
      form.reset({
        name: category.name,
        color: category.color,
      });
    }
  }, [category]);

  if (width && width < 768) {
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <Form {...form}>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>
                {category ? "Sửa category" : "Tạo category"}
              </DrawerTitle>
            </DrawerHeader>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="space-y-4 px-4">
                <CreateForm form={form} />
              </div>

              <DrawerFooter>
                <Button
                  size="sm"
                  type="submit"
                  disabled={isCreating || isUpdating}
                >
                  {isCreating || isUpdating ? (
                    <Loader2 className="mr-2 size-4 animate-spin" />
                  ) : null}
                  {category ? "Cập nhật" : "Tạo"}
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
              {category ? "Sửa category" : "Tạo category"}
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
                {category ? "Cập nhật" : "Tạo"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Form>
    </Dialog>
  );
};

export default memo(CreateCategory);

const CreateForm = ({
  form,
}: {
  form: FormProps<z.infer<typeof formCreateCatogorySchema>>;
}) => {
  return (
    <>
      <FormField
        name="name"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Tên category</FormLabel>
            <FormControl>
              <Input {...field} />
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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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
    </>
  );
};
