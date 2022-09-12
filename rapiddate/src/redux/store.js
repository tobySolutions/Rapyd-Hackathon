import { configureStore } from "@reduxjs/toolkit";
import darkModeReducer from "./LightDarkMode/DarkModeSlice";
import userReducer from "./User/UserSlice";
import usersReducer from "./Users/UsersSlice"
export const store = configureStore({
    reducer: {
        user: userReducer,
        users:usersReducer,
        darkMode: darkModeReducer,
    }
})
