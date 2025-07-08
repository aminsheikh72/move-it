import axios from 'axios'

const api_url = "https://move-it-backend-hnht.onrender.com"

const register = async (formData) => {
  const response = await axios.post(api_url + '/api/auth/register', formData)

  //  Store user object
  localStorage.setItem("user", JSON.stringify(response.data))

  //  Store token separately
  if (response.data?.token) {
    localStorage.setItem("token", response.data.token)
  }

  return response.data
}

const login = async (formData) => {
  const response = await axios.post(api_url + '/api/auth/login', formData)

  //  Store user object
  localStorage.setItem("user", JSON.stringify(response.data))

  //  Store token separately
  if (response.data?.token) {
    localStorage.setItem("token", response.data.token)
  }

  return response.data
}

const authService = { register, login }
export default authService
