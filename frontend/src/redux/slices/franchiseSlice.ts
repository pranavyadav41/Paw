import {createSlice} from "@reduxjs/toolkit"

const storedFranchiseInfo = localStorage.getItem('franchiseInfo');

const initialState = {
    franchiseInfo : storedFranchiseInfo? JSON.parse(storedFranchiseInfo) : null,
}

const franchiseSlice = createSlice({
    name:'franchiseAuth',
    initialState,
    reducers:{
        setCredentials:(state,action)=>{
            state.franchiseInfo=action.payload;
            localStorage.setItem('franchiseInfo',JSON.stringify(action.payload));
        },
        logout:(state)=>{
            state.franchiseInfo=null;
            localStorage.removeItem('franchiseInfo');
        },
        clearFranchise:(state)=>{
            state.franchiseInfo = null;
            localStorage.removeItem('franchiseInfo')
        }
    }

})


export const {setCredentials,logout,clearFranchise} = franchiseSlice.actions

export default franchiseSlice.reducer