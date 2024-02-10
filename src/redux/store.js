"use client";
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storageSession from "reduxjs-toolkit-persist/lib/storage/session";
import authReducer from "./features/auth-slice";
import thunk from "redux-thunk";

const persistConfig = {
  key: "root",
  storage: storageSession,
  // storage,
};
const persistedAuthReducer = persistReducer(persistConfig, authReducer);
export const store = configureStore({
  reducer: {
    // persistedPlanReducer,
    persistedAuthReducer,
    // persistedEditPlanReducer,
  },
  middleware: [thunk],
});

export const persistor = persistStore(store);
