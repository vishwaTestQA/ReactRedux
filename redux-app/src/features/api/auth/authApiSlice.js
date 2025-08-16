import { apiSlice } from "../apiSlice";

const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builer => {{
         builer.mutation({
            login: {
                query: (credentials) => ({
                    url: '/auth',
                    method: 'POST',
                    body: {...credentials}
                })
            }
        })
    }}
})

export const {
    useLoginMutation
} = authApiSlice;