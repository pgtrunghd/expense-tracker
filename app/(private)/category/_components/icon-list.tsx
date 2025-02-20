import { Button } from "@/components/ui/button";
import { expenseIconCategories } from "@/lib/icon-list";
import { cn } from "@/lib/utils";
import React from "react";

interface IIconList {
  selected: any;
  onSelect: (value: any) => void;
}

export const IconList = ({ selected, onSelect }: IIconList) => {
  const categoryList = Object.entries(expenseIconCategories);

  return (
    <section className="h-full space-y-4 overflow-auto">
      {categoryList.map(([category, icons]) => (
        <div key={category} className="space-y-2">
          <p className="text-sm font-medium">{category}</p>
          <div className="grid grid-cols-6 gap-4 sm:grid-cols-8">
            {Object.entries(icons).map(([name, Icon]) => (
              <Button
                key={name}
                size="icon"
                variant={selected === name ? "default" : "outline"}
                className={cn("rounded-full")}
                onClick={() => {
                  onSelect(name);
                }}
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
