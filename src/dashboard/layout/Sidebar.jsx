import { useContext } from "react";
import {
  AiFillDashboard,
  AiFillLock,
  AiFillUpCircle,
  AiOutlinePlus,
} from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.png";
import storeContext from "../../context/storeContext";

export default function Sidebar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { store, dispatch } = useContext(storeContext);
  const logout = () => {
    localStorage.removeItem("token");
    dispatch({ type: "logout", payload: "" });
    navigate("/login");
  };
  return (
    <div className="w-[250px] h-screen fixed left-0 top-0 bg-white">
      <div className="h-[70px] px-3 flex justify-start items-center">
        <Link to={"/"}>
          <img src={Logo} alt="logo" />
        </Link>
      </div>
      <div className="mt-2 mb-2 w-full border-b-2 border-slate-200"></div>
      <ul className="px-3 flex flex-col gap-y-1 font-medium">
        {store.userInfo?.role === "admin" ? (
          <>
            <li>
              <Link
                to={"/dashboard/admin"}
                className={`px-3 py-2 hover:shadow-lg hover:shadow-indigo-500/20 w-full flex rounded-sm gap-x-2 items-center justify-start hover:text-white hover:bg-indigo-500 transition-all duration-200 ease-in-out cursor-pointer ${
                  pathname === "/dashboard/admin"
                    ? "bg-indigo-500 text-white"
                    : "text-[#404040f6] bg-white"
                }`}
              >
                <span className="text-xl">
                  <AiFillDashboard />
                </span>
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                to={"/dashboard/category"}
                className={`px-3 py-2 hover:shadow-lg hover:shadow-indigo-500/20 w-full flex rounded-sm gap-x-2 items-center justify-start hover:text-white hover:bg-indigo-500 transition-all duration-200 ease-in-out cursor-pointer ${
                  pathname === "/dashboard/category"
                    ? "bg-indigo-500 text-white"
                    : "text-[#404040f6] bg-white"
                }`}
              >
                <span className="text-xl">
                  <AiOutlinePlus />
                </span>
                <span>Events Category</span>
              </Link>
            </li>
            <li>
              <Link
                to={"/dashboard/allcat"}
                className={`px-3 py-2 hover:shadow-lg hover:shadow-indigo-500/20 w-full flex rounded-sm gap-x-2 items-center justify-start hover:text-white hover:bg-indigo-500 transition-all duration-200 ease-in-out cursor-pointer ${
                  pathname === "/dashboard/allcat"
                    ? "bg-indigo-500 text-white"
                    : "text-[#404040f6] bg-white"
                }`}
              >
                <span className="text-xl">
                  <AiOutlinePlus />
                </span>
                <span>All Category</span>
              </Link>
            </li>
            <li>
              <Link
                to={"/dashboard/addevents"}
                className={`px-3 py-2 hover:shadow-lg hover:shadow-indigo-500/20 w-full flex rounded-sm gap-x-2 items-center justify-start hover:text-white hover:bg-indigo-500 transition-all duration-200 ease-in-out cursor-pointer ${
                  pathname === "/dashboard/addevents"
                    ? "bg-indigo-500 text-white"
                    : "text-[#404040f6] bg-white"
                }`}
              >
                <span className="text-xl">
                  <AiOutlinePlus />
                </span>
                <span>Add Events</span>
              </Link>
            </li>
            <li>
              <Link
                to={"/dashboard/allevents"}
                className={`px-3 py-2 hover:shadow-lg hover:shadow-indigo-500/20 w-full flex rounded-sm gap-x-2 items-center justify-start hover:text-white hover:bg-indigo-500 transition-all duration-200 ease-in-out cursor-pointer ${
                  pathname === "/dashboard/allevents"
                    ? "bg-indigo-500 text-white"
                    : "text-[#404040f6] bg-white"
                }`}
              >
                <span className="text-xl">
                  <AiOutlinePlus />
                </span>
                <span>All Events</span>
              </Link>
            </li>
            <li>
              <Link
                to={"/dashboard/allbooking"}
                className={`px-3 py-2 hover:shadow-lg hover:shadow-indigo-500/20 w-full flex rounded-sm gap-x-2 items-center justify-start hover:text-white hover:bg-indigo-500 transition-all duration-200 ease-in-out cursor-pointer ${
                  pathname === "/dashboard/allbooking"
                    ? "bg-indigo-500 text-white"
                    : "text-[#404040f6] bg-white"
                }`}
              >
                <span className="text-xl">
                  <AiOutlinePlus />
                </span>
                <span>All Booking</span>
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link
                to={"/dashboard/user"}
                className={`px-3 py-2 hover:shadow-lg hover:shadow-indigo-500/20 w-full flex rounded-sm gap-x-2 items-center justify-start hover:text-white hover:bg-indigo-500 transition-all duration-200 ease-in-out cursor-pointer ${
                  pathname === "/dashboard/user"
                    ? "bg-indigo-500 text-white"
                    : "text-[#404040f6] bg-white"
                }`}
              >
                <span className="text-xl">
                  <AiFillDashboard />
                </span>
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                to={"/dashboard/mybooking"}
                className={`px-3 py-2 hover:shadow-lg hover:shadow-indigo-500/20 w-full flex rounded-sm gap-x-2 items-center justify-start hover:text-white hover:bg-indigo-500 transition-all duration-200 ease-in-out cursor-pointer ${
                  pathname === "/dashboard/mybooking"
                    ? "bg-indigo-500 text-white"
                    : "text-[#404040f6] bg-white"
                }`}
              >
                <span className="text-xl">
                  <AiFillDashboard />
                </span>
                <span>My Trickets</span>
              </Link>
            </li>
          </>
        )}
        <li>
          <Link
            to={"/dashboard/profile"}
            className={`px-3 py-2 hover:shadow-lg hover:shadow-indigo-500/20 w-full flex rounded-sm gap-x-2 items-center justify-start hover:text-white hover:bg-indigo-500 transition-all duration-200 ease-in-out cursor-pointer ${
              pathname === "/dashboard/profile"
                ? "bg-indigo-500 text-white"
                : "text-[#404040f6] bg-white"
            }`}
          >
            <span className="text-xl">
              <AiFillUpCircle />
            </span>
            <span>Profile</span>
          </Link>
        </li>
        <li>
          <Link
            to={"/dashboard/change-password"}
            className={`px-3 py-2 hover:shadow-lg hover:shadow-indigo-500/20 w-full flex rounded-sm gap-x-2 items-center justify-start hover:text-white hover:bg-indigo-500 transition-all duration-200 ease-in-out cursor-pointer ${
              pathname === "/dashboard/change-password"
                ? "bg-indigo-500 text-white"
                : "text-[#404040f6] bg-white"
            }`}
          >
            <span className="text-xl">
              <AiFillUpCircle />
            </span>
            <span>Change Password</span>
          </Link>
        </li>
        <li>
          <button
            onClick={logout}
            className={`px-3 py-2 hover:shadow-lg hover:shadow-indigo-500/20 w-full flex rounded-sm gap-x-2 items-center justify-start hover:text-white hover:bg-indigo-500 transition-all duration-200 ease-in-out cursor-pointer`}
          >
            <span className="text-xl">
              <AiFillLock />
            </span>
            <span>Logout</span>
          </button>
        </li>
      </ul>
    </div>
  );
}
