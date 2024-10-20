"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { memo } from "react";
import CreateExpense from "./create-expense";

const ToolbarActions = () => {
  return (
    <section className="pb-3 text-right">
      <CreateExpense
        trigger={
          <Button size="xs">
            <Plus className="mr-2 size-4" /> Tạo chi tiêu
          </Button>
        }
      />
    </section>
  );
};

export default memo(ToolbarActions);
