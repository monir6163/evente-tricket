/* eslint-disable react/prop-types */
import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import storeContext from "../context/storeContext";
export default function ProtectRole({ role }) {
  const location = useLocation();
  const { store } = useContext(storeContext);
  if (store.userInfo?.role === role) {
    return <Outlet />;
  } else {
    return (
      <Navigate
        to={"/dashboard/unable-access"}
        state={{ from: location }}
        replace
      />
    );
  }
}
