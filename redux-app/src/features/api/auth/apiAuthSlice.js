import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout, setCredentials } from "./authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:3500',
  credentials: 'include', // This allows cookies to be sent with requests (for http only cookies)
    prepareHeaders: (headers, {getState}) => {    // This function allows us to set headers before making a request
                                                 // Here we can access the state to get the token
                                                // and set it in the headers if it exists  
        console.log("===============auth ",getState().auth);                                        
        const token = getState().auth.token;
        if(token){
               headers.set("authorization", `Bearer ${token}`);
            }
          return headers;
    }  
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);
    if(result?.error?.originalStatus === 403){ // If the response is forbidden, we need to refresh the token
      console.log("Sending refresh token");
      // Here we can call an endpoint to refresh the token
      const refreshResult = await baseQuery('/auth/refresh', api, extraOptions);
      console.log("Refresh result:", refreshResult);
      if(refreshResult?.data){ // If the refresh was successful, we can set the new token in the state
        // api.dispatch(setCredentials({user: refreshResult.data.user, accessToken: refreshResult.data.accessToken}));
        const user = api.getState().auth.user; // Get the current user from the state
        api.dispatch(setCredentials({...refreshResult.data, user}));
        result = await baseQuery(args, api, extraOptions); // Retry the original query with the new token
      } else {  
        api.dispatch(logout())
      }
    }

    return result; // Return the result of the query 
}

export const apiAuthSlice = createApi({
  reducerPath: 'apiAuth',
  baseQuery: baseQueryWithReauth,
  endpoints: builder => ({})
})

