import { configureStore } from "@reduxjs/toolkit";
import themeSlice from "./Slices/themeSlice";
import userSlice from "./Slices/userSlice";
import fileSlice from "./Slices/fileSlice";

const store = configureStore({
  reducer: {
    theme: themeSlice,
    user: userSlice,
    file: fileSlice,
  },
});

export default store;
