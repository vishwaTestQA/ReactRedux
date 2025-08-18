//all endpoints resides here to do necessary operation with users

import { createEntityAdapter, createSelector } from "@reduxjs/toolkit"; 
import { apiSliceForPost } from "../api/apiSliceForPost";

const usersAdapter = createEntityAdapter({
    sortComparer: (a, b) => a.username.localeCompare(b.username),
});

const initialState = usersAdapter.getInitialState();

const extendedApiSlice = apiSliceForPost.injectEndpoints({
    endpoints: builder => ({
        getAllUsers: builder.query({
            query: () => '/users',
            transformResponse: response => {
                return usersAdapter.setAll(initialState, response);
            },

            // don’t really need providesTags for getAllUsers
            
            // providesTags: (result, error, arg) => [
            //     { type: 'User', id: "LIST" },
            //     ...result.ids.map(id => ({ type: 'User', id }))
            // ]
        })
    })
});

export const { useGetAllUsersQuery } = extendedApiSlice;

//This is RTK Query’s auto-generated selector for the getAllUsers endpoint.
//It gives you access to the full query cache state for that endpoint.
const selectUserResult = extendedApiSlice.endpoints.getAllUsers.select();

const selectUserData = createSelector(
    selectUserResult,       //This holds the full raw query result object 
    userData => userData.data   // from the raw result object, we extract the data property
);

// export const {
//     selectAll: selectAllUsers,  // to select all users
//     selectById: selectUserById, // to select user by id
// } = usersAdapter.getSelectors(state => state.extendedApiSlice.getAllUsers);

export const {
    selectAll: selectAllUsers,  // to select all users
    selectById: selectUserById, // to select user by id
} = usersAdapter.getSelectors(state => selectUserData(state) ?? initialState);


// In authSlice we directly used generated hook to get the data, 
// but here we are using createSelector to get the data from the query result object.

// eg how the above code works:
// export const selectUserById = (state, userId) => {
//     return selectUserData(state)?.entities[userId];
// };
// generated hook vs createSelector ?  notes in RTK notes 