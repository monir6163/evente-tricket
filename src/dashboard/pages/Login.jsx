import axios from "axios";
import { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import Logo from "../../assets/logo.png";
import { baseUrl } from "../../config/config";
import storeContext from "../../context/storeContext";
export default function Login() {
  const { dispatch } = useContext(storeContext);
  // const navigate = useNavigate();
  const location = useLocation();
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const [loader, setLoader] = useState(false);
  const inputHandleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const formSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    try {
      const { data } = await axios.post(`${baseUrl}/auth/login`, state);
      localStorage.setItem("token", data.token);
      dispatch({
        type: "login_success",
        payload: {
          token: data.token,
        },
      });
      if (data.status === true) {
        toast.success(data.message);
        setLoader(false);
        const { from } = location.state || { from: { pathname: "/" } };
        window.location.href = from.pathname;
      }
    } catch (error) {
      setLoader(false);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };
  return (
    <div className="min-w-screen min-h-screen bg-slate-200 flex justify-center items-center">
      <div className="w-[370px] text-slate-300 shadow-md">
        <div className="bg-white h-full px-7 py-8 rounded-md">
          <div className="w-full flex justify-center items-center">
            <img src={Logo} alt="logo" />
          </div>
          <div className="mt-2 w-full border-b-2 border-slate-200"></div>
          <form onSubmit={formSubmit}>
            <div className="flex flex-col gap-y-2 mt-5">
              <label htmlFor="email" className="font-medium text-slate-600">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Write Email"
                required
                className="px-3 py-2 rounded-md outline-0 border border-gray-300 focus:border-green-500 h-10"
                value={state.email}
                onChange={inputHandleChange}
              />
            </div>
            <div className="flex flex-col gap-y-2 mt-5">
              <label htmlFor="password" className="font-medium text-slate-600">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Write Password"
                required
                className="px-3 py-2 rounded-md outline-0 border border-gray-300 focus:border-green-500 h-10"
                value={state.password}
                onChange={inputHandleChange}
              />
            </div>
            <div className="mt-5">
              <button
                type="submit"
                className="w-full bg-slate-500 text-white py-2 rounded-md hover:bg-slate-700 transition duration-200 ease-in-out"
                disabled={loader}
              >
                {loader ? "Please Wait..." : "Login"}
              </button>
            </div>
          </form>
          {/* New user Create account */}
          <div className="mt-5 text-center">
            <p className="text-slate-600">
              New User?{" "}
              <Link
                to="/register"
                className="text-slate-500 hover:text-slate-700 transition duration-200 ease-in-out"
              >
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
