import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { sub } from 'date-fns';
import { apiSliceForPost } from "../api/apiSliceForPost";
import { useSelector } from "react-redux";

//CreateEntityAdaptor  is a utility from Redux Toolkit (RTK) that helps you
//  manage normalized state for collections (like lists of posts, users, etc.).
// The createEntityAdapter function accepts an options object with two optional properties:
// 1) selectID 2)sortComparer
const postsAdapter = createEntityAdapter({
    // sortComparer: (a, b) => b.date.localeCompare(a.date),
    // selectId: (entity) => entity.uuid // if your entity uses `uuid` instead of `id`
    // (or)
     selectId: (post) => post._id,
})

const initialState = postsAdapter.getInitialState()

export const extendedApiSlicePostDB = apiSliceForPost.injectEndpoints({
    endpoints: builder => ({
        getAllPosts: builder.query({
            query: () => '/post',
            transformResponse: responseData => {
                // let min = 1;
                const loadedPosts = responseData.allPost.map(post => {
                    // if (!post?.date) post.date = sub(new Date(), { minutes: min++ }).toISOString();
                    // if (!post?.reactions) post.reactions = {
                    //     thumbsUp: 0,
                    //     wow: 0,
                    //     heart: 0,
                    //     rocket: 0,
                    //     coffee: 0
                    // }
                    console.log("vsfsssdffgg", responseData.allPost);
                    //  if(!post.reactions || post.reactions == 'undefined' || post.reactions.length<=0){
                    //     post.reactions = {
                    //     like: 0,
                    //     dislike: 0,
                    //     love: 0,
                    //     laugh: 0,
                    //     sad: 0,
                    //     angry: 0, 
                    //     }
                    // }
                    return post;
                });
                return postsAdapter.setAll(initialState, loadedPosts)
            },
            providesTags: (result, error, arg) => [
                { type: 'Post', id: "LIST" },                          //name given as List
                ...result.ids.map(id => ({ type: 'Post', id }))
            ]
        }),
        addReaction: builder.mutation({
           query: (reaction) => ({
              url: `/post/addReactions`,
              method: `POST`,
              body: {
                // postId,
                // type,
                // userId
                ...reaction
              }
           }),
            //  providesTags: (result, error, arg) => [
            //     { type: 'Post', id: "LIST" },   
            //     // {type: 'Post', id: postId},                      //name given as List
            //     ...result.ids.map(id => ({ type: 'Post', id }))
            // ]
               invalidatesTags: [
                { type: 'Post', id: "LIST" }
            ]

            // async onQueryStarted(reaction, { dispatch, queryFulfilled }) {
            //     // `updateQueryData` requires the endpoint name and cache key arguments,
            //     // so it knows which piece of cache state to update
            //     const {postId} = reaction
            //     const patchResult = dispatch(
            //         // updateQueryData takes three arguments: the name of the endpoint to update, the same cache key value used to identify the specific cached data, and a callback that updates the cached data.
            //         extendedApiSlicePostDB.util.updateQueryData('getAllPosts', undefined, draft => {
            //             // The `draft` is Immer-wrapped and can be "mutated" like in createSlice
            //             console.log("entities",draft.entities[postId])
            //             const post = draft.entities[postId]
            //             // if (post) post.reactions = reaction
            //         })
            //     )
            //     try {
            //         await queryFulfilled
            //     } catch {
            //         patchResult.undo()
            //     }
            // }
        }),
        
        getPostsByUserId: builder.query({
            query: id => `/post/?userId=${id}`,
            transformResponse: responseData => {
                // let min = 1;
                const loadedPosts = responseData.allPost.map(post => {
                //     if (!post?.date) post.date = sub(new Date(), { minutes: min++ }).toISOString();
                //     if (!post?.reactions) post.reactions = {
                //         thumbsUp: 0,
                //         wow: 0,
                //         heart: 0,
                //         rocket: 0,
                //         coffee: 0
                //     }
                console.log("post in getPostsByUser", post);
                    return post;
                });
                // console.log("getPostByUser", responseData)
                return postsAdapter.setAll(initialState, loadedPosts)
            },
            
            providesTags: (result = [], error, arg) => 
                result.length ? [
                ...result.ids.map(id => ({ type: 'Post', id }))
            //       ...result.map(post => ({ type: 'Post', id: post._id})),
            //   { type: 'Post', id: 'LIST' }
            ]
            : [{ type: 'Post', id: 'LIST' }]
        }),
        addNewPost: builder.mutation({
            query: initialPost => ({
                url: '/post',
                method: 'POST',
                body: {
                    ...initialPost,
                    // authorId: Number(initialPost.userId),
                    authorId: initialPost.userId,
                    // date: new Date().toISOString(),  lets mongoose handle it in backend
                    // reactions: {         //seperate model for reactions are recom
                    //     thumbsUp: 0,
                    //     wow: 0,
                    //     heart: 0,
                    //     rocket: 0,
                    //     coffee: 0
                    // }
                }
            }),
            invalidatesTags: [
                { type: 'Post', id: "LIST" }
            ]
        }),
        updatePost: builder.mutation({
            query: initialPost => ({
                url: `/posts/${initialPost.id}`,
                // url: `/posts?id=${initialPost.id}`,
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
        addReactionxxxxxx: builder.mutation({

             //Sends a PATCH request to update the reactions for a specific post (postId) on the server.
       //The new reactions object is sent in the request body.
            query: ({ postId, reactions }) => ({
                url: `posts/${postId}`,
                method: 'PATCH',
                // In a real app, we'd probably need to base this on user ID somehow
                // so that a user can't do the same reaction more than once
                body: { reactions }
            }),

            // Optimistic Update:
            // Immediately updates the reactions for the post in the local cache so the UI reflects the change instantly.
            // Rollback on Error:
           // If the server request fails (await queryFulfilled throws), it undoes the optimistic update using patchResult.undo().
            async onQueryStarted({ postId, reactions }, { dispatch, queryFulfilled }) {
                // `updateQueryData` requires the endpoint name and cache key arguments,
                // so it knows which piece of cache state to update
                const patchResult = dispatch(
                    // updateQueryData takes three arguments: the name of the endpoint to update, the same cache key value used to identify the specific cached data, and a callback that updates the cached data.
                    extendedApiSlicePostDB.util.updateQueryData('getAllPosts', undefined, draft => {
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
export const selectPostResult = extendedApiSlicePostDB.endpoints.getAllPosts.select();

//create memoized selector
const selectPostsData = createSelector(
  selectPostResult,
  postsResult => {console.log("postResult", postsResult);return postsResult.data ?? initialState   }    //normalized state object with ids and entities
)

export const{
  selectAll : selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds
} = postsAdapter.getSelectors(state => selectPostsData(state) ?? initialState)
//These selectors will work with the client cache

export const {
    useGetAllPostsQuery,
    useGetPostsByUserIdQuery,
    useAddNewPostMutation,
    useUpdatePostMutation,
    useDeletePostMutation,
    useAddReactionMutation
} = extendedApiSlicePostDB        //These auto gen hooks will interact with server 
                                  // and update the client cache throuh createEntityAdaptor


//This is for to get the spoecific fields from the allpost
export const selectPostsByAuthor  = createSelector(
    [selectAllPosts,(_, authorId) => authorId],
    (posts, authorId) => posts.filter(post => post.authorId === authorId)
)

// This is for selecting 
// export const userPosts = useSelector(state => selectPostsByAuthor(state, authorId))
