import {
  Banknote,
  Bike,
  Book,
  Briefcase,
  Bus,
  Car,
  Coffee,
  Coins,
  CreditCard,
  DollarSign,
  Dumbbell,
  Ambulance,
  Club,
  Gift,
  GraduationCap,
  Home,
  Landmark,
  Laptop,
  Pencil,
  PiggyBank,
  Pill,
  Plane,
  Receipt,
  Scissors,
  Shirt,
  ShoppingBag,
  ShoppingCart,
  Smartphone,
  Stethoscope,
  Train,
  Tv,
  Utensils,
  Wallet,
  Wine,
} from "lucide-react";

export const expenseIconCategories = {
  "Phương thức thanh toán": { CreditCard, Wallet, DollarSign, Banknote, Coins },
  "Tài chính": { Receipt, Landmark, PiggyBank, Briefcase },
  "Vận tải": { Car, Plane, Bus, Train },
  "Mua sắm": { ShoppingCart, ShoppingBag, Gift },
  "Ăn uống": { Utensils, Coffee, Wine },
  "Nhà ở": { Home },
  "Điện tử": { Smartphone, Laptop, Tv },
  "Quần áo": { Shirt, Scissors },
  "Sức khỏe": { Stethoscope, Pill, Ambulance },
  "Giáo dục": { GraduationCap, Book, Pencil },
  "Thể thao": { Dumbbell, Bike, Club },
};
