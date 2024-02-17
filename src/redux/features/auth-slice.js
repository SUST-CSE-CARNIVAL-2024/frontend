"use client";
import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  value: {
    email: "",
    password: "",
  },
};

export const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signIn: (state, action) => {
      return {
        value: {
          ...state.value,
          email: action.payload,
        },
      };
    },
    //set the info from signup page , email and password
    setUserandPassword: (state, action) => {
      return {
        value: {
          ...state.value,
          email: action.payload.email,
          password: action.payload.password,
        },
      };
    },
    signOut: (state, action) => {
      return {
        value: {
          ...state.value,
          email: "",
          password: "",
        },
      };
    },
  },
});

export const { signIn, signOut, setUserandPassword } = auth.actions;

export default auth.reducer;
