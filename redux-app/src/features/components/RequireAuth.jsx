import React from 'react'
import { selectCurrentToken } from '../api/auth/authSlice'
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const RequireAuth = () => {
    const token = useSelector(selectCurrentToken);
  return (
    <div>{
        token ? <Outlet/> : <Navigate to = "/login" replace />
    }</div>
  )
}

export default RequireAuth