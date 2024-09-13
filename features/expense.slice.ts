import { apiRoutes } from "@/lib/constants";
import { authWithToken, onQueryStartedErrorToast } from "@/lib/utils";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const expenseSlice = createApi({
  reducerPath: "expense",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    prepareHeaders: authWithToken,
  }),
  tagTypes: ["Expense", "Category"],
  endpoints: (builder) => ({
    getExpenses: builder.query<any, number | void>({
      query: (page = 1) => `${apiRoutes.EXPENSE}?page=${page}`,
      onQueryStarted: onQueryStartedErrorToast,
      providesTags: ["Expense"],
    }),
    createExpense: builder.mutation({
      query: (data) => ({
        url: apiRoutes.EXPENSE,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Expense", "Category"],
    }),
    updateExpense: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `${apiRoutes.EXPENSE}/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Expense"],
    }),
    deleteExpense: builder.mutation({
      query: (id) => ({
        url: `${apiRoutes.EXPENSE}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Expense"],
    }),
    getWeeklyExpense: builder.query<any, string | void>({
      query: (date) => `${apiRoutes.EXPENSE}/by-week?date=${date}`,
      onQueryStarted: onQueryStartedErrorToast,
      providesTags: ["Expense"],
    }),
  }),
});

export const {
  useGetExpensesQuery,
  useCreateExpenseMutation,
  useUpdateExpenseMutation,
  useDeleteExpenseMutation,
  useGetWeeklyExpenseQuery,
} = expenseSlice;
