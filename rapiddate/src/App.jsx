import { useSelector } from 'react-redux'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Authenticate from './Components/Authentication/Authenticate'
import Profile from './Components/Profile/Profile'
import Dashboard from './Pages/DashBoard/Dashboard'
import Messages from './Pages/Messages/Messages'
import { showUser } from './redux/User/UserSlice'

function App () {
  const user = useSelector(showUser)

  return (
    <div className='App'>
      {!user?.uid ? (
        // If the user id does not exist, the page should take them to the authentication page
        <Authenticate />
      ) : (
        // if the user has authenticated, but has no core details, it should take them to the profile form page
        !user.photo ? (
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Profile />} />
            </Routes>
          </BrowserRouter>
        ) : (
          // If the user has authenticated and filled out his values, it should them to this page
          <BrowserRouter>
            <Routes>
              <Route path='/'>
                <Route path='/' element={<Dashboard />} />
                <Route path='/messages' element={<Messages />} />
              </Route>
            </Routes>
          </BrowserRouter>

        )
      )}
    </div>
  )
}

export default App
