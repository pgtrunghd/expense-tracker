"use client";

import { CreateForm as CreateExpenseForm } from "@/components/create-expense";
import { navListMobile } from "@/lib/nav-list";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { ResponsiveDialog } from "../responsive-dialog";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { CreateForm as CreateIncomeForm } from "@/components/create-income";
import { useForm } from "react-hook-form";
import {
  formCreateExpenseSchema,
  formCreateIncomeSchema,
} from "@/lib/validate";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const Navigation = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const formExpense = useForm<z.infer<typeof formCreateExpenseSchema>>({
    resolver: zodResolver(formCreateExpenseSchema),
  });
  const formIncome = useForm<z.infer<typeof formCreateIncomeSchema>>({
    resolver: zodResolver(formCreateIncomeSchema),
  });

  return (
    <section className="sticky inset-x-0 bottom-0 z-20 block border-t bg-background/60 shadow-md backdrop-blur md:hidden">
      <ul className="relative flex h-full items-center justify-evenly pb-6 pt-2">
        {navListMobile.map((item) =>
          // item.type === "link" ? (
            <Link
              href={item.path}
              key={item.path}
              className={cn(
                "flex flex-1 flex-col items-center justify-center text-zinc-400 duration-200 active:scale-90",
                item.path === pathname ? "text-primary" : "",
              )}
            >
              <item.icon className="mb-1 size-5" />
              <p className="text-[10px] sm:text-xs">{item.name}</p>
            </Link>
          // ) : (
          //   <ResponsiveDialog
          //     key={item.path}
          //     setOpen={setOpen}
          //     open={open}
          //     trigger={
          //       <div className="flex flex-col items-center">
          //         <Button size="iconSm" className="mb-1 rounded-lg">
          //           <Plus className="size-5" />
          //         </Button>
          //         <p className="text-[10px] font-medium sm:text-xs">
          //           Tạo thu chi
          //         </p>
          //       </div>
          //     }
          //   >
          //     <Tabs defaultValue="expense" className="mt-4 flex flex-col">
          //       <TabsList>
          //         <TabsTrigger value="expense" className="flex-1">
          //           Chi tiêu
          //         </TabsTrigger>
          //         <TabsTrigger value="income" className="flex-1">
          //           Thu nhập
          //         </TabsTrigger>
          //       </TabsList>
          //       <TabsContent value="expense">
          //         <CreateExpenseForm setOpen={setOpen} form={formExpense} />
          //       </TabsContent>
          //       <TabsContent value="income">
          //         <CreateIncomeForm setOpen={setOpen} form={formIncome} />
          //       </TabsContent>
          //     </Tabs>
          //   </ResponsiveDialog>
          // ),
        )}
      </ul>
    </section>
  );
};
