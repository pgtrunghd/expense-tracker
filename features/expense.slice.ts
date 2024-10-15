import { baseQueryWithAuth } from "@/lib/api";
import { apiRoutes } from "@/lib/constants";
import { onQueryStartedErrorToast } from "@/lib/utils";
import { createApi } from "@reduxjs/toolkit/query/react";
import { balanceSlice } from "./balance.slice";

export const expenseSlice = createApi({
  reducerPath: "expense",
  baseQuery: baseQueryWithAuth,
  tagTypes: ["Expense", "Balance"],
  endpoints: (builder) => ({
    getExpenses: builder.query<any, number | void | Filter>({
      query: (params: Filter) => ({
        url: `${apiRoutes.EXPENSE}`,
        params: params,
      }),
      providesTags: ["Expense"],
    }),
    createExpense: builder.mutation({
      query: (data) => ({
        url: apiRoutes.EXPENSE,
        method: "POST",
        body: data,
      }),
      onQueryStarted(arg, api) {
        api.queryFulfilled.then(() => {
          api.dispatch(balanceSlice.util.invalidateTags(["Balance"]));
        });
      },
      invalidatesTags: ["Expense"],
    }),
    updateExpense: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `${apiRoutes.EXPENSE}/${id}`,
        method: "PATCH",
        body: data,
      }),
      onQueryStarted(arg, api) {
        api.queryFulfilled.then(() => {
          api.dispatch(balanceSlice.util.invalidateTags(["Balance"]));
        });
      },
      invalidatesTags: ["Expense"],
    }),
    deleteExpense: builder.mutation({
      query: (id) => ({
        url: `${apiRoutes.EXPENSE}/${id}`,
        method: "DELETE",
      }),
      onQueryStarted(arg, api) {
        api.queryFulfilled.then(() => {
          api.dispatch(balanceSlice.util.invalidateTags(["Balance"]));
        });
      },
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
