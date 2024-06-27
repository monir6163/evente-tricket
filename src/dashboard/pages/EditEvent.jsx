import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { baseUrl } from "../../config/config";
import LoadingSpinner from "../../utility/LoadingSpinner";

export default function EditEvent() {
  const { id } = useParams();
  const [state, setState] = useState({
    title: "",
    date: "",
    totalSeat: "",
    location: "",
    price: "",
    description: "",
    category: "",
    qty: "",
  });
  const [preview, setPreview] = useState(null);
  const [eventImg, setEventImg] = useState(null);
  const [loader, setLoader] = useState(false);
  const [category, setCategory] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(
          `${baseUrl}/event/getall/admin/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const cat = await axios.get(`${baseUrl}/category/all`);
        setCategory(cat?.data?.data);
        setState({
          title: data?.data?.title,
          date: data?.data?.date,
          totalSeat: data?.data?.totalSeat,
          location: data?.data?.location,
          price: data?.data?.price,
          description: data?.data?.description,
          category: data?.data?.category?._id,
          qty: data?.data?.qty,
        });
        setPreview(data?.data?.event_img?.url);
      } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong");
      }
    }
    fetchData();
  }, [id, token]);

  const handleInputChange = (e) => {
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
    setEventImg(file);
    reader.readAsDataURL(file);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    const formData = new FormData();
    formData.append("title", state.title);
    formData.append("date", state.date);
    formData.append("totalSeat", state.totalSeat);
    formData.append("location", state.location);
    formData.append("price", state.price);
    formData.append("description", state.description);
    formData.append("category", state.category);
    formData.append("qty", state.qty);
    formData.append("event_img", eventImg);
    try {
      const { data } = await axios.patch(
        `${baseUrl}/event/update/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
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
  if (state?.title === "") return <LoadingSpinner />;
  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-4xl">
        <h1 className="text-center text-slate-800 font-medium text-2xl">
          update events
        </h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="flex flex-wrap -mx-3">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="title"
              >
                Event Title <span className="text-red-500">*</span>
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:border-blue-500 focus:outline-none focus:shadow-outline"
                id="title"
                name="title"
                type="text"
                value={state.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="eventdate"
              >
                Event Date
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:border-blue-500 focus:outline-none focus:shadow-outline"
                id="eventdate"
                type="datetime-local"
                value={state.date}
                name="date"
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="totalSeat"
              >
                total Seat <span className="text-red-500">*</span>
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:border-blue-500 focus:outline-none focus:shadow-outline"
                id="totalSeat"
                name="totalSeat"
                type="number"
                value={state.totalSeat}
                onChange={handleInputChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="location"
              >
                Event Location <span className="text-red-500">*</span>
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:border-blue-500 focus:outline-none focus:shadow-outline"
                id="location"
                name="location"
                type="text"
                value={state.location}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="price"
              >
                Tricket Price <span className="text-red-500">*</span>
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:border-blue-500 focus:outline-none focus:shadow-outline"
                id="price"
                name="price"
                type="number"
                value={state.price}
                onChange={handleInputChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="event_img"
              >
                Event Image <span className="text-red-500">*</span>
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:border-blue-500 focus:outline-none focus:shadow-outline"
                id="event_img"
                name="event_img"
                type="file"
                placeholder="Enter Event Image"
                onChange={handleImageChange}
              />
              {preview && (
                <img src={preview} alt="event" className="w-20 h-20  mt-2" />
              )}
            </div>
          </div>
          <div className="flex flex-wrap -mx-3">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="category"
              >
                Event Category <span className="text-red-500">*</span>
              </label>
              <select
                name="category"
                id="category"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:border-blue-500 focus:outline-none focus:shadow-outline"
                onChange={handleInputChange}
              >
                <option>Select Category</option>
                {category?.map((cat) => (
                  <option
                    key={cat?._id}
                    value={cat?._id}
                    selected={state.category === cat?._id}
                  >
                    {cat?.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="qty"
              >
                Total Ticket Quantity <span className="text-red-500">*</span>
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:border-blue-500 focus:outline-none focus:shadow-outline"
                id="qty"
                name="qty"
                type="number"
                value={state.qty}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="w-full mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="description"
            >
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:border-blue-500 focus:outline-none focus:shadow-outline"
              id="description"
              name="description"
              value={state.description}
              onChange={handleInputChange}
            ></textarea>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              {loader ? "Please wait..." : "Update Event"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
