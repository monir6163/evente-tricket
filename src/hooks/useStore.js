import { useContext } from "react";
import storeContext from "../context/storeContext";

const useStore = () => {
  const store = useContext(storeContext);

  return store;
};

export default useStore;
