"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { CreateIncomeMemo } from "./create-income";

export const ToolbarActions = () => {
  return (
    <section className="pb-3 text-right">
      <CreateIncomeMemo
        trigger={
          <Button size="xs">
            <Plus className="mr-2 size-4" /> Tạo income
          </Button>
        }
      />
    </section>
  );
};
