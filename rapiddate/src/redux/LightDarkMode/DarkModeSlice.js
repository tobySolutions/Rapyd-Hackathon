import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  darkMode: false,
}
export const darkModeSlice = createSlice({
  name: "darkModeSlice",
  initialState,
  reducers: {
    toggleTheme: (state)=> {
      state.darkMode = !state.darkMode
    },
    darkModeTrigger: (state) => {
      state.darkMode = true
    }, 
    lightModeTrigger: (state) => {
      state.darkMode = false
    },  
  }
})
export const {darkModeTrigger, toggleTheme, lightModeTrigger} = darkModeSlice.actions
export const showMode = (state) => {
  return state.darkMode.darkMode
}
export default darkModeSlice.reducer







// <DarkModeContext.Provider value={{ darkMode: state.darkMode, dispatch }}>
//       {children}
//     </DarkModeContext.Provider>