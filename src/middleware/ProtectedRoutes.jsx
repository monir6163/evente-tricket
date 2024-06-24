/* eslint-disable react/prop-types */
import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import storeContext from "../context/storeContext";

const PrivateRoute = () => {
  const { store } = useContext(storeContext);
  const location = useLocation();
  if (store.userInfo) return <Outlet />;
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;
