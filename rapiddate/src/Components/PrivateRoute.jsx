import React from "react";
import {  Outlet, Navigate } from "react-router-dom";
import { showUser } from "../redux/User/UserSlice";
import { useSelector } from "react-redux";


const PrivateRoute = ({ element: Component, ...rest }) => {
    const user = useSelector(showUser)
    return user.uid ? <Outlet /> :  <Navigate replace to='/login' />
};

export default PrivateRoute;
