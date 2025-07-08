import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import adminService from "./adminService";

const adminSlice = createSlice({
    name : "admin",
   initialState : {
     users : [],
     bookings : [],
     vehicles : [],
     comments : [],
    isLoading : false,
    isSuccess : false,
    isError : false,
    message : ""
   },
   reducers : {},
   extraReducers : (builder)=>{
    builder
    .addCase(getAllUsers.pending,(state,action)=>{
    state.isLoading = true
    state.isError =false
    state.isSuccess = false
    })
    .addCase(getAllUsers.fulfilled,(state,action)=>{
    state.isLoading = false
    state.isError =false
    state.isSuccess = true
    state.users = action.payload
    })
    .addCase(getAllUsers.rejected,(state,action)=>{
    state.isLoading = false
    state.isError =true
    state.isSuccess = false
    state.message = action.payload
    })
       .addCase(getAllBookings.pending,(state,action)=>{
    state.isLoading = true
    state.isError =false
    state.isSuccess = false
    })
    .addCase(getAllBookings.fulfilled,(state,action)=>{
    state.isLoading = false
    state.isError =false
    state.isSuccess = true
    state.bookings = action.payload
    })
    .addCase(getAllBookings.rejected,(state,action)=>{
    state.isLoading = false
    state.isError =true
    state.isSuccess = false
    state.message = action.payload
    })
       .addCase(getAllAdminVehicles.pending,(state,action)=>{
    state.isLoading = true
    state.isError =false
    state.isSuccess = false
    })
    .addCase(getAllAdminVehicles.fulfilled,(state,action)=>{
    state.isLoading = false
    state.isError =false
    state.isSuccess = true
    state.vehicles = action.payload
    })
    .addCase(getAllAdminVehicles.rejected,(state,action)=>{
    state.isLoading = false
    state.isError =true
    state.isSuccess = false
    state.message = action.payload
    })
     .addCase(getAllComments.pending,(state,action)=>{
    state.isLoading = true
    state.isError =false
    state.isSuccess = false
    })
    .addCase(getAllComments.fulfilled,(state,action)=>{
    state.isLoading = false
    state.isError =false
    state.isSuccess = true
    state.comments = action.payload
    })
    .addCase(getAllComments.rejected,(state,action)=>{
    state.isLoading = false
    state.isError =true
    state.isSuccess = false
    state.message = action.payload
    })
    .addCase(updateAdminBooking.pending, (state) => {
  state.isLoading = true;
  state.isError = false;
  state.isSuccess = false;
})
.addCase(updateAdminBooking.fulfilled, (state, action) => {
  state.isLoading = false;
  state.isSuccess = true;


  const updatedBooking = action.payload;

  state.bookings = state.bookings.map(booking =>
    booking._id === updatedBooking._id ? updatedBooking : booking
  );
})

.addCase(updateAdminBooking.rejected, (state, action) => {
  state.isLoading = false;
  state.isSuccess = false;
  state.isError = true;
  state.message = action.payload;
})

 .addCase(updateVehicle.pending, (state) => {
  state.isLoading = true;
  state.isError = false;
  state.isSuccess = false;
})
.addCase(updateVehicle.fulfilled, (state, action) => {
  state.isLoading = false;
  state.isSuccess = true;


  const updatedVehicle = action.payload;

  state.vehicles = state.vehicles.map(vehicle =>
    vehicle._id === updatedVehicle._id ? updatedVehicle : vehicle
  );
})

.addCase(updateVehicle.rejected, (state, action) => {
  state.isLoading = false;
  state.isSuccess = false;
  state.isError = true;
  state.message = action.payload;
})

 .addCase(addVehicle.pending,(state,action)=>{
    state.isLoading = true
    state.isError =false
    state.isSuccess = false
    })
    .addCase(addVehicle.fulfilled,(state,action)=>{
    state.isLoading = false
    state.isError =false
    state.isSuccess = true
    state.vehicles = [action.payload, ...state.vehicles]
    })
    .addCase(addVehicle.rejected,(state,action)=>{
    state.isLoading = false
    state.isError =true
    state.isSuccess = false
    state.message = action.payload
    })
     .addCase(removeVehicle.pending,(state,action)=>{
    state.isLoading = true
    state.isError =false
    state.isSuccess = false
    })
    .addCase(removeVehicle.fulfilled,(state,action)=>{
    state.isLoading = false
    state.isError =false
    state.isSuccess = true
    state.vehicles = state.vehicles.filter((vehicle)=>vehicle._id !== action.payload.id)
    })
    .addCase(removeVehicle.rejected,(state,action)=>{
    state.isLoading = false
    state.isError =true
    state.isSuccess = false
    state.message = action.payload
    })


    
}
})

