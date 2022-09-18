import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from '../NavBar/NavBar'
import Sidebar from '../Sidebar/Sidebar'
import styles from '../../Pages/DashBoard/Dashboard.module.css'
import { useSelector } from 'react-redux'
import { showMenuToggle } from '../../redux/Menu/MenuSlice'
import ChatRequests from '../chatRequests/chatRequests'

const MobileRequests = () => {
  const toggler = useSelector(showMenuToggle)
  return (
    <div className={styles.mainDashboard}>
      <div
        className={`${styles.leftDashboard} ${toggler ? '' : styles.display}`}
      >
        <Sidebar />
      </div>
      <div className={`${styles.rightDashboard} `}>
        <div className={styles.container}>
          <Navbar />
          <ChatRequests />
        </div>
      </div>
    </div>
  )
}

export default MobileRequests
