import { cn } from "@/lib/utils";
import * as LucideIcon from "lucide-react";

interface ICategoryIcon {
  color: string;
  icon: string;
  containerClass?: string;
  iconClass?: string;
}

export default function CategoryIcon({
  color,
  icon,
  containerClass,
  iconClass,
}: ICategoryIcon) {
  const Icon = LucideIcon[
    (icon as keyof typeof LucideIcon) ?? "Tag"
  ] as React.FC<React.SVGProps<SVGSVGElement>>;

  return (
    <span
      className={cn(
        "grid size-6 place-items-center rounded-[25%]",
        containerClass,
      )}
      style={{ backgroundColor: color }}
    >
      <Icon className={cn("size-4 text-white", iconClass)} />
    </span>
  );
}
