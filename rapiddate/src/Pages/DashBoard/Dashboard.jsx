import React from 'react'
import Sidebar from '../../Components/Sidebar/Sidebar'
import { Route, Routes } from 'react-router-dom'
import Explore from '../../Components/Explore/Explore'
import { useSelector } from 'react-redux'
import { showUser } from '../../redux/User/UserSlice'

const Dashboard = () => {
  const user = useSelector(showUser)
  console.log(user)
  return (
    <div>
      <div className="leftDashboard">
        <Sidebar /> 
      </div>
      <div className="rightDashboard">
        <Routes>
        <Route path="/name" element={<Explore />} />
        </Routes>
      </div>
    </div>
  )
}

export default Dashboard

