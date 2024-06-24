import { useContext } from "react";
import { Link } from "react-router-dom";
import storeContext from "../../context/storeContext";

export default function Header() {
  const { store } = useContext(storeContext);
  return (
    <div className="pl-4 fixed w-[calc(100vw-266px)] top-4 z-50">
      <div className="w-full rounded h-[70px] flex justify-between items-center p-4 bg-white">
        <Link to="/" target="_blank" className="text-gray-500 text-sm">
          <span className="text-2xl font-bold text-green-500">
            visit website
          </span>
        </Link>
        <div className="mr-4">
          <div className="flex gap-x-2">
            <div className="flex flex-col justify-center items-end">
              <span>{store.userInfo?.name}</span>
              <span>{store.userInfo?.role}</span>
            </div>
            <img
              className="w-10 h-10 rounded-full border-2 border-green-500"
              src={store.userInfo?.avater || "/vite.svg"}
              alt="profile"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
