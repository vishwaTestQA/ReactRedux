import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSliceForPost = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3600',
    // credentials: 'same-orgin',
    // prepareHeaders:(headers) => {
      // const accessToken = localStorage.....
      // if(accessToken){
      //  headers.set("content-Type", "application/json")
    // }
    // } 
    }),
  tagTypes: ['Post', 'User'],
  endpoints: (builder) => ({})
})