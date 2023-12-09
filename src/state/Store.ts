import { configureStore } from "@reduxjs/toolkit";

// reducers
import UsersReducers from "./users/slice";

export const store = configureStore({
  reducer: {
    Users: UsersReducers,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
