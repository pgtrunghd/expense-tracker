import { createSlice } from "@reduxjs/toolkit";

interface StateProps {
  expand: boolean;
}

const initialState: StateProps = {
  expand: true,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setExpand: (state, action) => {
      state.expand = action.payload;
    },
  },
});

export const { setExpand } = globalSlice.actions;

export default globalSlice.reducer;
