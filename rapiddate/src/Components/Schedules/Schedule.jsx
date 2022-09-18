import React from 'react'
import Navbar from '../NavBar/NavBar'
import Sidebar from '../Sidebar/Sidebar'
import styles from '../../Pages/DashBoard/Dashboard.module.css'
import { useSelector } from 'react-redux'
import { showMenuToggle } from '../../redux/Menu/MenuSlice'

const Schedule = () => {
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
          heys
        </div>
      </div>
    </div>
  )
}

export default Schedule
