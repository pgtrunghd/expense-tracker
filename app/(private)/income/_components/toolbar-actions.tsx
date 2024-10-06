"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import React, { useState } from "react";
import { CreateIncome } from "./create-income";

export const ToolbarActions = () => {
  const [open, setOpen] = useState(false);

  return (
    <section className="pb-3 pt-6 text-right">
      <Button size="xs" onClick={() => setOpen(true)}>
        <Plus className="mr-2 size-4" /> Tạo income
      </Button>

      <CreateIncome open={open} setOpen={setOpen} />
    </section>
  );
};
