import React, { useState } from "react";
import {useNavigate} from 'react-router-dom';
import signInWithGoogle from "../GoogleAuth";
import emailAuthLogin from "./emailAuthLogin";
import { useDispatch } from 'react-redux'

const Login = () => {

    const [data, setData] = useState({
        email: "",
        password: "",
        error: null,
        loading: false,
    });
    const { email, password, error, loading } = data;
    const history = useNavigate()
    const dispatch = useDispatch()
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setData({...data, loading: true})
        await emailAuthLogin(setData, data, history)
    };
    const handleGoogle = async () => {
       await signInWithGoogle(history)
       history("/")
    }
    return (
        <section>
            <h3>Log into your Account</h3>
            <form className="form" onSubmit={handleSubmit}>
                <div className="input_container">
                <label htmlFor="email">Email</label>
                <input
                    type="text"
                    name="email"
                    value={email}
                    onChange={handleChange}
                />
                </div>
                <div className="input_container">
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                />
                </div>
                {error ? <p className="error">{error}</p> : null}
                <div className="btn_container">
                <button className="btn" disabled={loading}>
                    {loading ? "Logging in ..." : "Login"}
                </button>
                </div>
            </form>
            <button onClick={handleGoogle}>Sign In with Google</button>
        </section>
    );
};

export default Login;
