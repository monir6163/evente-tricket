/* eslint-disable react/prop-types */
import { useReducer } from "react";
import decoded_Token from "../utility/DecodeToken";
import storeContext from "./storeContext";
import storeReducer from "./storeReducer";

export default function StoreProvider({ children }) {
  const [store, dispatch] = useReducer(storeReducer, {
    userInfo: decoded_Token(localStorage.getItem("token")),
    token: localStorage.getItem("token") || "",
  });
  return (
    <storeContext.Provider value={{ store, dispatch }}>
      {children}
    </storeContext.Provider>
  );
}
