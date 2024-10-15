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
      query: () => apiRoutes.BALANCE,
      onQueryStarted: onQueryStartedErrorToast,
      providesTags: ["Balance"],
    }),
  }),
});

export const { useGetBalanceQuery } = balanceSlice;
