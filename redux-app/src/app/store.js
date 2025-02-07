import { configureStore } from "@reduxjs/toolkit";
import { apiSliceForPost } from "../features/api/apiSliceForPost";
import usersReducer from "../features/Users/usersSlice"

export const store = configureStore({
  reducer:{
    [apiSliceForPost.reducerPath]: apiSliceForPost.reducer,
    // users: usersReducer
  },
  middleware: getDefaultMiddleware => 
        getDefaultMiddleware().concat(apiSliceForPost.middleware),
  devTools: true
})