import { baseQueryWithAuth } from "@/lib/api";
import { apiRoutes } from "@/lib/constants";
import { onQueryStartedErrorToast, requestWithToken } from "@/lib/utils";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const categorySlice = createApi({
  reducerPath: "category",
  baseQuery: baseQueryWithAuth,
  tagTypes: ["Category"],
  endpoints: (builder) => ({
    getCategories: builder.query<AllCategory, boolean | void>({
      query: () => apiRoutes.CATEGORY,
      onQueryStarted: onQueryStartedErrorToast,
      providesTags: ["Category"],
    }),
    getDailyCategory: builder.query<any, string | void>({
      query: (date: string) => ({
        url: `${apiRoutes.CATEGORY}/by-day?date=${date.toString()}`,
      }),
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
      query: ({ id, ...data }) => ({
        url: `${apiRoutes.CATEGORY}/${id}`,
        method: "PATCH",
        body: data,
      }),
      onQueryStarted: onQueryStartedErrorToast,
      invalidatesTags: ["Category"],
    }),
    deleteCategory: builder.mutation<any, any>({
      query: (id) => ({
        url: `${apiRoutes.CATEGORY}/${id}`,
        method: "DELETE",
      }),
      onQueryStarted: onQueryStartedErrorToast,
      invalidatesTags: ["Category"],
    }),
    getTopExpenseByCategory: builder.query<Category[], string | void>({
      query: (date: string) =>
        `${apiRoutes.CATEGORY}/top-expenses?date=${date}`,
      onQueryStarted: onQueryStartedErrorToast,
      providesTags: ["Category"],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useGetDailyCategoryQuery,
  useGetTopExpenseByCategoryQuery,
} = categorySlice;
