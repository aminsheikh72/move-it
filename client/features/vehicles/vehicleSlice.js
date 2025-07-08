import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import vehicleService from "./vehicleService";

const vehicleSlice = createSlice({
  name: "vehicle",
  initialState: {
    userVehicles: [],
    userBookings: [],
    userVehicle: {},
    bookingData: {},
    commentsByBookingId: {}, // ✅ updated here
    isSuccess: false,
    isError: false,
    isLoading: false,
    message: "",
  },
  reducers: {
    storeBookingData: (state, action) => {
      state.bookingData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get User Vehicles
      .addCase(getUserVehicles.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(getUserVehicles.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.userVehicles = action.payload;
      })
      .addCase(getUserVehicles.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Book Vehicle
      .addCase(bookVehicle.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(bookVehicle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.userBookings = [action.payload, ...state.userBookings];
      })
      .addCase(bookVehicle.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Get User Booking
      .addCase(getUserBooking.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(getUserBooking.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.userBookings = action.payload;
      })
      .addCase(getUserBooking.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // ✅ Get Comments By Booking ID
      .addCase(getUserComments.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(getUserComments.fulfilled, (state, action) => {
        const { bookingId, comments } = action.payload;
        state.isLoading = false;
        state.isSuccess = true;
        state.commentsByBookingId[bookingId] = comments;
      })
      .addCase(getUserComments.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(addComment.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        const { bookingId, comment } = action.payload;
        if (state.commentsByBookingId[bookingId]) {
          state.commentsByBookingId[bookingId].push(comment);
        } else {
          state.commentsByBookingId[bookingId] = [comment];
        }
      })
      .addCase(addComment.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(cancelBooking.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(cancelBooking.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;

        const updatedBooking = action.payload;

        //  Update the cancelled booking in userBookings array
        state.userBookings = state.userBookings.map((booking) =>
          booking._id === updatedBooking._id ? updatedBooking : booking
        );
      })

      .addCase(cancelBooking.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      });
  },
});

export default vehicleSlice.reducer;

export const { storeBookingData } = vehicleSlice.actions;

// Thunks

export const getUserVehicles = createAsyncThunk(
  "USERSIDE/VEHICLES",
  async (_, thunkAPI) => {
    try {
      return await vehicleService.getUserSideVehicles();
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error.message ||
        error?.response?.data?.msg ||
        "Something went wrong";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const cancelBooking = createAsyncThunk(
  "CANCEL/BOOKING",
  async (bid, thunkAPI) => {
    try {
     let token = thunkAPI.getState().auth?.user?.token || JSON.parse(localStorage.getItem("user"))?.token
      return await vehicleService.cancelBookingByUser(token, bid);
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error.message ||
        error?.response?.data?.msg ||
        "Something went wrong";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getUserBooking = createAsyncThunk(
  "USER/BOOKING",
  async (uid, thunkAPI) => {
    try {
     let token = thunkAPI.getState().auth?.user?.token || JSON.parse(localStorage.getItem("user"))?.token
      return await vehicleService.getMyBooking(token, uid);
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error.message ||
        error?.response?.data?.msg ||
        "Something went wrong";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getUserComments = createAsyncThunk(
  "USER/COMMENTS",
  async (bookingId, thunkAPI) => {
    try {
      let token = thunkAPI.getState().auth?.user?.token || JSON.parse(localStorage.getItem("user"))?.token
      return await vehicleService.getCommentsByUser(token, bookingId);
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error.message ||
        error?.response?.data?.msg ||
        "Something went wrong";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const bookVehicle = createAsyncThunk(
  "BOOK/VEHICLE",
  async (formData, thunkAPI) => {
    try {
    let token = thunkAPI.getState().auth?.user?.token || JSON.parse(localStorage.getItem("user"))?.token
      return await vehicleService.bookingUserVehicle(token, formData);
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error.message ||
        error?.response?.data?.msg ||
        "Something went wrong";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const addComment = createAsyncThunk(
  "vehicle/addComment",
  async ({ bookingId, text }, thunkAPI) => {
let token = thunkAPI.getState().auth?.user?.token || JSON.parse(localStorage.getItem("user"))?.token
    const response = await vehicleService.addComment(token, bookingId, text);
    return { bookingId, comment: response }; // we'll use this in extraReducers
  }
);
