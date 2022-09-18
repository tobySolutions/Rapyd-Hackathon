import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    showMessages: false
}

export const messageSlice = createSlice({
    name: 'messageSlice',
    initialState,
    reducers:{
        toggleMessages: (state, {payload}) => {
            state.showMessages = payload
        },
    }
})

export const {toggleMessages} = messageSlice.actions
export const showMessagesStates = (state) => {
    return state.showMessages.showMessages
}
export default messageSlice.reducer
