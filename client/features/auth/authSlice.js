import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import authService from './authService'

const userExist = JSON.parse(localStorage.getItem("user"))

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: userExist || null,
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: ""
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true
        state.isError = false
        state.isSuccess = false
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
        localStorage.setItem("token", action.payload.token) // ✅ SET token
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.isSuccess = false
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true
        state.isSuccess = false
        state.isError = false
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
        localStorage.setItem("token", action.payload.token) // ✅ SET token
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.message = action.payload
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null
        localStorage.removeItem("token") // ✅ REMOVE token
      })
  }
})

export default authSlice.reducer

// Register User
export const registerUser = createAsyncThunk("AUTH/REGISTER", async (formData, thunkAPI) => {
  try {
    return await authService.register(formData)
  } catch (error) {
    const message =
      error?.response?.data?.message ||
      error.message ||
      error?.response?.data?.msg ||
      "Something went wrong"
    return thunkAPI.rejectWithValue(message)
  }
})

// Login User
export const loginUser = createAsyncThunk("AUTH/LOGIN", async (formData, thunkAPI) => {
  try {
    return await authService.login(formData)
  } catch (error) {
    const message =
      error?.response?.data?.message ||
      error.message ||
      error?.response?.data?.msg ||
      "Something went wrong"
    return thunkAPI.rejectWithValue(message)
  }
})

// Logout User
export const logoutUser = createAsyncThunk("AUTH/LOGOUT", async () => {
  localStorage.removeItem("user")
  localStorage.removeItem("token") // ✅ REMOVE token
})
