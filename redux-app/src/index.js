import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { ApiProvider } from '@reduxjs/toolkit/query/react';   
import { apiSlice } from './features/api/apiSlice';   // just like context provider, we need to provide our slice to the app
import { store } from './app/store';
import { extendedApiSlice } from './features/posts/postSlice';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { extendedUserSlice } from './features/Users/usersSlice';

store.dispatch(extendedApiSlice.endpoints.getAllPosts.initiate());
store.dispatch(extendedUserSlice.endpoints.getUsers.initiate());

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}> 
      <BrowserRouter>
      <Routes>
        <Route path='/*' element={<App />}/>
    </Routes>
    </BrowserRouter>
    </Provider>
  
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals