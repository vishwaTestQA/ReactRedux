import { configureStore } from "@reduxjs/toolkit";
import { apiSliceForPost } from "../features/api/apiSliceForPost";
import usersReducer from "../features/dbUsers/usersSliceDB"
import { apiAuthSlice } from "../features/api/auth/apiAuthSlice";
import authReducer from "../features/api/auth/authSlice";


export const store = configureStore({
  reducer:{
    [apiSliceForPost.reducerPath]: apiSliceForPost.reducer,
    // We can add more reducers here, for example:
    // users: usersReducer,

    [apiAuthSlice.reducerPath]: apiAuthSlice.reducer,
    auth: authReducer     // This makes getState().auth available in the prepareHeaders function
  },
  // Every RTK Query API slice must have its middleware added.
// If you don’t, cache management, request deduplication, and automated refetching won’t work for that slice.

  middleware: getDefaultMiddleware =>
        getDefaultMiddleware()
                 .concat(apiSliceForPost.middleware)
                 .concat(apiAuthSlice.middleware),
  // Enable the Redux DevTools Extension
  devTools: true
})