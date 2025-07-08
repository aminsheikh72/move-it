import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import authService from './authService'
const userExist = JSON.parse(localStorage.getItem("user"))

const authSlice = createSlice({
    name : "auth",
    initialState : {
        user : userExist || null,
        isLoading : false,
        isError : false,
        isSuccess : false,
        message : ""
    },
    reducers : {},
    extraReducers : (builder)=>{
        builder
        .addCase(registerUser.pending,(state,action)=>{
            state.isLoading = true
            state.isError = false 
            state.isSuccess = false
        })
         .addCase(registerUser.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
            state.isError = false 
        })
         .addCase(registerUser.rejected,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.message = action.payload 
            state.isSuccess = false
        })
           .addCase(loginUser.pending,(state,action)=>{
            state.isLoading = true
            state.isSuccess = false
            state.isError = false 
        })
         .addCase(loginUser.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
            state.isError = false 
        })
         .addCase(loginUser.rejected,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.payload 
        })
         .addCase(logoutUser.fulfilled,(state,action)=>{
        
            state.user = null
            
        })
        
    }
})

export default authSlice.reducer

// register user

export const registerUser=createAsyncThunk("AUTH/REGISTER", async(formData,thunkAPI)=>{
try {
    return await authService.register(formData)
} catch (error) {
     
     const message = error?.response?.data?.message || error.message ||  error?.response?.data?.msg || "Something went wrong" 
    return thunkAPI.rejectWithValue(message);

}
})
export const loginUser=createAsyncThunk("AUTH/LOGIN", async(formData,thunkAPI)=>{
try {
    return await authService.login(formData)
} catch (error) {
      const message = error?.response?.data?.message || error.message ||  error?.response?.data?.msg || "Something went wrong" 
        return thunkAPI.rejectWithValue(message)

}
})
export const logoutUser = createAsyncThunk("AUTH/LOGOUT", async () => {
  localStorage.removeItem("user");
});
