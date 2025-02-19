"use client";

import { CreateForm as CreateExpenseForm } from "@/app/(private)/expense/_components/create-expense";
import { CreateForm as CreateIncomeForm } from "@/app/(private)/income/_components/create-income";
import { ResponsiveDialog } from "@/components/responsive-dialog";
import { Button } from "@/components/ui/button";
import { MonthPicker } from "@/components/ui/month-picker";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { changeDate } from "@/features/global.slice";
import { cn } from "@/lib/utils";
import { formCreateExpenseSchema } from "@/lib/validate";
import { RootState } from "@/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { formatDate } from "date-fns";
import { CalendarIcon, Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { z } from "zod";

export default function Action() {
  const dispatch = useDispatch();
  const { date } = useSelector((state: RootState) => state.global);
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof formCreateExpenseSchema>>({
    resolver: zodResolver(formCreateExpenseSchema),
  });

  return (
    <section className="flex items-center justify-between">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className={cn()}>
            <CalendarIcon className="mr-2 size-4" />
            {date ? formatDate(date, "MMMM yyyy") : <span>Pick a month</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <MonthPicker
            onMonthSelect={(value) => {
              dispatch(changeDate(value.toISOString()));
            }}
            selectedMonth={new Date(date)}
          />
        </PopoverContent>
      </Popover>

      <ResponsiveDialog
        setOpen={setOpen}
        open={open}
        trigger={
          <Button className="rounded-lg" size="xs">
            <Plus className="mr-2 size-5" /> Tạo thu chi
          </Button>
        }
      >
        <Tabs defaultValue="expense" className="mt-4 flex flex-col">
          <TabsList>
            <TabsTrigger value="expense" className="flex-1">
              Chi tiêu
            </TabsTrigger>
            <TabsTrigger value="income" className="flex-1">
              Thu nhập
            </TabsTrigger>
          </TabsList>
          <TabsContent value="expense">
            <CreateExpenseForm setOpen={setOpen} form={form} />
          </TabsContent>
          <TabsContent value="income">
            <CreateIncomeForm setOpen={setOpen} />
          </TabsContent>
        </Tabs>
      </ResponsiveDialog>
    </section>
  );
}
