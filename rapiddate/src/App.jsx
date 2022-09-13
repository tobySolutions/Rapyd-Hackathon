import {BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Login from './Components/Authentication/Login/Login'
import Register from './Components/Authentication/Register/Register'
import PrivateRoute from './Components/PrivateRoute'
import AuthProvider from './Context/AuthProvider'
import Dashboard from './Pages/DashBoard/Dashboard'
import Messages from './Pages/Messages/Messages'


function App() {

  return (
    <div className="App">
        <BrowserRouter>
          <Routes>
          <Route path="/" element={<PrivateRoute />}>
                <Route path="/" element={<Dashboard />} />
          </Route>
            <Route exact path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/message" element={<Messages />} />
          </Routes>
          {/* <PrivateRoute path="/" element={<Dashboard />} />
          <PrivateRoute path="/messages" element={<Messages />} /> */}
        </BrowserRouter> 
    </div>
  )
}

export default App
