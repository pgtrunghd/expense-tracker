import { baseQueryWithAuth } from "@/lib/api";
import { apiRoutes } from "@/lib/constants";
import { requestWithToken } from "@/lib/utils";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { balanceSlice } from "./balance.slice";

export const incomeSlice = createApi({
  reducerPath: "income",
  baseQuery: baseQueryWithAuth,
  tagTypes: ["Income"],
  endpoints: (builder) => ({
    createIncome: builder.mutation<void, CreateIncome>({
      query: (data) => ({
        url: apiRoutes.INCOME,
        method: "POST",
        body: data,
      }),
      onQueryStarted(arg, api) {
        api.queryFulfilled.then(() => {
          api.dispatch(balanceSlice.util.invalidateTags(["Balance"]));
        });
      },
      invalidatesTags: ["Income"],
    }),
    updateIncome: builder.mutation<void, CreateIncome & { id: string }>({
      query: ({ id, ...data }) => ({
        url: `${apiRoutes.INCOME}/${id}`,
        method: "PATCH",
        body: data,
      }),
      onQueryStarted(arg, api) {
        api.queryFulfilled.then(() => {
          api.dispatch(balanceSlice.util.invalidateTags(["Balance"]));
        });
      },
      invalidatesTags: ["Income"],
    }),
    getIncome: builder.query<AllIncome, void | Filter>({
      query: (params: Filter) => ({
        url: apiRoutes.INCOME,
        method: "GET",
        params: params,
      }),
      providesTags: ["Income"],
    }),
    deleteIncome: builder.mutation<void, string>({
      query: (id) => ({
        url: `${apiRoutes.INCOME}/${id}`,
        method: "DELETE",
      }),
      onQueryStarted(arg, api) {
        api.queryFulfilled.then(() => {
          api.dispatch(balanceSlice.util.invalidateTags(["Balance"]));
        });
      },
      invalidatesTags: ["Income"],
    }),
  }),
});

export const {
  useCreateIncomeMutation,
  useGetIncomeQuery,
  useUpdateIncomeMutation,
  useDeleteIncomeMutation,
} = incomeSlice;
