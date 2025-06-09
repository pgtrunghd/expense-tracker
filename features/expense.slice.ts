import { baseQueryWithAuth } from "@/lib/api";
import { apiRoutes } from "@/lib/constants";
import { onQueryStartedErrorToast } from "@/lib/utils";
import { createApi } from "@reduxjs/toolkit/query/react";
import { balanceSlice } from "./balance.slice";

export const expenseSlice = createApi({
  reducerPath: "expense",
  baseQuery: baseQueryWithAuth,
  tagTypes: ["Expense", "Balance", "RecentActivity"],
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
      invalidatesTags: ["Expense", "RecentActivity"],
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
      invalidatesTags: ["Expense", "RecentActivity"],
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
      invalidatesTags: ["Expense", "RecentActivity"],
    }),

    getMonthlyExpense: builder.query<any, string | void>({
      query: (date) => `${apiRoutes.EXPENSE}/by-month?date=${date}`,
      onQueryStarted: onQueryStartedErrorToast,
      providesTags: ["Expense"],
    }),
    getRecentActivity: builder.query<RecentActivity, string>({
      query: (date: string) => `${apiRoutes.RECENT_ACTIVITY}?date=${date}`,
      onQueryStarted: onQueryStartedErrorToast,
      providesTags: ["RecentActivity"],
    }),
  }),
});

export const {
  useGetExpensesQuery,
  useCreateExpenseMutation,
  useUpdateExpenseMutation,
  useDeleteExpenseMutation,
  useGetMonthlyExpenseQuery,
  useGetRecentActivityQuery,
} = expenseSlice;
