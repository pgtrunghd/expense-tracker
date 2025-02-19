import { Button } from "@/components/ui/button";
import { expenseIconCategories } from "@/lib/icon-list";
import React from "react";

export const IconList = () => {
  const categoryList = Object.entries(expenseIconCategories);

  return (
    <section className="space-y-4 overflow-auto h-full">
      {categoryList.map(([category, icons]) => (
        <div key={category} className="space-y-2">
          <p className="text-sm font-medium">{category}</p>
          <div className="grid grid-cols-6 sm:grid-cols-8 gap-4">
            {Object.entries(icons).map(([name, Icon]) => (
              <Button
                key={name}
                size="icon"
                variant="outline"
                className="rounded-full"
              >
                <Icon className="size-5" />
              </Button>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
};
