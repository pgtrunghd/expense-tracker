import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { Mutex } from "async-mutex";
import { apiRoutes } from "./constants";

const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  prepareHeaders: (headers: Headers) => {
    const store = localStorage.getItem("user");
    if (store) {
      const user = JSON.parse(store);
      headers.set("Authorization", `Bearer ${user.access_token}`);
    }
  },
});

export const baseQueryWithAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (arg, api, extraOptions) => {
  await mutex.waitForUnlock();
  let result = await baseQuery(arg, api, extraOptions);

  if (result.error && result.error.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        const store = localStorage.getItem("user");
        if (!store) {
          localStorage.removeItem("user");
          window.location.href = "/login";
          return result;
        }
        const user = JSON.parse(store);
        const res = await baseQuery(
          {
            url: apiRoutes.AUTH.REFRESH,
            method: "POST",
            body: {
              userId: user.id,
              refreshToken: user.refresh_token,
            },
          },
          api,
          extraOptions,
        );
        if (res.data) {
          Object.assign(user, res.data);
          localStorage.setItem("user", JSON.stringify(user));
          result = await baseQuery(arg, api, extraOptions);
        } else {
          localStorage.removeItem("user");
          window.location.href = "/login";
          return result;
        }
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
      result = await baseQuery(arg, api, extraOptions);
    }
  }
  return result;
};
