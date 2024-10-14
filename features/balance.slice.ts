import { baseQueryWithAuth } from "@/lib/api";
import { apiRoutes } from "@/lib/constants";
import { onQueryStartedErrorToast } from "@/lib/utils";
import { createApi } from "@reduxjs/toolkit/query/react";

export const balanceSlice = createApi({
  reducerPath: "balance",
  baseQuery: baseQueryWithAuth,
  tagTypes: ["Balance"],
  endpoints: (builder) => ({
    getBalance: builder.query<number, void>({
      query: () => apiRoutes.BALANCE,
      onQueryStarted: onQueryStartedErrorToast,
    }),
  }),
});

export const { useGetBalanceQuery } = balanceSlice;
