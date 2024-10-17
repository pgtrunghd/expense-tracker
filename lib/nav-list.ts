import {
  CreditCard,
  HandCoins,
  LayoutDashboard,
  Plus,
  Tags,
} from "lucide-react";

export const navList = [
  {
    name: "Dashboard",
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
    name: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
    type: "link",
  },
  {
    name: "Chi tiêu",
    path: "/expense",
    icon: CreditCard,
    type: "link",
  },
  {
    name: "",
    path: "",
    icon: Plus,
    type: "button",
  },
  {
    name: "Thu nhập",
    path: "/income",
    icon: HandCoins,
    type: "link",
  },
  {
    name: "Category",
    path: "/category",
    icon: Tags,
    type: "link",
  },
];
