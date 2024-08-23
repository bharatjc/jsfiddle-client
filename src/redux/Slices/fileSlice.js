import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: null,
};

export const fileSlice = createSlice({
  name: "file",
  initialState,
  reducers: {
    setFileDetails: (state, action) => {
      state.value = action.payload;
    },
  },
});
export const { setFileDetails } = fileSlice.actions;

export default fileSlice.reducer;
