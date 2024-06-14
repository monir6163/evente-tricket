/* eslint-disable react/prop-types */
import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import storeContext from "../context/storeContext";

export default function ProtectDashboard() {
  const location = useLocation();
  const { store } = useContext(storeContext);
  // if (loading) return <LoadingSpinner />;
  if (store?.userInfo) {
    return <Outlet />;
  } else {
    return <Navigate to={"/login"} state={{ from: location }} replace />;
  }
}
