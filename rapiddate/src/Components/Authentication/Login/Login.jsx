import React, {  useState } from 'react'
import emailAuthLogin from './emailAuthLogin'
import GoogleIcon from '@mui/icons-material/Google'
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import { collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../../database/firebase';
import signInWithGoogle from './SignInWithGoogle';
import style from '../Auth.module.css'


const Login = () => {
  const [data, setData] = useState({
    email: '',
    password: '',
    error: null,
    loading: false
  })
  const { email, password, error, loading } = data
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
        email: '',
        password: '',
        error: null,
        loading: false
      })
    }, 2000)
    setData({...data, loading:false})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setData({ ...data, loading: true })
    const response = await emailAuthLogin(data)
    if(response.error === null){
      await verifyUser(response)
      handleReloadAndClear()
    }else{
      setData({...data, error:response.error, loading: false})
    }
  }
  const verifyUser = async({data}) => {
    const userRef = collection(db, "Users");
    const docRef = doc(userRef, data.user.uid);
    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        await updateDoc(doc(db, 'Users', data.user.uid), { isOnline: true})
        localStorage.setItem('user', JSON.stringify(docSnap.data()))
      }
    } catch (err) {
      return err
    }
  }
  const handleGoogle =  () => {
    const response = signInWithGoogle()
    if(response.error === null){
      handleReloadAndClear()
    }else{
      setData({...data, error:response.error, loading:false})
    }
  }
  return (
    <form className={`sign-in-form ${style.form} `}onSubmit={handleSubmit}>
      <h2 className='title'>Sign in</h2>
      <div className='input-field'>
        <PersonIcon className='user' />
        <input
          type='text'
          placeholder="Email"
          name='email'
          value={email}
          onChange={handleChange}
        />
      </div>
      <div className='input-field'>
        <LockIcon className='user' />
        <input
          type='password'
          placeholder='Password'
          name='password'
          value={password}
          onChange={handleChange}
        />
      </div>
      {error ? <p className='error'>{error}</p> : null}
      <button className="btn solid" disabled={loading}>{loading ? 'Logging in ...' : 'Login'}</button>
      <p className='social-text'>Or Sign in with Google</p>
      <p className="social-icon" onClick={handleGoogle}>
        <GoogleIcon />
      </p>
    </form>
  )
}

export default Login
