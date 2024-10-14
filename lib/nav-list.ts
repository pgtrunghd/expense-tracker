import { CreditCard, HandCoins, LayoutDashboard, Tags } from "lucide-react";

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
  // {
  //   name: "",
  //   path: "",
  //   icon: CreditCard,
  // },
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
