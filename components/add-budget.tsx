import React, { useState } from "react";
import { ResponsiveDialog } from "./responsive-dialog";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { z } from "zod";
import { formCreateBudgetSchema } from "@/lib/validate";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { cn, formatWithDots } from "@/lib/utils";
import CategoryIcon from "./category-icon";
import { CategoryList } from "@/app/(private)/category/_components/category-list";
import { Switch } from "./ui/switch";

type FormValues = z.infer<typeof formCreateBudgetSchema>;

export default function AddBudget() {
  const [open, setOpen] = useState(false);
  const form = useForm<FormValues>({
    resolver: zodResolver(formCreateBudgetSchema),
  });

  return (
    <div className="fixed bottom-20 right-4 z-50 md:bottom-4">
      <ResponsiveDialog
        title="Tạo ngân sách"
        setOpen={setOpen}
        open={open}
        trigger={
          <Button className="rounded-full" size="icon">
            <Plus className="size-5" />
          </Button>
        }
      >
        <CreateBudgetForm form={form} />
      </ResponsiveDialog>
    </div>
  );
}

const CreateBudgetForm = ({ form }: { form: UseFormReturn<FormValues> }) => {
  const [openCategory, setOpenCategory] = useState(false);

  return (
    <Form {...form}>
      <form className="space-y-3 sm:space-y-4">
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
          name="categoryId"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
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
          name="isRecurring"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Button
                  type="button"
                  variant="outline"
                  className={cn("w-full justify-between font-normal")}
                >
                  <span className="flex items-center gap-2">
                    <CategoryIcon icon="Repeat" color="blue" />
                    Lặp lại
                  </span>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </Button>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
