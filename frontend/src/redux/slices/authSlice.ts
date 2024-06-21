import {createSlice} from "@reduxjs/toolkit"

const storedUserInfo = localStorage.getItem('userInfo');

const initialState = {
    userInfo: storedUserInfo ? JSON.parse(storedUserInfo) : null,
  };

const authSlice=createSlice({
    name:"auth", 
    initialState,
    reducers:{
        setCredentials:(state,action)=>{
            state.userInfo=action.payload;
            localStorage.setItem('userInfo',JSON.stringify(action.payload));
        },
        userLogout:(state)=>{
            state.userInfo=null;
            localStorage.removeItem('userInfo');
        },
        clearUser:(state)=>{
            state.userInfo=null;
            localStorage.removeItem('userInfo')
        }

    }
})

export const {setCredentials,userLogout,clearUser} = authSlice.actions

export default authSlice.reducer
