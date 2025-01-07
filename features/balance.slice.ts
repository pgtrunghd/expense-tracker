import { baseQueryWithAuth } from "@/lib/api";
import { apiRoutes } from "@/lib/constants";
import { onQueryStartedErrorToast } from "@/lib/utils";
import { createApi } from "@reduxjs/toolkit/query/react";

export const balanceSlice = createApi({
  reducerPath: "balance",
  baseQuery: baseQueryWithAuth,
  tagTypes: ["Balance"],
  endpoints: (builder) => ({
    getBalance: builder.query<Balance, void>({
      query: () => apiRoutes.BALANCE.INDEX,
      onQueryStarted: onQueryStartedErrorToast,
      providesTags: ["Balance"],
    }),
    getOverview: builder.query<Balance, string>({
      query: (date: string) => `${apiRoutes.BALANCE.OVERVIEW}?date=${date}`,
      onQueryStarted: onQueryStartedErrorToast,
      providesTags: ["Balance"],
    }),
  }),
});

export const { useGetBalanceQuery, useGetOverviewQuery } = balanceSlice;
