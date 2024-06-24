import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { baseUrl, keyMap } from "../../config/config";
import LoadingSpinner from "../../utility/LoadingSpinner";
import formatTimeWithAMPM from "../../utility/TimeConvert";
import EventDetailsCard from "../componets/EventDetailsCard";

export default function EventsDetails() {
  const { id } = useParams();
  const [eventDetails, setEventDetails] = useState({});

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const { data } = await axios.get(`${baseUrl}/event/getId/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (data.status === true) {
          setEventDetails(data?.data);
        }
      } catch (error) {
        toast.error("failed to fetch event details");
      }
    };
    fetchEvent();
  }, [id]);
  if (!eventDetails?.title) return <LoadingSpinner />;
  return (
    <div className="pb-4 bg-gray-100">
      <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <img
          className="absolute inset-0 w-full h-full object-cover"
          src={eventDetails?.event_img?.url}
          alt="event"
        />
        <div className="absolute inset-0 bg-[#000] bg-opacity-80 bg-blend-overlay flex justify-start items-center">
          <div className="max-w-7xl px-4 mx-auto">
            <div className="text-center text-5xl font-bold text-wrap text-primary uppercase">
              <h2>Event Details</h2>
            </div>
            <div>
              <h1 className="text-white md:text-4xl text-2xl text-center pt-3 md:pt-5 font-semibold">
                Know More 👉
                <span className="text-primary">
                  <span>{eventDetails?.title}</span>
                </span>
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div className="container py-2 ">
        <div className="grid grid-cols-1 md:grid-cols-6 lg:gap-12 gap-5 ">
          <div className="md:col-span-4 col-span-1 -mt-24 z-10 p-2">
            <div className="left-side">
              <EventDetailsCard eventDetails={eventDetails} />
            </div>
          </div>
          <div className="md:col-span-2 col-span-1 mt-0 md:mt-16">
            {/* i want sticky sidebar */}
            <div className="right-side">
              <div className="bg-white p-4 rounded-lg shadow">
                <h1 className="text-2xl font-semibold">Event Details</h1>
                <div className="flex gap-x-2 mt-2">
                  <span className="text-gray-500">Price:</span>
                  <span className="text-gray-600">
                    {eventDetails?.price === "null"
                      ? "Free"
                      : `$${eventDetails?.price}`}
                  </span>
                </div>
                <div className="flex gap-x-2 mt-2">
                  <span className="text-gray-500">Category:</span>
                  <span className="text-gray-600">
                    {eventDetails?.category?.name}
                  </span>
                </div>
                <div className="flex gap-x-2 mt-2">
                  <span className="text-gray-500">Date:</span>
                  <span className="text-gray-600">
                    {new Date(eventDetails?.date).toDateString()}
                  </span>
                </div>
                <div className="flex gap-x-2 mt-2">
                  <span className="text-gray-500">Time:</span>
                  <span className="text-gray-600">
                    {formatTimeWithAMPM(new Date(eventDetails?.date))}
                  </span>
                </div>
                <div className="flex gap-x-2 mt-2">
                  <span className="text-gray-500">Location:</span>
                  <span className="text-gray-600">
                    {eventDetails?.location}
                  </span>
                </div>
                <div className="flex gap-x-2 mt-2">
                  <span className="text-gray-500">Total Seat:</span>
                  <span className="text-gray-600">
                    {eventDetails?.totalSeat}{" "}
                    <small className="text-wrap font-medium text-red-500">
                      seats available
                    </small>
                  </span>
                </div>
              </div>
              {/* book a tricket */}
              <div className="bg-white p-4 rounded-lg shadow mt-4">
                <h1 className="text-2xl font-semibold">Book a Tricket</h1>

                <div className="flex gap-x-2 mt-2">
                  {eventDetails?.totalSeat > 0 ? (
                    <Link to={`/cart/${eventDetails?._id}`}>
                      <button className="bg-primary text-white px-4 py-2 rounded-lg">
                        Book Now{" "}
                        {eventDetails?.price === "null"
                          ? "Free"
                          : `$${eventDetails?.price}`}
                      </button>
                    </Link>
                  ) : (
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded-lg"
                      disabled
                    >
                      Sold Out
                    </button>
                  )}
                </div>
              </div>

              {/* location google map */}
              <div className="bg-white p-4 rounded-lg shadow mt-4">
                <h1 className="text-2xl font-semibold">Location</h1>
                <div className="flex gap-x-2 mt-2">
                  <iframe
                    className="w-full h-60"
                    src={`https://www.google.com/maps/embed/v1/place?key=${keyMap}&q=${eventDetails?.location}`}
                    allowFullScreen=""
                    loading="lazy"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
