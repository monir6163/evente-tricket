import { Outlet } from "react-router-dom";
import Footer from "./Shared/Footer";
import Header from "./Shared/Header";

export default function FrontLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
