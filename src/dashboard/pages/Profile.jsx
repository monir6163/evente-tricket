import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { baseUrl } from "../../config/config";
import storeContext from "../../context/storeContext";
import ProfileUpdate from "../componets/ProfileUpdate";

export default function Profile() {
  const { store } = useContext(storeContext);

  const [user, setUser] = useState({});
  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await axios.get(
          `${baseUrl}/user/userEmail?email=${store?.userInfo?.email}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setUser(data);
      } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong");
      }
    };
    getUser();
  }, [store]);

  return (
    <div className="flex flex-col md:flex-row justify-between">
      <div className="bg-white p-4 shadow rounded-lg w-full mx-auto md:w-1/3">
        <h1 className="text-xl font-semibold">Profile</h1>
        <div className="flex justify-center items-center mt-4">
          <img
            src={user?.user?.avater?.url || "/vite.svg"}
            alt="profile"
            className="w-32 h-32 rounded-full border-2 border-green-500"
          />
        </div>
        <div className="text-center text-wrap">
          <h2 className="text-xl">{user?.user?.name}</h2>
          <p>{user?.user?.email}</p>
          <p>{user?.user?.phone}</p>
          <p>{user?.user?.role}</p>
        </div>
      </div>
      <ProfileUpdate user={user?.user} />
    </div>
  );
}
