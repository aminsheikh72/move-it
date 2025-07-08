import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const useAuth = () => {
const [isLoggedIn, setIsLoggedIn]= useState(false)
const [statusCheck, isStatusCheck]= useState(true)
const {user}= useSelector(state=> state.auth)
  useEffect(()=>{
if(user){
    setIsLoggedIn(true)
}
else{
    setIsLoggedIn(false)
}
isStatusCheck(false)
  },[user])
  return {isLoggedIn,statusCheck,user}
}

export default useAuth
