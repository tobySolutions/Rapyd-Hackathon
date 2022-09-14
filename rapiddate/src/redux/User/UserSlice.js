import { createSlice } from "@reduxjs/toolkit"
import { getDefaultMiddleware } from '@reduxjs/toolkit';

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false
})

const data = localStorage.getItem('user')
const initialState = {
    user: data && JSON.parse(data) 
}

export const userSlice = createSlice({
    name:'userSlice',
    initialState,
    reducers:{
        setUser: (state, {payload}) => {
            state.user = JSON.parse(payload)
        },
        
    },
})

export const {setUser} = userSlice.actions
export const showUser = (state) => {
    return state.user.user
}
export default userSlice.reducer