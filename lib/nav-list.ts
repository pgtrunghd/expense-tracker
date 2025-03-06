import {
  CreditCard,
  FileStack,
  HandCoins,
  LayoutDashboard,
  List,
  Plus,
  Tags,
} from "lucide-react";

export const navList = [
  {
    name: "Tổng quan",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Chi tiêu",
    path: "/expense",
    icon: CreditCard,
  },
  {
    name: "Thu nhập",
    path: "/income",
    icon: HandCoins,
  },
  {
    name: "Category",
    path: "/category",
    icon: Tags,
  },
];

export const navListMobile = [
  {
    name: "Tổng quan",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Giao dịch",
    path: "/transaction",
    icon: List,
  },
  {
    name: "Danh mục",
    path: "/category",
    icon: FileStack,
  },
];