export default adminSlice.reducer

export const getAllUsers =createAsyncThunk("GET/USERS",async(_,thunkAPI)=>{
    try {
        let token = thunkAPI.getState().auth.user.token
       return await adminService.getUsers(token)
    } catch (error) {
         const message = error?.response?.data?.message || error.message ||  error?.response?.data?.msg || "Something went wrong" 
        return thunkAPI.rejectWithValue(message)
    }
})
export const getAllBookings=createAsyncThunk("GET/BOOKINGS",async(_,thunkAPI)=>{
    try {
        let token = thunkAPI.getState().auth.user.token
        return await adminService.getBookings(token)
    } catch (error) {
          const message = error?.response?.data?.message || error.message ||  error?.response?.data?.msg || "Something went wrong" 
        return thunkAPI.rejectWithValue(message)
        
    }
})
export const getAllAdminVehicles=createAsyncThunk("GET/ADMIN/VEHICLES",async(_,thunkAPI)=>{
    try {
        let token = thunkAPI.getState().auth.user.token
        return await adminService.getAdminVehicles(token)
    } catch (error) {
        const message = error?.response?.data?.message || error.message ||  error?.response?.data?.msg || "Something went wrong" 
        return thunkAPI.rejectWithValue(message)
        
    }
})
export const updateAdminBooking=createAsyncThunk("UPDATE/BOOKING",async(formData,thunkAPI)=>{
    try {
        let token = thunkAPI.getState().auth.user.token
        return await adminService.updateBooking(token,formData)
    } catch (error) {
        const message = error?.response?.data?.message || error.message ||  error?.response?.data?.msg || "Something went wrong" 
        return thunkAPI.rejectWithValue(message)
        
    }
})

export const updateVehicle=createAsyncThunk("UPDATE/VEHICLE",async(formData,thunkAPI)=>{
    try {
        let token = thunkAPI.getState().auth.user.token
        return await adminService.updateAdminVehicle(token,formData)
    } catch (error) {
        const message = error?.response?.data?.message || error.message ||  error?.response?.data?.msg || "Something went wrong" 
        return thunkAPI.rejectWithValue(message)
        
    }
})

export const addVehicle=createAsyncThunk("ADD/VEHICLE",async(formData,thunkAPI)=>{
    try {
        let token = thunkAPI.getState().auth.user.token
        return await adminService.addAdminVehicle(token,formData)
    } catch (error) {
        const message = error?.response?.data?.message || error.message ||  error?.response?.data?.msg || "Something went wrong" 
        return thunkAPI.rejectWithValue(message)
        
    }
})

export const removeVehicle=createAsyncThunk("REMOVE/VEHICLE",async(id,thunkAPI)=>{
    try {
        let token = thunkAPI.getState().auth.user.token
        return await adminService.removeAdminVehicle(token,id)
    } catch (error) {
        const message = error?.response?.data?.message || error.message ||  error?.response?.data?.msg || "Something went wrong" 
        return thunkAPI.rejectWithValue(message)
        
    }
})

export const getAllComments=createAsyncThunk("GET/COMMENTS",async(_,thunkAPI)=>{
    try {
        let token = thunkAPI.getState().auth.user.token
        return await adminService.getAdminComments(token)
    } catch (error) {
        const message = error?.response?.data?.message || error.message ||  error?.response?.data?.msg || "Something went wrong" 
        return thunkAPI.rejectWithValue(message)
        
    }
})