import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./Slices/appSlice";

export const store = configureStore({
  reducer: {
    task: appSlice,
  },
});
