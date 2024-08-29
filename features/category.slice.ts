import apiRoutes from "@/lib/constants";
import { authWithToken, onQueryStartedErrorToast } from "@/lib/utils";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const categorySlice = createApi({
  reducerPath: "category",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    prepareHeaders: authWithToken,
  }),
  endpoints: (builder) => ({
    getCategories: builder.query<any, any>({
      query: () => apiRoutes.CATEGORY,
      onQueryStarted: onQueryStartedErrorToast,
    }),
  }),
});

export const { useGetCategoriesQuery } = categorySlice;
