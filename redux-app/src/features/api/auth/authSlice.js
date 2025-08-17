import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: 'auth',
    initialState: {
         user: null,
         token: null,
         roles: [] // Assuming roles are part of the payload
    },
     reducers:{
        setCredentials: (state, action) => {
            const {user, roles, token} = action.payload;
            state.user = user;
            state.token = token;
            state.roles = roles; // Assuming roles are part of the payload
        },
        logout: (state) => {  
            state.user = null;
            state.token = null;
        }
     }
    });

    export const {setCredentials, logout} = authSlice.actions;
    export default authSlice.reducer;

    export const selectCurrentUser = (state) => state.auth.user;
    export const selectCurrentToken = (state) => state.auth.token;
    export const selectCurrentRoles = (state) => state.auth.roles;