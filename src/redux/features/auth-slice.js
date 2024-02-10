"use client";
import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "../store";
const initialState = {
  value: {
    user: "",
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
          user: action.payload,
        },
      };
    },
    signOut: (state, action) => {
      return {
        value: {
          ...state.value,
          user: "",
        },
      };
    },
  },
});

export const { signIn, signOut } = auth.actions;

export default auth.reducer;
