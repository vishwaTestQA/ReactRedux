import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

export const apiSliceForPost = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3600'}),
  endpoints: (builder) => ({})
})