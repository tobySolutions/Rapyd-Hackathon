import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    menuOpen: false
}

export const menuSlice = createSlice({
    name: 'menuSlice',
    initialState,
    reducers:{
        toggleMenu: (state, {payload}) => {
            state.menuOpen = payload
        },
    }
})
export const {toggleMenu} = menuSlice.actions
export const showMenuToggle = (state) => {
    return state.menuOpen.menuOpen
}
export default menuSlice.reducer
