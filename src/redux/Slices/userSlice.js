import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: null,
  userDetails: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setReduxUser: (state, action) => {
      state.value = action.payload;
    },
    setUserDetails: (state, action) => {
      state.userDetails = action.payload;
    },
  },
});

export const { setReduxUser, setUserDetails } = userSlice.actions;

export default userSlice.reducer;
