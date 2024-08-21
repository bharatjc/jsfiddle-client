import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dark: "dark",
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.dark = state.dark === "dark" ? "light" : "dark";
    },
  },
});
export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;
