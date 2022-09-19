import {BrowserRouter, Routes, Route} from 'react-router-dom';
import PrivateRoute from './Components/Private/PrivateRoute';
import ProfilePrivateRoute from './Components/Private/ProfilePrivateRoute';
import loadable from "@loadable/component";
import Loader2 from './Components/Loader/Loader2';


function RoutesContainer () {

  const AsyncHome = loadable(
    () => import("./Pages/LandingPage/LandingPage"), {
    fallback: <Loader2 />
  });
  const Authenticate = loadable(
    () => import("./Components/Authentication/Authenticate"), {
    fallback: <Loader2 />
  });
  const Profile = loadable(
    () => import("./Components/Profile/Profile"), {
    fallback: <Loader2 />
  });
  const Dashboard = loadable(
    () => import("./Pages/DashBoard/Dashboard"), {
    fallback: <Loader2 />
  });
  const Messages = loadable(
    () => import("./Pages/Messages/Messages"), {
    fallback: <Loader2 />
  });
  const Explore = loadable(
    () => import("./Components/Explore/Explore"), {
    fallback: <Loader2 />
  });
  const Schedule = loadable(
    () => import("./Components/Schedules/Schedule"), {
    fallback: <Loader2 />
  });
  const Wallet = loadable(
    () => import("./Components/Wallet/Wallet"), {
    fallback: <Loader2 />
  });
  const MobileRequests = loadable(
    () => import("./Components/MobileRequests/MobileRequests"), {
    fallback: <Loader2 />
  });


  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<AsyncHome />} />
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
            <Route path="/schedule" element={<Schedule />} />
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
