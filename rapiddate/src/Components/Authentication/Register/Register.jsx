import React, { useState } from "react";
import signInWithGoogle from "../GoogleAuth";
import emailAuth from "./EmailAuth";

const Register = () => {
  const [data, setData] = useState({
    name: '',
    email: "",
    password: "",
    error: null,
    loading: false,
  });
  const { 
    name, 
    email, 
    password, 
    error, 
    loading 
  } = data;

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setData({...data, loading: true})
    await emailAuth(setData, data)
    window.location.reload()
  };
  const handleGoogle = async () => {
    await signInWithGoogle()
    window.location.reload()
  }
  return (
    <section>
      <h3>Create An Account</h3>
      <form className="form" onSubmit={handleSubmit}>
        <div className="input_container">
          <label htmlFor="name">Name</label>
          <input type="text" name="name" value={name} onChange={handleChange} />
        </div>
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
        or

        {error ? <p className="error">{error}</p> : null}
        <div className="btn_container">
          <button className="btn" disabled={loading}>
            {loading ? "Creating ..." : "Register"}
          </button>
        </div>
      </form>
        <button onClick={handleGoogle}>Sign in with Google</button>
    </section>
  );
};

export default Register;
