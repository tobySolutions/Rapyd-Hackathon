import { useSelector } from 'react-redux'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Authenticate from './Components/Authentication/Authenticate'
import Dashboard from './Pages/DashBoard/Dashboard'
import Messages from './Pages/Messages/Messages'
import { showUser } from './redux/User/UserSlice'

function App () {
  const user = useSelector(showUser)

  return (
    <div className='App'>
      {!user ? (
        <Authenticate />
      ) : (
        <BrowserRouter>
          <Routes>
            <Route path='/'>
              <Route path='/' element={<Dashboard />} />
              <Route path='/messages' element={<Messages />} />
            </Route>
          </Routes>
        </BrowserRouter>
      )}
    </div>
  )
}

export default App
