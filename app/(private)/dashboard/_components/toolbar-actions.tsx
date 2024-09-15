"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { memo, useState } from "react";
import CreateExpense from "./create-expense";

const ToolbarActions = () => {
  const [open, setOpen] = useState(false);

  return (
    <section className="pb-3 pt-6 text-right">
      <Button size="xs" onClick={() => setOpen(true)}>
        <Plus className="mr-2 size-4" /> Tạo chi tiêu
      </Button>

      <CreateExpense open={open} setOpen={setOpen} />
    </section>
  );
};

export default memo(ToolbarActions);
