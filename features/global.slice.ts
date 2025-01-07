import { createSlice } from "@reduxjs/toolkit";

interface StateProps {
  expand: boolean;
  date: string;
}

const initialState: StateProps = {
  expand: true,
  date: new Date().toISOString(),
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setExpand: (state, action) => {
      state.expand = action.payload;
    },
    changeDate: (state, action) => {
      state.date = action.payload;
    },
  },
});

export const { setExpand, changeDate } = globalSlice.actions;

export default globalSlice.reducer;
