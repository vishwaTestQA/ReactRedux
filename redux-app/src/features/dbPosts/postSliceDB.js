import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
// import { apiSliceForPost } from "../api/apiSliceForPost";
import { apiAuthSlice } from "../api/auth/apiAuthSlice";

//CreateEntityAdaptor  is a utility from Redux Toolkit (RTK) that helps you
//  manage normalized state for collections (like lists of posts, users, etc.).
// The createEntityAdapter function accepts an options object with two optional properties:
// 1) selectID 2)sortComparer
const postsAdapter = createEntityAdapter({
    // sortComparer: (a, b) => b.date.localeCompare(a.date),
    // selectId: (entity) => entity.uuid // if your entity uses `uuid` instead of `id`
    // (or)
    // sortComparer: (a,b) => {
    //     const dateA = new Date(a.updatedAt).getTime()
    //     const dateB = new Date(b.updatedAt).getTime()
    //     return dateB-dateA
    // },
    //  selectId: (post) => post.allPost._id,
})

const initialState = postsAdapter.getInitialState()

export const extendedApiSlicePostDB = apiAuthSlice.injectEndpoints({
    endpoints: builder => ({
        getAllPosts: builder.query({
            query: () => '/post',
            transformResponse: responseData => {
                // console.log("postSlice", responseData)
                const loadedPosts = responseData.allPost.map(post => {
                    console.log("vsfsssdffgg", responseData.allPost);
                    return post;
                });
                return postsAdapter.setAll(initialState, loadedPosts)
            },
            providesTags: (result, error, arg) => [
                { type: 'Post', id: "LIST" },                          //name given as List
                ...result.ids.map(id => ({ type: 'Post', id }))
            ]
        }),

        getAllPostsbyLimit: builder.query({
            query: ({page = 1, limit = 10}) => `/post?page=${page}&limit=${limit}`,
            transformResponse: responseData => {
                console.log("postSlice in byLimit", responseData)
                const posts = postsAdapter.addMany(initialState, responseData)
                return {
                   ...posts,
                   page: responseData.page,
                   totalPages: responseData.totalPages,
                   totalDocs: responseData.totalDocs,
                }
                // return postsAdapter.setAll(initialState, loadedPosts)
            },
            providesTags: (result, error, arg) => [
                { type: 'Post', id: "LIST" },                          //name given as List
                ...result.ids.map(id => ({ type: 'Post', id: "PARTIAL-LIST" }))
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
                url: `/post/${initialPost.id}`,
                // url: `/posts?id=${initialPost.id}`,
                method: 'PATCH',
                body: {
                    ...initialPost,
                    // userId: Number(initialPost.userId),
                    // date: new Date().toISOString()
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Post', id: arg.id }
            ]
        }),
        deletePost: builder.mutation({
            query: ({ id }) => ({
                url: `/post/${id}`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Post', id: arg.id }
            ]
        }),
        addComments: builder.mutation({
            query: (comments) => ({
               url: 'post/comments',
               method: 'POST',
               body:{
                ...comments
               }
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
// export const selectPostResult = extendedApiSlicePostDB.endpoints.getAllPosts.select();

//this is just an method declaration
export const selectPostResult = (page, limit) => extendedApiSlicePostDB.endpoints.getAllPostsbyLimit.select({page, limit});
// export const postD = (data) => postsAdapter.getSelectors().selectAll(data)


//create memoized selector
// const selectPostsData = createSelector(
//   selectPostResult,
//   postsResult => {console.log("postResult", postsResult); return postsResult.data ?? initialState   }    //normalized state object with ids and entities
// )

//for pagination
const selectPostsData = (page, limit) =>
 createSelector(
  selectPostResult(page, limit),
  (postsResult) => {console.log("postResult", postsResult); return postsResult?.data ?? initialState   }    //normalized state object with ids and entities
)

// export const{
//   selectAll : selectAllPosts,
//   selectById: selectPostById,
//   selectIds: selectPostIds,
//   selectEntities: selectEntities
// } = postsAdapter.getSelectors(state => selectPostsData(state) ?? initialState)
//These selectors will work with the client cache

//for pagination
export const{
  selectAll : selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds,
  selectEntities: selectEntities
} = postsAdapter.getSelectors((state, page, limit) => selectPostsData(page,limit)(state) ?? initialState)

export const {
    useGetAllPostsQuery,
    useGetPostsByUserIdQuery,
    useGetAllPostsbyLimitQuery,
    useAddNewPostMutation,
    useUpdatePostMutation,
    useDeletePostMutation,
    useAddReactionMutation,
    useAddCommentsMutation
} = extendedApiSlicePostDB        //These auto gen hooks will interact with server 
                                  // and update the client cache throuh createEntityAdaptor


//This is for to get the spoecific fields from the allpost
// export const selectPostsByAuthor  = createSelector(
//     [selectAllPosts,(_, authorId) => authorId],
//     (posts, authorId) => posts.filter(post => post.authorId === authorId)
// )
export const selectPostsByAuthor  = createSelector(
    [selectAllPosts, (_, authorId) => authorId],
    (posts, authorId) => posts.filter(post => post.authorId === authorId)
)


// export const selectCommentsByPost = createSelector(
//     [selectAllPosts, (_, postId) => postId],
//     (post, postId) => posts.filter(post => post.)
// )

// This is for selecting 
// export const userPosts = useSelector(state => selectPostsByAuthor(state, authorId))
