"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import React, { useState } from "react";
import { CreateIncomeMemo } from "./create-income";

export const ToolbarActions = () => {
  const [open, setOpen] = useState(false);

  return (
    <section className="pb-3 pt-6 text-right">
      <Button size="xs" onClick={() => setOpen(true)}>
        <Plus className="mr-2 size-4" /> Tạo income
      </Button>

      <CreateIncomeMemo open={open} setOpen={setOpen} />
    </section>
  );
};
