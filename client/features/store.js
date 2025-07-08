import { configureStore } from "@reduxjs/toolkit";
import auth from '../features/auth/authSlice'
import admin from '../features/admin/adminSlice'
import vehicle from "../features/vehicles/vehicleSlice"

const store = configureStore({
    reducer : {auth,admin,vehicle}
})
export default store