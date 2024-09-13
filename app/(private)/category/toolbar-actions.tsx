"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import React, { memo, useState } from "react";
import CreateCategory from "./_components/create-category";

const ToolbarActions = () => {
  const [open, setOpen] = useState(false);

  return (
    <section className="pb-3 pt-6 text-right">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button size="xs">
            <Plus className="mr-2 size-4" /> Tạo mới category
          </Button>
        </DialogTrigger>

        <CreateCategory onClose={() => setOpen(false)} open={open} />
      </Dialog>
    </section>
  );
};

export default memo(ToolbarActions);
