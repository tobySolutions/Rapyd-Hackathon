import React, { useEffect } from 'react'
import Sidebar from '../../Components/Sidebar/Sidebar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import styles from './Dashboard.module.css'
import Home from '../../Components/Home/Home'
import { showMenuToggle } from '../../redux/Menu/MenuSlice'
import { useSelector } from 'react-redux'
import Profile from '../../Components/Profile/Profile'
import Navbar from '../../Components/NavBar/NavBar'


const Dashboard = () => {
  const toggler = useSelector(showMenuToggle)
  return (
    <BrowserRouter>
      <div className={styles.mainDashboard}>
        <div className={`${styles.leftDashboard} ${toggler ? '': styles.display}`}>
          <Sidebar /> 
        </div>
        <div className={`${styles.rightDashboard} `}>
          <div className={styles.container}>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/wallet" element={'hey'} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default Dashboard

