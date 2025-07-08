import React from 'react'
import useAuth from './Authhook'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoute = () => {
 const {isLoggedIn,statusCheck} = useAuth()
 if(statusCheck) return <h1 className=' text-4xl text-center'>loading...</h1>
 return isLoggedIn ? <Outlet/> : <Navigate to={'/login'}/>
}

export default PrivateRoute
