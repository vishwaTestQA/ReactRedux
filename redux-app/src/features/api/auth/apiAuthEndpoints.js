import { apiAuthSlice } from "./apiAuthSlice";

export const apiAuthEndpoints = apiAuthSlice.injectEndpoints({
    endpoints: (builder) => ({
            register: builder.mutation({
                query: (credentials) => ({
                    url: '/auth/register',
                    method: 'POST',
                    body: credentials
                })
            }),
            login: builder.mutation({
                query: (credentials) => ({
                    url: '/auth/login',
                    method: 'POST',
                    body: credentials
                })
            }),
        // builder.query({
        //     getAllUser: { 
        //         query: () => '/auth/users',
        //         providesTags: ['User'] // This will allow us to invalidate the cache for this endpoint          
        //     }
        //     })
    })
})

export const { useRegisterMutation, useLoginMutation } = apiAuthEndpoints;