import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./features/user-slice";
import { expenseSlice } from "./features/expense.slice";
import globalSlice from "./features/global.slice";
import { categorySlice } from "./features/category.slice";
import { incomeSlice } from "./features/income.slice";

export const store = configureStore({
  reducer: {
    [userSlice.reducerPath]: userSlice.reducer,
    [expenseSlice.reducerPath]: expenseSlice.reducer,
    [categorySlice.reducerPath]: categorySlice.reducer,
    [incomeSlice.reducerPath]: incomeSlice.reducer,
    global: globalSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userSlice.middleware,
      expenseSlice.middleware,
      categorySlice.middleware,
      incomeSlice.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
