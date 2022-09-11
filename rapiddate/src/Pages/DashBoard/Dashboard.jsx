import React, { useEffect } from 'react'
import Sidebar from '../../Components/Sidebar/Sidebar'
import { useSelector } from 'react-redux'
import { showUser } from '../../redux/User/UserSlice'
import { Route, Routes } from 'react-router-dom'

const Dashboard = () => {
  const user = useSelector(showUser)
  return (
    <div>
      <div className="leftDashboard">
        {/* <Sidebar /> */}
      </div>
      <div className="rightDashboard">
        <Routes>
        <Route path="/" element={<Sidebar />} />
        </Routes>
      </div>
    </div>
  )
}

export default Dashboard

