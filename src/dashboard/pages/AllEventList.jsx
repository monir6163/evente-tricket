import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { baseUrl } from "../../config/config";
import LoadingSpinner from "../../utility/LoadingSpinner";

export default function AllEventList() {
  const [allEvents, setAllEvents] = useState([]);
  useEffect(() => {
    async function fetchAllEvents() {
      try {
        const { data } = await axios.get(`${baseUrl}/event/get`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setAllEvents(data?.data);
      } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong");
      }
    }
    fetchAllEvents();
  }, []);

  const deleteEvent = async (id) => {
    const isConfirm = window.confirm("Are you sure you want to delete?");
    if (!isConfirm) return;
    try {
      const { data } = await axios.delete(`${baseUrl}/event/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (data?.status === true) {
        const newEvents = allEvents.filter((event) => event._id !== id);
        setAllEvents(newEvents);
        toast.success(data?.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  const updateStatus = async (id, status) => {
    const isConfirm = window.confirm("Are you sure you want to update?");
    if (!isConfirm) return;
    try {
      const { data } = await axios.put(
        `${baseUrl}/event/update/status/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (data?.status === true) {
        const newEvents = allEvents.map((event) =>
          event._id === id ? { ...event, status } : event
        );
        setAllEvents(newEvents);
        toast.success(data?.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="bg-gray-100">
      <div className=" overflow-x-auto">
        {allEvents?.length === 0 && <LoadingSpinner />}
        <table className="w-full text-sm text-left r text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-slate-200">
            <tr>
              <th scope="col" className="px-6 py-3">
                No
              </th>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Qty
              </th>
              <th scope="col" className="px-6 py-3">
                Image
              </th>
              <th scope="col" className="px-6 py-3">
                Date/Time
              </th>
              <th scope="col" className="px-6 py-3">
                Location
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {allEvents?.map((event, index) => (
              <tr className="bg-white border-b" key={index}>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                >
                  {index + 1}
                </th>
                <td className="px-6 py-4 text-wrap">{event?.title}</td>
                <td className="px-6 py-4">{event?.qty}</td>
                <td className="px-6 py-4">
                  <img
                    src={event?.event_img?.url}
                    alt={event?.title}
                    className="w-10 h-10"
                  />
                </td>
                <td className="px-6 py-4">
                  {moment(new Date(event?.date).toLocaleDateString()).format(
                    "LL"
                  )}{" "}
                </td>
                <td className="px-6 py-4">{event?.location}</td>
                <td className="px-6 py-4">
                  {event?.price === "null" ? "Free" : event?.price}
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() =>
                      updateStatus(
                        event?._id,
                        event?.status === "true" ? "false" : "true"
                      )
                    }
                    className={`${
                      event?.status === "true" ? "bg-green-500" : "bg-red-500"
                    } text-white px-3 py-1 rounded-sm`}
                  >
                    {event?.status === "true" ? "Active" : "Inactive"}
                  </button>
                </td>
                <td className="px-6 py-4">{event?.category?.name} </td>
                <td className="flex px-6 py-4 gap-1">
                  <Link
                    to={`/dashboard/event/edit/${event?._id}`}
                    className="bg-blue-500 text-white px-3 py-1 rounded-sm"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteEvent(event?._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
