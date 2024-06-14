import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Logo from "../../assets/logo.png";
import { baseUrl } from "../../config/config";
export default function Register() {
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loader, setLoader] = useState(false);
  const inputHandleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();
  const formSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    try {
      const { data } = await axios.post(`${baseUrl}/auth/register`, state);
      if (data.status === true) {
        toast.success(data.message);
        setLoader(false);
        navigate("/login");
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
              <label htmlFor="name" className="font-medium text-slate-600">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                placeholder="Write name"
                className="px-3 py-2 rounded-md outline-0 border border-gray-300 focus:border-green-500 h-10"
                value={state.name}
                onChange={inputHandleChange}
              />
            </div>
            <div className="flex flex-col gap-y-2 mt-5">
              <label htmlFor="email" className="font-medium text-slate-600">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="Write Email"
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
              >
                {loader ? "Please wait..." : "Register"}
              </button>
            </div>
          </form>
          {/* already have account logn now */}
          <div className="mt-5 text-center">
            <p className="text-slate-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-slate-500 hover:text-slate-700 transition duration-200 ease-in-out"
              >
                Login Now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
