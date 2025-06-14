import { baseQueryWithAuth } from "@/lib/api";
import { apiRoutes } from "@/lib/constants";
import { onQueryStartedErrorToast } from "@/lib/utils";
import { createApi } from "@reduxjs/toolkit/query/react";

export const budgetSlice = createApi({
  reducerPath: "budget",
  baseQuery: baseQueryWithAuth,
  tagTypes: ["Budget"],
  endpoints: (builder) => ({
    getBudget: builder.query<AllBudget, string>({
      query: (date: string) => `${apiRoutes.BUDGET}?date=${date}`,
      onQueryStarted: onQueryStartedErrorToast,
      providesTags: ["Budget"],
    }),
  }),
});

export const { useGetBudgetQuery } = budgetSlice;
