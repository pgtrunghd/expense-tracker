import apiRoutes from "@/lib/constants";
import { authWithToken, onQueryStartedErrorToast } from "@/lib/utils";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const categorySlice = createApi({
  reducerPath: "category",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    prepareHeaders: authWithToken,
  }),
  tagTypes: ["Category"],
  endpoints: (builder) => ({
    getCategories: builder.query<any, any>({
      query: () => apiRoutes.CATEGORY,
      onQueryStarted: onQueryStartedErrorToast,
      providesTags: ["Category"],
    }),
    createCategory: builder.mutation<any, any>({
      query: (data) => ({
        url: apiRoutes.CATEGORY,
        method: "POST",
        body: data,
      }),
      onQueryStarted: onQueryStartedErrorToast,
      invalidatesTags: ["Category"],
    }),
    updateCategory: builder.mutation<any, any>({
      query: ({id, ...data}) => ({
        url: `${apiRoutes.CATEGORY}/${id}`,
        method: "PATCH",
        body: data,
      }),
      onQueryStarted: onQueryStartedErrorToast,
      invalidatesTags: ["Category"],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
} = categorySlice;
