/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";
import { FaCalendarAlt, FaClock, FaUser } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { RxCountdownTimer } from "react-icons/rx";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { baseUrl } from "../../config/config";
import LoadingSpinner from "../../utility/LoadingSpinner";
import formatTimeWithAMPM from "../../utility/TimeConvert";
import CountdownTimer from "../../utility/TimeCountdown";

export default function CategoryEvents() {
  const { id } = useParams();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, [id]);

  const fetchEvents = async () => {
    try {
      const { data } = await axios.get(
        `${baseUrl}/event/category/events/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (data?.status === true) {
        setEvents(data?.data);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch events");
      setLoading(false);
    }
  };

  const isEventExpired = (eventDate) => {
    return new Date(eventDate) < new Date();
  };
  return (
    <div className="py-10 bg-white">
      <div className="container">
        {events?.length === 0 && (
          <h1 className="text-center text-slate-800 font-medium text-2xl">
            No events available in this category
          </h1>
        )}
        <h1 className="text-center text-slate-800 font-medium text-2xl uppercase">
          {events?.length > 0 && (
            <>
              Events in{" "}
              <span className="text-primary">
                {events?.[0]?.category?.name}
                {events?.length > 0 && `(${events?.length})`}
              </span>
            </>
          )}
        </h1>

        {loading && <LoadingSpinner />}

        <header className="mb-9" />
        <div className="grid col md:grid-cols-3 gap-3">
          {events?.map((event, i) => {
            const expired = isEventExpired(event?.date);
            return (
              <div
                key={i}
                className={`card card-event m-2 rounded-lg overflow-hidden hover:shadow ${
                  expired ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {expired ? (
                  <>
                    <div
                      className="overflow-hidden relative h-64 bg-cover bg-center bg-no-repeat rounded-t-lg"
                      style={{
                        backgroundImage: `url(${event?.event_img?.url})`,
                      }}
                    ></div>
                    <div className="info-wrap p-4 bg-slate-200">
                      <div className="event-info">
                        <h5 className="text-xl font-bold mb-2">
                          {event?.title}
                        </h5>
                        <div className="text-gray-500 text-sm flex gap-2 items-center">
                          <FaLocationDot />
                          {event?.location}
                        </div>
                        <div className="text-gray-500 text-sm flex gap-2 items-center">
                          <FaCalendarAlt />
                          {new Date(event?.date).toDateString()}
                        </div>
                        <div className="text-gray-500 text-sm flex gap-2 items-center">
                          <FaUser />
                          {event?.totalSeat}{" "}
                          <small className="text-wrap font-medium text-red-500">
                            seats available
                          </small>
                        </div>
                        <div className="text-gray-500 text-sm flex gap-2 items-center">
                          <FaClock />
                          {formatTimeWithAMPM(new Date(event?.date))}
                        </div>
                        <div className="text-gray-500 text-sm flex gap-2 items-center">
                          <RxCountdownTimer />
                          <CountdownTimer targetDate={event?.date} />
                        </div>
                      </div>
                      <div className="price-wrap text-right mt-2">
                        <span className="text-lg font-bold text-green-600">
                          Ticket Price: ${" "}
                          {event?.price === "null" ? "Free" : event?.price}
                        </span>
                      </div>
                    </div>
                    <span className="event-category bg-gray-200 text-gray-700 py-1 px-2 text-sm rounded-full absolute top-4 left-4">
                      {event?.category?.name}
                    </span>
                    <div className="event-date text-center absolute top-4 right-4">
                      <div className="event-month bg-primary text-light px-2 py-1 rounded-t-lg">
                        {new Date(event?.date).toLocaleString("default", {
                          month: "short",
                        })}
                      </div>
                      <div className="event-day bg-white text-black px-2 py-1 rounded-b-lg">
                        {new Date(event?.date).getDate()}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link to={`/events/${event?._id}`}>
                    <div
                      className="overflow-hidden relative h-64 bg-cover bg-center bg-no-repeat rounded-t-lg"
                      style={{
                        backgroundImage: `url(${event?.event_img?.url})`,
                      }}
                    ></div>

                    <div className="info-wrap p-4 bg-slate-200">
                      <div className="event-info">
                        <h5 className="text-xl font-bold mb-2">
                          {event?.title}
                        </h5>
                        <div className="text-gray-500 text-sm flex gap-2 items-center">
                          <FaLocationDot />
                          {event?.location}
                        </div>
                        <div className="text-gray-500 text-sm flex gap-2 items-center">
                          <FaCalendarAlt />
                          {new Date(event?.date).toDateString()}
                        </div>
                        <div className="text-gray-500 text-sm flex gap-2 items-center">
                          <FaUser />
                          {event?.totalSeat}{" "}
                          <small className="text-wrap font-medium text-red-500">
                            seats available
                          </small>
                        </div>
                        <div className="text-gray-500 text-sm flex gap-2 items-center">
                          <FaClock />
                          {formatTimeWithAMPM(new Date(event?.date))}
                        </div>
                        <div className="text-gray-500 text-sm flex gap-2 items-center">
                          <RxCountdownTimer />
                          <CountdownTimer targetDate={event?.date} />
                        </div>
                      </div>
                      <div className="price-wrap text-right mt-2">
                        <span className="text-lg font-bold text-green-600">
                          Ticket Price: ${" "}
                          {event?.price === "null" ? "Free" : event?.price}
                        </span>
                      </div>
                    </div>
                    <span className="event-category bg-gray-200 text-gray-700 py-1 px-2 text-sm rounded-full absolute top-4 left-4">
                      {event?.category?.name}
                    </span>
                    <div className="event-date text-center absolute top-4 right-4">
                      <div className="event-month bg-primary text-light px-2 py-1 rounded-t-lg">
                        {new Date(event?.date).toLocaleString("default", {
                          month: "short",
                        })}
                      </div>
                      <div className="event-day bg-white text-black px-2 py-1 rounded-b-lg">
                        {new Date(event?.date).getDate()}
                      </div>
                    </div>
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
