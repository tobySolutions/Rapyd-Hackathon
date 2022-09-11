import { configureStore } from "@reduxjs/toolkit";
import darkModeReducer from "./LightDarkMode/DarkModeSlice";
import userReducer from "./User/UserSlice";
export const store = configureStore({
    reducer: {
        user: userReducer,
        darkMode: darkModeReducer,
    }
})
