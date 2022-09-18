import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Authenticate from './Components/Authentication/Authenticate';
import ChatRequests from './Components/chatRequests/chatRequests';
import Explore from './Components/Explore/Explore';
import MobileRequests from './Components/MobileRequests/MobileRequests';
import PrivateRoute from './Components/Private/PrivateRoute';
import ProfilePrivateRoute from './Components/Private/ProfilePrivateRoute';
import Profile from './Components/Profile/Profile';
import Wallet from './Components/Wallet/Wallet';
import Dashboard from './Pages/DashBoard/Dashboard';
import LandingPage from './Pages/LandingPage/LandingPage';
import Messages from './Pages/Messages/Messages';

function RoutesContainer () {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/authenticate" element={<Authenticate />} />
          <Route path="/profile" element={<ProfilePrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>

          <Route path="/dashboard" element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>

          <Route path="/messages" element={<PrivateRoute />}>
            <Route path="/messages" element={<Messages />} />
          </Route>

          <Route path="/explore" element={<PrivateRoute />}>
            <Route path="/explore" element={<Explore />} />
          </Route>

          <Route path="/schedule" element={<PrivateRoute />}>
            <Route path="/schedule" element={<Explore />} />
          </Route>

          <Route path="/wallet" element={<PrivateRoute />}>
            <Route path="/wallet" element={<Wallet />} />
          </Route>

          <Route path="/requests" element={<PrivateRoute />}>
            <Route path="/requests" element={<MobileRequests />} />
          </Route>
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default RoutesContainer;
