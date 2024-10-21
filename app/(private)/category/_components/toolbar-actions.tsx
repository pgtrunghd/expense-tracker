"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import React, { memo, useState } from "react";
import CreateCategory from "./create-category";

const ToolbarActions = () => {
  return (
    <section className="pb-3 text-right">
      <CreateCategory
        trigger={
          <Button size="xs">
            <Plus className="mr-2 size-4" /> Tạo category
          </Button>
        }
      />
    </section>
  );
};

export default memo(ToolbarActions);
