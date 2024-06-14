import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { baseUrl } from "../../config/config";
import storeContext from "../../context/storeContext";

export default function ChangePassword() {
  const { store } = useContext(storeContext);
  const navigate = useNavigate();
  const [state, setState] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const [loader, setLoader] = useState(false);

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    try {
      const { data } = await axios.put(
        `${baseUrl}/auth/change-password?id=${store.userInfo?.id}`,
        state,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (data?.status === true) {
        toast.success(data.message);
        setLoader(false);
        //remove old token
        localStorage.removeItem("token");
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response.data.message || error.message);
      setLoader(false);
    }
  };

  return (
    <div className="w-full h-full flex justify-center items-center bg-gray-100 font-bold text-gray-500">
      <form
        onSubmit={handleSubmit}
        className="
    bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-1/2"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="old-password"
          >
            Old Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="old-password"
            type="password"
            placeholder="Old Password"
            name="oldPassword"
            onChange={handleChange}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="new-password"
          >
            New Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="new-password"
            type="password"
            placeholder="New Password"
            name="newPassword"
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            disabled={loader}
          >
            {loader ? "Loading..." : "Change Password"}
          </button>
        </div>
      </form>
    </div>
  );
}
