import { configureStore } from "@reduxjs/toolkit";
import formSlice from "./formSlice";
import tabSlice from "./tabSlice";

export const store = configureStore({
  reducer: {
    form: formSlice.reducer,
    tab: tabSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
