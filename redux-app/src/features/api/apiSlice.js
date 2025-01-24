//Here we create methods to interact with api , resembles like axios
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"

export const apiSlice = createApi({
  reducerPath: 'api',   //its default name, but we can give any name
  baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3600'}), // similar to axios
  tagTypes:['Todos'],
  endpoints: (builder)=>({         //similar to builder case in redux toolkit     
    getTodos: builder.query({       //method name specified and also its a query, means
          query: () => '/todos',           //fetching data from the endpoints
          providesTags: ['Todos'],
          transformResponse: res => res.sort((a,b)=> b.id - a.id)
        }),
        addTodo: builder.mutation({
          query: (todo) => ({
            url: '/todos',
            method: 'POST',
            body: todo
          }),
          invalidatesTags: ['Todos']
        })
  })

})

export const {
   useGetTodosQuery,   //allow us to call custom hook based on the methods name we provide
   useAddTodoMutation
} = apiSlice;