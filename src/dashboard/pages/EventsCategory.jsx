import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { baseUrl } from "../../config/config";

export default function EventsCategory() {
  const [state, setState] = useState({
    name: "",
  });
  const [cat_img, setCatImg] = useState(null);
  const [loaader, setLoader] = useState(false);

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setCatImg(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    try {
      const formData = new FormData();
      formData.append("name", state.name);
      formData.append("cat_img", cat_img);
      const { data } = await axios.post(
        `${baseUrl}/category/create`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (data?.status === true) {
        toast.success(data.message);
        setLoader(false);
        e.target.reset();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
      setLoader(false);
    }
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center">
      <div className="w-full mx-auto md:w-1/3">
        <h1 className="text-2xl py-1 font-bold">Events Category</h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-4 shadow rounded-lg"
        >
          <div className="mt-4">
            <label className="text-sm">Category</label>
            <input
              type="text"
              name="name"
              className="w-full px-3 py-2 rounded-md outline-0 border border-gray-300 focus:border-green-500"
              placeholder="Category Name"
              onChange={handleChange}
            />
          </div>
          <div className="mt-4">
            <label className="text-sm">Category Image</label>
            <input
              type="file"
              name="cat_img"
              className="w-full px-3 py-2 rounded-md outline-0 border border-gray-300 focus:border-green-500"
              onChange={handleImageChange}
            />
          </div>
          <div className="mt-4">
            <button className="w-full bg-green-500 text-white py-2 rounded-md">
              {loaader ? "Please wait..." : "Add Category"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
