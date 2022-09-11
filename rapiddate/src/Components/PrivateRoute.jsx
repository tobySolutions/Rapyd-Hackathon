import React from "react";
import {  Route, Routes } from "react-router-dom";
import { Navigate } from 'react-router-dom';
import { showUser } from "../redux/User/UserSlice";
import { useSelector } from "react-redux";


const PrivateRoute = ({ element: Component, ...rest }) => {
    const user = useSelector(showUser)
    return (
        <Routes>
            <Route {...rest} 
            element = {
                user.uid ? 
                Component  : 
                <Navigate replace to='/login' />
            }
            />
        </Routes>
    );
};

export default PrivateRoute;
