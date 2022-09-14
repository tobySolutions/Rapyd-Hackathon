import React, { useState } from 'react'
import Register from './Register/Register'
import Login from './Login/Login'

const Authenticate = () => {
    const [selection, setSelection] = useState(false)
  return (
    <div>

        {selection ? <Register /> : <Login /> }
        <button onClick={() => setSelection(!selection)}>{selection ? "Already Have an Account, Login" : "New User? Sign Up"}</button>
    </div>
  )
}

export default Authenticate