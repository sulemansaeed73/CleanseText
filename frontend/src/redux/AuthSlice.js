import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  name: "",
  email: "",
  number: "",
  token: "",
  isLoggedIn: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUsers: (state, actions) => {
      Object.assign(state, actions.payload);
    },
    logout: (state, actions) => {
      state.isLoggedIn = false;
      state.id = "",
      state.name = "",
      state.email = "",
      state.number = "",
      state.token = "";
    },
  },
});

export const { setUsers, logout } = authSlice.actions;
export default authSlice.reducer;
