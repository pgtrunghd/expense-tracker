import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getDomain(url: string) {
  return `${process.env.NEXT_PUBLIC_API_URL}${url}`;
}

export const requestWithToken = (headers: Headers) => {
  const store = localStorage.getItem("access_token");
  if (store) {
    const token = JSON.parse(store);
    headers.set("Authorization", `Bearer ${token}`);
  }
};

export const onQueryStartedErrorToast = async (
  args: any,
  { queryFulfilled }: any,
) => {
  try {
    await queryFulfilled;
  } catch (err: any) {
    console.log(err);

    if (err.error.status === 401) {
      console.error(err.error.data.message);
      localStorage.removeItem("access_token");
    }
  }
};

export const formatter = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
  minimumFractionDigits: 0,
  currencyDisplay: "symbol",
});

export const formatDate = (date: Date) => {
  return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
};

export const formatToNumber = (value: string) => {
  return Number(value.replace(/\D/g, ""));
};

export const formatWithDots = (value: string) => {
  if (!value) return;

  const digits = value.replace(/\D/g, "");

  return digits
    .split("")
    .reverse()
    .reduce((groups: string[], digit: string, index: number) => {
      if (index % 3 === 0 && index !== 0) {
        groups.unshift(".");
      }
      groups.unshift(digit);
      return groups;
    }, [])
    .join("");
};
