
// import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
// import { apiSliceForPost } from "../api/apiSliceForPost";
// import {sub} from 'date-fns'

// const postAdapter = createEntityAdapter({
//   sortComparer: (a, b) => b.date.localeCompare(a.date)
// });

// const initialState = postAdapter.getInitialState();

// export const extendedApiSlice = apiSliceForPost.injectEndpoints({
//   endpoints: builder =>({
//       getAllPosts: builder.query({
//       query: () => '/posts',
//       transformResponse: responseData => {
//         let min =1;
//         const loadedPost = responseData.map(post=> {
//           if(!post?.date) post.date = sub(new Date(), {minutes: min++}).toISOString()
//           if(!post?.reactions) post.reactions = {
//             thumbsUp: 0,
//             wow: 0,
//             heart: 0,
//             rocket: 0,
//             coffee: 0
//           }  
//           return post;
//         });
//         return postAdapter.setAll(initialState, loadedPost)
//       },
//       providesTags:(result, error, arg) => [
//         {type: 'Post', id: 'LIST'}, 
//         ...result.ids.map(id => ({type: 'Post', id}))
//       ]
//     }),
//     getPostByUserId: builder.query({
//       query: (id) => `posts/?userId=${id}`,
//       transformResponse: responseData => {
//         let min =1;
//         const loadedPost = responseData.map(post => {
//           if(!post.date) post.date = sub(new Date, {minutes:min++}).toISOString()
//           if(!post.reactions) post.reactions = {
//             thumbsUp: 0,
//             wow: 0,
//             heart: 0,
//             rocket: 0,
//             coffee: 0
//           }  
//           return post; 
//         })
//         return postAdapter.setAll(initialState, loadedPost);
//       },
//       providesTags: (result, error, arg) => {
//         console.log(result);
//         return[
//            ...result.ids.map(specificId => ({type:'Post', specificId}))
//         ]
//       }
//     }),

//     addNewPost: builder.mutation({
//       query: newPost => ({
//         method: 'POST',
//         url: '/posts',
//         body:{
//           ...newPost,
//           userId: Number(newPost.userId),
//           date: new Date().toISOString(),
//           reactions:{
//             thumbsUp: 0,
//             wow: 0,
//             heart: 0,
//             rocket: 0,
//             coffee: 0
//           }
//         }
//       }),
//       invalidatesTags:[  
//         {type: 'Post', id: 'LIST'}  //invalidating whole post because this newpost not existed alredy so cant invalidate single post
//       ] 
//     }),
//     updatePost: builder.mutation({
//       query: updatedPost => ({
//         url: `/posts/${updatedPost.id}`,
//         method: 'PUT',
//         body: {
//           ...updatedPost,
//           date: new Date().toISOString()
//         } 
//       }),
//       invalidatesTags: (result, error, arg) => [    //arg was the updatedPost above
//         {type: 'Post', id: arg.id}  //here we r invalidating specific post which alredy exist
//       ]
//     }),
//     deletePost: builder.mutation({
//       query: ({id}) => ({
//         url: `/posts/${id}`,
//         method: 'DELETE',
//         body:{id}
//       }),
//       invalidatesTags:(result, error, arg) =>{
//         return [
//           {type:'Post', id: arg.id}
//         ]
//       }
//     }),
//     addReactions: builder.mutation({
//       query: ({postId, reactions}) => ({
//         url: `posts/${postId}`,
//         method: 'PATCH',
//         // In real world app, we'd probably need to base this on user ID somehow
//         //so that an user cant do the same reaction more than once
//         body: {reactions}
//       }),
//       async onQueryStarted({postId, reactions}, {dispatch, queryFulfilled}){
//         //updateQuesyData requires the endpoint name and cache key arguments,
//         //so it know which peice of cache state to update
//         const patchResult = dispatch(
//           extendedApiSlice.util.updateQueryData('getPosts', undefined, draft =>{
//              //the draft is immer-wrapped and can be "mutated" like in createSlice
//              const post = draft.entities[postId]   //normalized state
//              if(post) post.reactions = reactions;
//           })
//         )
//         try {
//           await queryFulfilled
//         } catch (error) {
//           patchResult.undo();
//         }
//       }
//     })
//   })
// }) 

// //returns the query result object
// export const selectPostResult = extendedApiSlice.endpoints.getAllPosts.select();

// //create memoized selector
// const selectPostsData = createSelector(
//   selectPostResult,
//   postsResult => postsResult.data        //normalized state object with ids and entities
// )

// export const{
//   selectAll : selectAllPosts,
//   selectById: selectPostById,
//   selectIds: selectPostIds
// } = postAdapter.getSelectors(state => selectPostsData(state) ?? initialState)

