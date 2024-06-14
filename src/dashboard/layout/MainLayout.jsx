import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function MainLayout() {
  return (
    <div className="min-w-screen min-h-screen bg-slate-100">
      <Sidebar />
      <div className="ml-[250px] w-[calc(100vw-270px)] min-h-[100vh]">
        <Header />
        <div className="p-4">
          <div className="pt-[85px]">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
