//all endpoints resides here to do necessary operation with users

import { createEntityAdapter, createSelector } from "@reduxjs/toolkit"; 
import { apiSliceForPost } from "../api/apiSliceForPost";

const usersAdapter = createEntityAdapter({
    sortComparer: (a, b) => a.username.localeCompare(b.username),
    selectId: (user) => user._id,
});

const initialState = usersAdapter.getInitialState();

export const extendedApiSliceDB = apiSliceForPost.injectEndpoints({
    endpoints: builder => ({
        getAllUsers: builder.query({
            query: () => '/users',
            transformResponse: response => {
                // const userData = response || [];
                // console.log("userdata", userData)
                // const normalizedData = userData.map(user => ({ 
                //      ...user, id: user._id}
                //     ));
                // console.log("userdata", userData)
                return usersAdapter.setAll(initialState, response.users);
            },

           // don’t really need providesTags for getAllUsers 
            providesTags: (result, error, arg) => [
                { type: 'User', id: "LIST" },
                ...result.ids.map(id => ({ type: 'User', id }))
            ]
        }),

        getUserById: builder.query({
           query: (id) => `users/${id}`
        }),
        providesTags: (result, error, arg) => [
                { type: 'User', id: "LIST" },
                ...result.ids.map(id => ({ type: 'User', id }))
        ]
    })
});

export const { useGetAllUsersQuery, useGetUserByIdQuery } = extendedApiSliceDB;

//This is RTK Query’s auto-generated selector for the getAllUsers endpoint.
//It gives you access to the full query cache state for that endpoint.
export const selectUserResult = extendedApiSliceDB.endpoints.getAllUsers.select();

const selectUserData = createSelector(
    selectUserResult,       //This holds the full raw query result object 
    userData =>{ console.log("======", userData); return userData.data }  // from the raw result object, we extract the data property
);

// export const {
//     selectAll: selectAllUsers,  // to select all users
//     selectById: selectUserById, // to select user by id
// } = usersAdapter.getSelectors(state => state.extendedApiSlice.getAllUsers);

export const {
    selectAll: selectAllUsers,  // to select all users
    selectById: selectUserById, // to select user by id
    selectIds: selectUsersIds,   // it selects only the ids
    selectEntities: selectUserEntities
} = usersAdapter.getSelectors(state => selectUserData(state) ?? initialState);


// In authSlice we directly used generated hook to get the data, 
// but here we are using createSelector to get the data from the query result object.

// eg how the above code works:
// export const selectUserById = (state, userId) => {
//     return selectUserData(state)?.entities[userId];
// };
// generated hook vs createSelector ?  notes in RTK notes 