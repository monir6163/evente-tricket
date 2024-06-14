import NextTopLoader from "nextjs-toploader";
import ReactDOM from "react-dom/client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import StoreProvider from "./context/StoreProvider.jsx";
import "./index.css";
import App from "./routes/App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StoreProvider>
    <App />
    <ToastContainer position="bottom-right" autoClose="3000" />
    <NextTopLoader />
  </StoreProvider>
);
