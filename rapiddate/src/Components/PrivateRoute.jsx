import React, { useContext } from "react";
import { AuthContext } from "../Context/AuthProvider";
import {  Route, Routes } from "react-router-dom";
import { Navigate } from 'react-router-dom';


const PrivateRoute = ({ component: Component, ...rest }) => {
    const { user } = useContext(AuthContext);

    return (
        <Routes>
            <Route {...rest} exact
            render={(props) =>
                user ? <Component {...props} /> : <Navigate replace to='/login' />
            }
            />
        </Routes>
    );
};

export default PrivateRoute;