// export const {
//    useGetAllPostsQuery,
//    useGetPostByUserIdQuery,
//    useAddNewPostMutation,
//    useUpdatePostMutation,
//    useDeletePostMutation,
//    useAddReactionsMutation
// } = extendedApiSlice





import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { sub } from 'date-fns';
import { apiSliceForPost } from "../api/apiSliceForPost";

const postsAdapter = createEntityAdapter({
    sortComparer: (a, b) => b.date.localeCompare(a.date)
})

const initialState = postsAdapter.getInitialState()

export const extendedApiSlice = apiSliceForPost.injectEndpoints({
    endpoints: builder => ({
        getAllPosts: builder.query({
            query: () => '/posts',
            transformResponse: responseData => {
                let min = 1;
                const loadedPosts = responseData.map(post => {
                    if (!post?.date) post.date = sub(new Date(), { minutes: min++ }).toISOString();
                    if (!post?.reactions) post.reactions = {
                        thumbsUp: 0,
                        wow: 0,
                        heart: 0,
                        rocket: 0,
                        coffee: 0
                    }
                    return post;
                });
                return postsAdapter.setAll(initialState, loadedPosts)
            },
            providesTags: (result, error, arg) => [
                { type: 'Post', id: "LIST" },
                ...result.ids.map(id => ({ type: 'Post', id }))
            ]
        }),
        getPostsByUserId: builder.query({
            query: id => `/posts/?userId=${id}`,
            transformResponse: responseData => {
                let min = 1;
                const loadedPosts = responseData.map(post => {
                    if (!post?.date) post.date = sub(new Date(), { minutes: min++ }).toISOString();
                    if (!post?.reactions) post.reactions = {
                        thumbsUp: 0,
                        wow: 0,
                        heart: 0,
                        rocket: 0,
                        coffee: 0
                    }
                    return post;
                });
                return postsAdapter.setAll(initialState, loadedPosts)
            },
            providesTags: (result, error, arg) => [
                ...result.ids.map(id => ({ type: 'Post', id }))
            ]
        }),
        addNewPost: builder.mutation({
            query: initialPost => ({
                url: '/posts',
                method: 'POST',
                body: {
                    ...initialPost,
                    userId: Number(initialPost.userId),
                    date: new Date().toISOString(),
                    reactions: {
                        thumbsUp: 0,
                        wow: 0,
                        heart: 0,
                        rocket: 0,
                        coffee: 0
                    }
                }
            }),
            invalidatesTags: [
                { type: 'Post', id: "LIST" }
            ]
        }),
        updatePost: builder.mutation({
            query: initialPost => ({
                // url: `/posts/${initialPost.id}`,
                url: `/posts?id=${initialPost.id}`,
                method: 'PUT',
                body: {
                    ...initialPost,
                    userId: Number(initialPost.userId),
                    date: new Date().toISOString()
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Post', id: arg.id }
            ]
        }),
        deletePost: builder.mutation({
            query: ({ id }) => ({
                url: `/posts/${id}`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Post', id: arg.id }
            ]
        }),
        addReaction: builder.mutation({
            query: ({ postId, reactions }) => ({
                // url: `posts/${postId}`,
                // method: 'PATCH',
                // In a real app, we'd probably need to base this on user ID somehow
                // so that a user can't do the same reaction more than once
                // body: { reactions }
            }),
            async onQueryStarted({ postId, reactions }, { dispatch, queryFulfilled }) {
                // `updateQueryData` requires the endpoint name and cache key arguments,
                // so it knows which piece of cache state to update
                const patchResult = dispatch(
                    // updateQueryData takes three arguments: the name of the endpoint to update, the same cache key value used to identify the specific cached data, and a callback that updates the cached data.
                    extendedApiSlice.util.updateQueryData('getAllPosts', 'getAllPosts', draft => {
                        // The `draft` is Immer-wrapped and can be "mutated" like in createSlice
                        const post = draft.entities[postId]
                        if (post) post.reactions = reactions
                    })
                )
                try {
                    await queryFulfilled
                } catch {
                    patchResult.undo()
                }
            }
        })
    })
})


//returns the query result object
export const selectPostResult = extendedApiSlice.endpoints.getAllPosts.select();

//create memoized selector
const selectPostsData = createSelector(
  selectPostResult,
  postsResult => postsResult.data        //normalized state object with ids and entities
)

export const{
  selectAll : selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds
} = postsAdapter.getSelectors(state => selectPostsData(state) ?? initialState)

export const {
    useGetAllPostsQuery,
    useGetPostsByUserIdQuery,
    useAddNewPostMutation,
    useUpdatePostMutation,
    useDeletePostMutation,
    useAddReactionMutation
} = extendedApiSlice
