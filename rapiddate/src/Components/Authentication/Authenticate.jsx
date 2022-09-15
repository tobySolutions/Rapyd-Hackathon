import React, { useState } from 'react'
import Register from './Register/Register'
import Login from './Login/Login'
import './Authentication.css'
import date1 from '../../assets/date2.png'
import date2 from '../../assets/date3.png'


const Authenticate = () => {
  const [selection, setSelection] = useState(false)
  return (
    <div>
      <div className={`container ${selection ? 'sign-up-mode' : ''}`}>
        <div className='forms-container'>
          <div className='signin-signup'>
            {selection ? <Register setStateChange = {setSelection} /> : <Login setStateChange = {setSelection} /> }
          </div>
        </div>
        
        <div className='panels-container'>
          <div className='panel left-panel'>
            <div className='content'>
              <h3>New here ?</h3>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Debitis, ex ratione. Aliquid!
              </p>
              <button className='btn transparent' id='sign-up-btn' onClick={() => setSelection(true)}>
                Sign up
              </button>
            </div>
            <img src={date2} className='image' alt='' />
          </div>
          <div className='panel right-panel'>
            <div className='content'>
              <h3>One of us ?</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Nostrum laboriosam ad deleniti.
              </p>
              <button className='btn transparent' id='sign-in-btn' onClick={() => setSelection(false)}>
                Sign in
              </button>
            </div>
            <img src={date1} className='image' alt='' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Authenticate