import React from 'react'
import Sidebar from '../../Components/Sidebar/Sidebar'
import { Route, Routes } from 'react-router-dom'
import styles from './Dashboard.module.css'
import Home from '../../Components/Home/Home'


const Dashboard = () => {

  return (
    <div className={styles.mainDashboard}>
      <div className={styles.leftDashboard}>
        <Sidebar /> 
      </div>
      <div className={styles.rightDashboard}>
        <div className={styles.container}>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default Dashboard

