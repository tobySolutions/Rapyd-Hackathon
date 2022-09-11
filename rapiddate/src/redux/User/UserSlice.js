import { createSlice } from "@reduxjs/toolkit"

const data = localStorage.getItem('user')
const initialState = {
    user: {
        uid:1234,
    }
}

export const userSlice = createSlice({
    name:'userSlice',
    initialState,
    reducers:{
        setUser: (state, {payload}) => {
            state.user = payload
        },
        
    },
})

export const {setUser} = userSlice.actions
export const showUser = (state) => {
    return state.user.user
}
export default userSlice.reducer