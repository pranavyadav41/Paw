import {configureStore} from '@reduxjs/toolkit'
import authSlice from './slices/authSlice'
import adminSlice from './slices/adminSlice'
import franchiseSlice from './slices/franchiseSlice'


const store=configureStore({
    reducer:{
        auth:authSlice,
        adminAuth:adminSlice,
        franchiseAuth:franchiseSlice

    }
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch