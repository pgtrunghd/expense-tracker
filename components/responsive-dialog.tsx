import { useWindowSize } from "@/hooks/useWindowSize";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";

interface IProps {
  trigger: React.ReactNode;
  title?: string;
  children: React.ReactNode;
  open?: boolean;
  setOpen:
    | React.Dispatch<React.SetStateAction<boolean>>
    | ((open: boolean) => void);
  description?: string;
  accept?: React.ReactNode;
}

export const ResponsiveDialog = ({
  trigger,
  title,
  children,
  open,
  setOpen,
  description,
  accept,
}: IProps) => {
  const { width } = useWindowSize();
  console.log(accept);

  if (width && width < 768) {
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>{trigger}</DrawerTrigger>

        <DrawerContent>
          <div className="flex items-center justify-between">
            <DrawerClose className="text-sm">Hủy</DrawerClose>

            {accept}
          </div>

          {title && (
            <DrawerHeader className="pt-3">
              <DrawerTitle>{title}</DrawerTitle>

              {description && (
                <DrawerDescription>{description}</DrawerDescription>
              )}
            </DrawerHeader>
          )}

          {children}
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>

          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        {children}
      </DialogContent>
    </Dialog>
  );
};
