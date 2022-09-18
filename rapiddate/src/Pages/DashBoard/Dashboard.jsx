import React from 'react'
import Sidebar from '../../Components/Sidebar/Sidebar'
import {  Route, Routes } from 'react-router-dom'
import styles from './Dashboard.module.css'
import Home from '../../Components/Home/Home'
import { showMenuToggle } from '../../redux/Menu/MenuSlice'
import { useSelector } from 'react-redux'
import Navbar from '../../Components/NavBar/NavBar'


const Dashboard = () => {
  const toggler = useSelector(showMenuToggle)
  return (
      <div className={styles.mainDashboard}>
        <div className={`${styles.leftDashboard} ${toggler ? '': styles.display}`}>
          <Sidebar /> 
        </div>
        <div className={`${styles.rightDashboard} `}>
          <div className={styles.container}>
            <Navbar />
            <Home />
          </div>
        </div>
      </div>
  )
}

export default Dashboard