import React from 'react'
import useAuth from './Authhook'
import { Navigate, Outlet } from 'react-router-dom'

const AdminRoute = () => {
 const {isLoggedIn,statusCheck,user} = useAuth()
 if(statusCheck) return <h1 className=' text-4xl text-center'>loading...</h1>
 return isLoggedIn && user.isAdmin ? <Outlet/> : <Navigate to={'/'}/>
}

export default AdminRoute
