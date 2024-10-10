import { logout } from "@/app/(private)/actions";
import { getToken } from "@/app/actions";
import { type ClassValue, clsx } from "clsx";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getDomain(url: string) {
  return `${process.env.NEXT_PUBLIC_API_URL}${url}`;
}

// export async function authWithToken(headers: Headers) {
//   const authToken = await getToken();
//   if (authToken?.value) {
//     headers.set("Authorization", `Bearer ${authToken.value}`);
//   }
// }

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
    if (err.error.status === 401) {
      toast.error(err.error.data.message);
    }
    await logout();
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
