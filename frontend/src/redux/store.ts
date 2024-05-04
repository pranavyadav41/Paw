import {configureStore} from '@reduxjs/toolkit'
import authSlice from './slices/authSlice'
import adminSlice from './slices/adminSlice'


const store=configureStore({
    reducer:{
        auth:authSlice,
        adminAuth:adminSlice

    }
})

export default store