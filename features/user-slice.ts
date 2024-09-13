import { apiRoutes } from "@/lib/constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userSlice = createApi({
  reducerPath: "user",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
  }),
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (newUser) => ({
        url: apiRoutes.USER.REGISTER,
        method: "POST",
        body: newUser,
      }),
    }),

    signIn: builder.mutation({
      query: (data) => ({
        url: apiRoutes.AUTH.LOGIN,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useCreateUserMutation, useSignInMutation } = userSlice;
