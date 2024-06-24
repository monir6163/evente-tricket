import { useContext } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import storeContext from "../context/storeContext";
import FrontLayout from "../dashboard/layout/FrontLayout";
import MainLayout from "../dashboard/layout/MainLayout";
import AddEvents from "../dashboard/pages/AddEvents";
import AdminIndex from "../dashboard/pages/AdminIndex";
import AllBookingList from "../dashboard/pages/AllBookingList";
import AllCatList from "../dashboard/pages/AllCatList";
import AllEventList from "../dashboard/pages/AllEventList";
import Cancel from "../dashboard/pages/Cancel";
import Card from "../dashboard/pages/Card";
import ChangePassword from "../dashboard/pages/ChangePassword";
import EditCategory from "../dashboard/pages/EditCategory";
import EditEvent from "../dashboard/pages/EditEvent";
import Events from "../dashboard/pages/Events";
import EventsCategory from "../dashboard/pages/EventsCategory";
import EventsDetails from "../dashboard/pages/EventsDetails";
import Failed from "../dashboard/pages/Failed";
import Home from "../dashboard/pages/Home";
import Login from "../dashboard/pages/Login";
import MyBooking from "../dashboard/pages/MyBooking";
import Profile from "../dashboard/pages/Profile";
import Register from "../dashboard/pages/Register";
import Success from "../dashboard/pages/Success";
import Unable from "../dashboard/pages/Unable";
import UserIndex from "../dashboard/pages/UserIndex";
import PrivateRoute from "../middleware/ProtectedRoutes";
import ProtectDashboard from "../middleware/protectDashboard";
import ProtectRole from "../middleware/protectRole";

function App() {
  const { store } = useContext(storeContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<FrontLayout />}>
          <Route path="" element={<Home />} />
          <Route path="events" element={<Events />} />
          <Route path="/payment/success/:tranId" element={<Success />} />
          <Route path="/payment/fail/:tranId" element={<Failed />} />
          <Route path="/payment/cancel/:tranId" element={<Cancel />} />
          {/* events details page with id with protected role*/}
          <Route path="events/:id" element={<PrivateRoute />}>
            <Route path="" element={<EventsDetails />} />
          </Route>
          <Route path="cart/:id" element={<PrivateRoute />}>
            <Route path="" element={<Card />} />
          </Route>
        </Route>
        <Route path="/dashboard" element={<ProtectDashboard />}>
          <Route path="" element={<MainLayout />}>
            <Route
              path=""
              element={
                store.userInfo?.role === "admin" ? (
                  <Navigate to="/dashboard/admin" />
                ) : (
                  <Navigate to="/dashboard/user" />
                )
              }
            />
            <Route path="unable-access" element={<Unable />} />
            <Route path="profile" element={<Profile />} />
            <Route path="change-password" element={<ChangePassword />} />
            <Route path="" element={<ProtectRole role={"admin"} />}>
              <Route path="admin" element={<AdminIndex />} />
              <Route path="category" element={<EventsCategory />} />
              <Route path="allcat" element={<AllCatList />} />
              <Route path="category/edit/:id" element={<EditCategory />} />
              <Route path="addevents" element={<AddEvents />} />
              <Route path="allevents" element={<AllEventList />} />
              <Route path="event/edit/:id" element={<EditEvent />} />
              <Route path="allbooking" element={<AllBookingList />} />
            </Route>

            {/* user */}
            <Route path="" element={<ProtectRole role={"user"} />}>
              <Route path="user" element={<UserIndex />} />
              <Route path="mybooking" element={<MyBooking />} />
            </Route>
          </Route>
        </Route>

        <Route path="*" element={<h1 className="text-red-400">Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
