import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { baseUrl } from "../../config/config";
import LoadingSpinner from "../../utility/LoadingSpinner";

export default function EditCategory() {
  const { id } = useParams();
  const [loaader, setLoader] = useState(false);
  const [state, setState] = useState({
    name: "",
  });
  const [cat_img, setCatImg] = useState(null);
  const [preview, setPreview] = useState(null);
  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(`${baseUrl}/category/get?id=${id}`);
        setState({
          name: data?.data?.name,
        });
        setPreview(data?.data?.cat_img?.url);
      } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong");
      }
    }
    fetchData();
  }, [id]);
  if (state?.name === "") return <LoadingSpinner />;
  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      if (reader.readyState === 2) {
        setPreview(reader.result);
      }
    };
    setCatImg(file);
    reader.readAsDataURL(file);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    try {
      const formData = new FormData();
      formData.append("name", state.name);
      formData.append("cat_img", cat_img);
      const { data } = await axios.patch(
        `${baseUrl}/category/update?id=${id}`,
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
      }
    } catch (error) {
      setLoader(false);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };
  return (
    <div className="bg-gray-100 flex items-center justify-center">
      <div className="w-full mx-auto md:w-1/3">
        <h1 className="text-2xl py-1 font-bold">Update Category</h1>
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
              value={state?.name}
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
            <img
              src={preview}
              alt="preview"
              className="w-20 h-20 object-cover"
            />
          </div>
          <div className="mt-4">
            <button className="w-full bg-green-500 text-white py-2 rounded-md">
              {loaader ? "Please wait..." : "Update Category"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
