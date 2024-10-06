import { Column } from "@tanstack/react-table";

export function getCommonPinningStyles<TData>({
  column,
  withBorder = false,
}: {
  column: Column<TData>;
  withBorder?: boolean;
}): React.CSSProperties {
  const isPinned = column.getIsPinned();
  const isLastLeftPinnedColumn =
    isPinned === "left" && column.getIsLastColumn("left");
  const isFirstRightPinnedColumn =
    isPinned === "right" && column.getIsFirstColumn("right");

  return {
    boxShadow: withBorder
      ? isLastLeftPinnedColumn
        ? "-4px 0 4px -4px hsl(var(--border)) inset"
        : isFirstRightPinnedColumn
          ? "4px 0 4px -4px hsl(var(--border)) inset"
          : undefined
      : undefined,
    position: isPinned ? "sticky" : "relative",
    right: isPinned === "right" ? `${column.getAfter("right")}px` : undefined,
    left: isPinned === "left" ? `${column.getStart("left")}px` : undefined,
    zIndex: isPinned ? 1 : 0,
    width: column.getSize(),
    opacity: isPinned ? 0.97 : 1,
  };
}
