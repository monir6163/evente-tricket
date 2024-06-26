import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { baseUrl } from "../../config/config";

export default function AddEvents() {
  const [state, setState] = useState({
    title: "",
    date: "",
    totalSeat: "",
    location: "",
    price: "",
    qty: "",
    category: "",
    description: "",
  });
  const [category, setCategory] = useState([]);
  const [loader, setLoader] = useState(false);
  const [preview, setPreview] = useState(null);
  const [eventImg, setEventImg] = useState(null);
  useEffect(() => {
    async function fetchCategory() {
      try {
        const { data } = await axios.get(`${baseUrl}/category/all`);
        setCategory(data?.data);
      } catch (error) {
        toast.error("Failed to fetch category");
      }
    }
    fetchCategory();
  }, []);
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

  const handleInputChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleAddEvent = async (e) => {
    e.preventDefault();
    setLoader(true);
    try {
      const formData = new FormData();
      formData.append("title", state.title);
      formData.append("date", state.date);
      formData.append("totalSeat", state.totalSeat);
      formData.append("location", state.location);
      formData.append("price", state.price);
      formData.append("qty", state.qty);
      formData.append("category", state.category);
      formData.append("description", state.description);
      formData.append("event_img", eventImg);
      const { data } = await axios.post(`${baseUrl}/event/create`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (data?.status === true) {
        setLoader(false);
        toast.success(data?.message);
        e.target.reset();
        setPreview(null);
      }
    } catch (error) {
      setLoader(false);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-4xl">
        <h1 className="text-center text-slate-800 font-medium text-2xl">
          Add Events
        </h1>
        <form
          onSubmit={handleAddEvent}
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
                placeholder="Enter Event Title"
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
                placeholder="Enter Event Date"
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
                placeholder="Enter total Seat"
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
                placeholder="Enter Event Location"
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
                placeholder="Enter Event Tricket Price"
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
                  <option key={cat?._id} value={cat?._id}>
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
                placeholder="Enter Total Ticket Quantity"
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
              placeholder="Enter Event Description"
              onChange={handleInputChange}
            ></textarea>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              {loader ? "Please wait..." : "Add Event"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
