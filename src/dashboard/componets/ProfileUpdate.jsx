/* eslint-disable react/prop-types */
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { baseUrl } from "../../config/config";
import storeContext from "../../context/storeContext";

export default function ProfileUpdate({ user }) {
  const { dispatch } = useContext(storeContext);
  const token = localStorage.getItem("token");
  const [state, setState] = useState({
    name: user?.name,
    phone: user?.phone,
    role: user?.role,
    email: user?.email,
  });
  useEffect(() => {
    setState({
      name: user?.name,
      phone: user?.phone,
      role: user?.role,
      email: user?.email,
    });
  }, [user]);
  const [profileImage, setProfileImage] = useState(null);
  const [loader, setLoader] = useState(false);

  const handleInputChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);

    try {
      const formData = new FormData();
      formData.append("name", state.name);
      formData.append("phone", state.phone);
      formData.append("role", state.role);
      formData.append("email", state.email);
      formData.append("profileImage", profileImage);

      const { data } = await axios.patch(
        `${baseUrl}/user/userUpdate?id=${user?._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data.status === true) {
        localStorage.setItem("token", data.token);
        dispatch({
          type: "login_success",
          payload: {
            token: data.token,
          },
        });
        toast.success(data.message);
        setLoader(false);
        //refresh the page without reloading
        window.location.href = "/dashboard/profile";
      }
    } catch (error) {
      setLoader(false);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="w-full mx-auto md:w-1/3">
      <form onSubmit={handleSubmit} className="bg-white p-4 shadow rounded-lg">
        <div className="mt-4">
          <label className="text-sm">Name</label>
          <input
            type="text"
            name="name"
            className="w-full px-3 py-2 rounded-md outline-0 border border-gray-300 focus:border-green-500"
            onChange={handleInputChange}
            value={state?.name}
          />
        </div>
        <div className="mt-4">
          <label className="text-sm">Email</label>
          <input
            type="email"
            name="email"
            className="w-full px-3 py-2 rounded-md outline-0 border border-gray-300 focus:border-green-500"
            onChange={handleInputChange}
            value={state?.email}
          />
        </div>
        <div className="mt-4">
          <label className="text-sm">Phone</label>
          <input
            type="number"
            name="phone"
            className="w-full px-3 py-2 rounded-md outline-0 border border-gray-300 focus:border-green-500"
            onChange={handleInputChange}
            value={state.phone}
          />
        </div>
        <div className="mt-4">
          <label className="text-sm">Role</label>
          <select
            name="role"
            id=""
            className="w-full px-3 py-2 rounded-md outline-0 border border-gray-300 focus:border-green-500"
            onChange={handleInputChange}
          >
            <option
              value="admin"
              selected={state.role === "admin" ? "selected" : ""}
            >
              Admin
            </option>
            <option
              value="user"
              selected={state.role === "user" ? "selected" : ""}
            >
              User
            </option>
          </select>
        </div>
        <div className="mt-4">
          <label className="text-sm">Profile Image</label>
          <input
            type="file"
            name="profileImage"
            className="w-full px-3 py-2 rounded-md outline-0 border border-gray-300 focus:border-green-500"
            onChange={handleImageChange}
          />
        </div>
        <div className="mt-4">
          <button className="w-full bg-green-500 text-white py-2 rounded-md">
            {loader ? "Loading..." : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
}
