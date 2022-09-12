import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    users: []
}
export const usersSlice = createSlice({
    name:'usersSlice',
    initialState,
    reducers:{
        setUsers: (state, {payload}) => {
            state.users = payload
        },
        
    },
})

export const {setUsers} = usersSlice.actions
export const showUsers = (state) => {
    return state.users.users
}
export default usersSlice.reducer