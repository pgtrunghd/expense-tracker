"use client";

import { CreateForm as CreateExpenseForm } from "@/components/create-expense";
import { CreateForm as CreateIncomeForm } from "@/components/create-income";
import { ResponsiveDialog } from "@/components/responsive-dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  formCreateExpenseSchema,
  formCreateIncomeSchema,
} from "@/lib/validate";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function AddTransaction() {
  const [open, setOpen] = useState(false);
  const formExpense = useForm<z.infer<typeof formCreateExpenseSchema>>({
    resolver: zodResolver(formCreateExpenseSchema),
  });
  const formIncome = useForm<z.infer<typeof formCreateIncomeSchema>>({
    resolver: zodResolver(formCreateIncomeSchema),
  });

  return (
    <div className="fixed bottom-20 right-4 z-50 md:bottom-4">
      <ResponsiveDialog
        setOpen={setOpen}
        open={open}
        trigger={
          <Button className="rounded-full" size="icon">
            <Plus className="size-5" />
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
            <CreateExpenseForm setOpen={setOpen} form={formExpense} />
          </TabsContent>
          <TabsContent value="income">
            <CreateIncomeForm setOpen={setOpen} form={formIncome} />
          </TabsContent>
        </Tabs>
      </ResponsiveDialog>
    </div>
  );
}
