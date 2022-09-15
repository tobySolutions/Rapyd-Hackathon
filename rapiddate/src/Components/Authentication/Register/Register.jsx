import React, { useState } from "react";
import emailAuth from "./EmailAuth";
import GoogleIcon from '@mui/icons-material/Google'
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import MailIcon from '@mui/icons-material/Mail';
import signUpWithGoogle from "./SignUpWithGoogle";

const Register = () => {
  const [data, setData] = useState({
    name: '',email: "",password: "",error: null,loading: false
  });
  const { name, email, password, error, loading } = data;
  const handleChange = e => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
  }
  const handleReloadAndClear = () => {
    window.location.reload()
    setTimeout(() => {
      setData({
        email: '',password: '',error: null,loading: false
      })
    }, 2000)
    setData({...data, loading:false})
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setData({...data, loading: true})
    const response = await emailAuth(data)
    if(response.error === null){
      handleReloadAndClear()
    }else{
      setData({...data, error:response.error, loading:false})
    }
  };
  const handleGoogle = async () => {
    await signUpWithGoogle()
    handleReloadAndClear()
  }
  return (
    <form action="#" className="sign-up-form" onSubmit={handleSubmit}>
        <h2 className="title">Sign up</h2>
        <div className="input-field">
          <PersonIcon className='user' />
          <input type="text" name="name" value={name} onChange={handleChange} placeholder="Name" />
        </div>
        <div className="input-field">
          <MailIcon className="user" />
          <input
            type="text"
            placeholder="Email"
            name="email"
            value={email}
            onChange={handleChange}
          />
        </div>
        <div className="input-field">
          <LockIcon className='user' />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={handleChange}
          />
        </div>
        {error ? <p className='error'>{error}</p> : null}
        <button className="btn" disabled={loading}>{loading ? 'Creating ...' : 'SignUp'}</button>
        <p className='social-text'>Or Sign up with Google</p>
        <p className="social-icon" onClick={handleGoogle}>
          <GoogleIcon />
        </p>
      </form>
  );
};

export default Register;
