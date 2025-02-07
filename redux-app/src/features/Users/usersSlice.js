import { createAsyncThunk, createEntityAdapter, createSelector, createSlice } from "@reduxjs/toolkit";
// import axios from "../../../AuthComp2024/api/axios";
import axios from 'axios';
import { apiSliceForPost } from "../api/apiSliceForPost";

// const initialState = [
//   // {id:'1', name:'user1'},
//   // {id:'2', name:'user2'}
// ]

// export const fetchUsers = createAsyncThunk('users/fetchUsers', async()=>{
//   try {
//     const response = await axios.get('https://jsonplaceholder.typicode.com/users')
//     return response.data;
//   } catch (error) {
//     return error.message;
//   }
// })

// export const usersSlice = createSlice({
//   name: 'users',
//   initialState,
//   reducers:{
//     addUser: (state, action) =>{
//       state.push(action.payload);
//     }
//   },
//   extraReducers(builder){
//     builder.addCase(fetchUsers.fulfilled, (state, action)=>{
//       state.push(action.payload);   //can push or concat inside slice
//     })
//   }
// })

// export const selectAllUsers = (state) => state.users;
// export const selectUserById = (state, postId) => state.users.flat().find(usr => Number(postId) === Number(usr.id)) 
// export const {addUser} = usersSlice.actions;
// export default usersSlice.reducer;


const usersAdapter = createEntityAdapter({});

const initialState = usersAdapter.getInitialState();

export const extendedUserSlice = apiSliceForPost.injectEndpoints({
  endpoints: builder => ({
    getUsers: builder.query({
      query: () => '/users',
      transformResponse: responseData => {
       return usersAdapter.setAll(initialState, responseData)
      },
      providesTags: (result, err, arg) => [
        {type: 'User', id: "LIST"},
        ...result.ids.map(id => ({id: 'User', id}))
      ]
    })
  })
})

export const {
   useGetUsersQuery
} = extendedUserSlice

//returns the query result object
export const selectUserResult = extendedUserSlice.endpoints.getUsers.select();

const selectUserData = createSelector(
  selectUserResult,
  userData => userData.data
)

export const{
  selectAll : selectAllUsers,
  selectById: selectUserById,
  selectIds: selectUsersIds
} = usersAdapter.getSelectors(state => selectUserData(state) ?? initialState)
