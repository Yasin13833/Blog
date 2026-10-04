import { createSlice } from "@reduxjs/toolkit";

const initialState = { token: null, user: null };

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    addToken: (state, action) => {
      state.token = action.payload?.token || null;
      state.user = action.payload?.user || state.user;
    },
    replaceToken: (state, action) => {
      state.token = action.payload || null;
    },
    setUser: (state, action) => {
      state.user = action.payload || null;
    },
    removeToken: (state) => {
      state.token = null;
      state.user = null;
    },
  },
});

export const { addToken, replaceToken, setUser, removeToken } = authSlice.actions;
export default authSlice.reducer;
