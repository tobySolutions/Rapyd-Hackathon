import { useSelector } from 'react-redux'
import {BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Authenticate from './Components/Authentication/Authenticate'
import Login from './Components/Authentication/Login/Login'
import Register from './Components/Authentication/Register/Register'
import PrivateRoute from './Components/PrivateRoute'
import AuthProvider from './Context/AuthProvider'
import Dashboard from './Pages/DashBoard/Dashboard'
import Messages from './Pages/Messages/Messages'
import { showUser } from './redux/User/UserSlice'



function App() {
  const user = useSelector(showUser)
  console.log(user)

  return (
    <div className="App">
      {!user ? (
        <Authenticate />
        // <Route path="/" element={<Login />} />
      ):(
      <BrowserRouter>
      <Routes>
        <Route>
          <Route path="/" element={<Dashboard />} />
          <Route path="/messages" element={<PrivateRoute />}>
            <Route path="/messages" element={<Messages />} />
          </Route>
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
        </Route>
</Routes>

</BrowserRouter>          

)}
    </div>
  )
}

export default App
