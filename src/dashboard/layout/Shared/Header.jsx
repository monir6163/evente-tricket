import { Link, useNavigate } from "react-router-dom";
import Logo from "../../../assets/logo.png";
import useStore from "../../../hooks/useStore";

export default function Header() {
  const { store } = useStore();
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  };
  return (
    <div className="navbar bg-black border-b-2 border-cyan-100">
      <div className="dropdown">
        <div tabIndex={0} role="button" className="btn btn-primary lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h8m-8 6h16"
            />
          </svg>
        </div>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <Link to={"/dogs"}>Dogs Shop</Link>
          </li>
          <li>
            <Link to={"/faq"}>Faq</Link>
          </li>
          <li>
            <Link to={"/about"}>About</Link>
          </li>
          <li>
            <Link to={"/contact"}>Contact</Link>
          </li>
          {!store?.userInfo && (
            <>
              <li>
                <Link to={"/login"}>Login</Link>
              </li>
              <li>
                <Link to={"/register"}>Register</Link>
              </li>
            </>
          )}
          {store?.userInfo && (
            <>
              <li>
                <Link to={"/dashboard"}>Dashboard</Link>
              </li>
              <li>
                <button
                  // onClick={handleLogout}
                  className="btn bg-red-500 text-white"
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
      <div className="navbar-start">
        <Link to={"/"} className="btn btn-ghost text-xl">
          <img src={Logo} alt="logo" className="w-32" />
        </Link>
      </div>
      <div className="navbar-end hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-slate-100 ">
          <li>
            <Link className="hover:text-slate-300" to={"/"}>
              Home
            </Link>
          </li>
          <li>
            <Link className="hover:text-slate-300" to={"/events"}>
              Browse Events
            </Link>
          </li>
          <li>
            <Link className="hover:text-slate-300" to={"/dashboard/mybooking"}>
              My Trickets
            </Link>
          </li>
          {!store?.userInfo && (
            <>
              <li>
                <Link className="hover:text-slate-300" to={"/login"}>
                  Login
                </Link>
              </li>
              <li>
                <Link className="hover:text-slate-300" to={"/register"}>
                  Register
                </Link>
              </li>
            </>
          )}
          {store?.userInfo && (
            <>
              <li>
                <Link className="hover:text-slate-300" to={"/dashboard"}>
                  Dashboard
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
      {store?.userInfo && (
        <div className="navbar-end space-x-2">
          <button
            onClick={handleLogout}
            className="btn bg-red-500 text-white hidden lg:block"
          >
            Logout
          </button>
          <div className="avatar">
            <div className="w-12 rounded-full border-2 border-black">
              <img src={store?.userInfo?.avater} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
