import {BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Login from './Components/Authentication/Login/Login'
import Register from './Components/Authentication/Register/Register'
import PrivateRoute from './Components/PrivateRoute'
import AuthProvider from './Context/AuthProvider'
import Dashboard from './Pages/DashBoard/Dashboard'


function App() {

  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route exact path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
          <PrivateRoute exact path="*" element={<Dashboard />} />
        </BrowserRouter> 
      </AuthProvider>
    </div>
  )
}

export default App
