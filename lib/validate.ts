import { z } from "zod";

export const formLoginSchema = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});
export const formRegisterSchema = z
  .object({
    username: z.string().min(1, { message: "Username is required" }),
    password: z.string().min(1, { message: "Password is required" }),
    confirmPassword: z
      .string()
      .min(1, { message: "Confirm password is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
export const formCreateExpenseSchema = z.object({
  createDate: z.date({
    required_error: "Date is required",
  }),
  description: z.string().min(1, { message: "Description is required" }),
  amount: z.string().min(1, { message: "Amount is required" }),
  categoryId: z.object({
    id: z.string().min(1, { message: "Category is required" }),
    name: z.string().min(1, { message: "Category is required" }),
  }),
});
export const formCreateCategorySchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  color: z.string().min(1, { message: "Color is required" }),
  icon: z.string().min(1, { message: "Icon is required" }),
});
export const formCreateIncomeSchema = z.object({
  description: z.string().min(1, { message: "Description is required" }),
  amount: z.string().min(1, { message: "Amount is required" }),
  createDate: z.date({
    required_error: "Date is required",
  }),
  categoryId: z.object({
    id: z.string().min(1, { message: "Category is required" }),
    name: z.string().min(1, { message: "Category is required" }),
  }),
});
