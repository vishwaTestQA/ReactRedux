import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: 'auth',
    initialState: {
         user: null,
         token: null,
         roles: [],// Assuming roles are part of the payload
         id: null,
         profilePicture: null,
    },
     reducers:{
        setCredentials: (state, action) => {
            const {user, roles, token, id, profilePicture} = action.payload;
            state.user = user;
            state.token = token;
            state.roles = roles; // Assuming roles are part of the payload
            state.id = id;
            state.profilePicture = profilePicture
        },
        logout: (state) => {  
            state.user = null;
            state.token = null;
            state.roles = null;
            state.id = null
            state.profilePicture=null
        }
     }
    });

    export const {setCredentials, logout} = authSlice.actions;
    export default authSlice.reducer;

    export const selectCurrentUser = (state) => state.auth.user;
    export const selectCurrentToken = (state) => state.auth.token;
    export const selectCurrentRoles = (state) => state.auth.roles;
    export const selectCurrentId = (state) => state.auth.id;
    export const selectCurrentProfilePic = (state) => state.auth.profilePicture