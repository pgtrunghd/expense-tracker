import { apiRoutes } from "@/lib/constants";
import { requestWithToken } from "@/lib/utils";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const incomeSlice = createApi({
  reducerPath: "income",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    prepareHeaders: requestWithToken,
  }),
  tagTypes: ["Income"],
  endpoints: (builder) => ({
    createIncome: builder.mutation({
      query: (data) => ({
        url: apiRoutes.INCOME,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Income"],
    }),
  }),
});

export const { useCreateIncomeMutation } = incomeSlice;
