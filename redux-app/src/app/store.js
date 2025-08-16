import { configureStore } from "@reduxjs/toolkit";
import { apiSliceForPost } from "../features/api/apiSliceForPost";
import usersReducer from "../features/Users/usersSlice"

import { apiSlice } from "../features/api/apiSlice";
import authReducer from "../features/api/auth/authSlice"

export const store = configureStore({
  reducer:{
    [apiSliceForPost.reducerPath]: apiSliceForPost.reducer,
    // We can add more reducers here, for example:
    // users: usersReducer

    // [apiSlice.reducerPath]: apiSlice.reducer,
    // auth: authReducer
  },
  // Every RTK Query API slice must have its middleware added.
// If you don’t, cache management, request deduplication, and automated refetching won’t work for that slice.

  middleware: getDefaultMiddleware =>
        getDefaultMiddleware()
                 .concat(apiSliceForPost.middleware)
                 .concat(apiSlice.middleware),
  // Enable the Redux DevTools Extension
  devTools: true
})