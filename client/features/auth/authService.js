import axios from 'axios'

const api_url = "https://move-it-backend-hnht.onrender.com"

const register=async(formData)=>{
    const response = await axios.post(api_url +'/api/auth/register',formData)
    localStorage.setItem("user",JSON.stringify(response.data)) 
    return response.data
    
    
}
const login=async(formData)=>{
    const response = await axios.post(api_url +'/api/auth/login',formData)
    localStorage.setItem("user",JSON.stringify(response.data))
    return response.data
    
    
}
const authService=  {register,login}
export default authService