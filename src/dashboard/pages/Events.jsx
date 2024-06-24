/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import { FaCalendarAlt, FaClock } from "react-icons/fa";
import { FaLocationDot, FaUser } from "react-icons/fa6";
import { RxCountdownTimer } from "react-icons/rx";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { baseUrl } from "../../config/config";
import LoadingSpinner from "../../utility/LoadingSpinner";
import formatTimeWithAMPM from "../../utility/TimeConvert";
import CountdownTimer from "../../utility/TimeCountdown";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [searchkeyword, setSearchKeyword] = useState("0");
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [perPage, setPerPage] = useState(6);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data } = await axios.get(
          `${baseUrl}/event/getall/1/${perPage}/${searchkeyword}`
        );
        if (data?.status === true) {
          setEvents(data?.data[0]?.Rows);
          setTotal(data?.data[0]?.Total[0]?.count);
          setLoading(false);
        }
      } catch (error) {
        toast.error("Failed to fetch events");
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const searchKeywordOnChange = async (e) => {
    setSearchKeyword(e.target.value);

    if (e.target.value.length === 0) {
      setLoading(true);
      setSearchKeyword("0");
      try {
        const { data } = await axios.get(
          `${baseUrl}/event/getall/1/${perPage}/0`
        );
        if (data?.status === true) {
          setEvents(data?.data[0]?.Rows);
          setTotal(data?.data[0]?.Total[0]?.count);
        }
      } catch (error) {
        toast.error("Failed to fetch events");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true);

    axios
      .get(`${baseUrl}/event/getall/1/${perPage}/${searchkeyword}`)
      .then((res) => {
        if (res.data?.status === true) {
          setEvents(res.data?.data[0]?.Rows);
          setTotal(res.data?.data[0]?.Total[0]?.count);
        }
      })
      .catch((error) => {
        toast.error("Failed to fetch events");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const isEventExpired = (eventDate) => {
    return new Date(eventDate) < new Date();
  };

  const handlePageClick = async (event) => {
    let pageNo = event.selected;
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${baseUrl}/event/getall/${pageNo + 1}/${perPage}/${searchkeyword}`
      );
      if (data?.status === true) {
        setEvents(data?.data[0]?.Rows);
        setTotal(data?.data[0]?.Total[0]?.count);
      }
    } catch (error) {
      toast.error("Failed to fetch events");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-10 bg-white">
      <div className="container">
        <h1 className="text-center text-slate-800 font-medium text-2xl uppercase">
          All Events
        </h1>
        {/* search events */}
        <div className="flex justify-center mt-5">
          <input
            type="text"
            placeholder="Search Events"
            className="border border-gray-300 p-2 w-1/2"
            onChange={searchKeywordOnChange}
          />
          <button
            className="bg-primary text-light px-3 py-2 ml-2 rounded-lg"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>

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
        <div className="flex justify-center mt-5">
          <ReactPaginate
            pageCount={Math.ceil(total / perPage)}
            pageRangeDisplayed={5}
            marginPagesDisplayed={2}
            renderOnZeroPageCount={null}
            containerClassName="flex gap-2"
            pageClassName="bg-primary text-light px-3 py-2 rounded-lg"
            previousClassName="bg-primary text-light px-3 py-2 rounded-lg"
            nextClassName="bg-primary text-light px-3 py-2 rounded-lg"
            breakClassName="bg-primary text-light px-3 py-2 rounded-lg"
            activeClassName="bg-white text-primary px-3 py-2 rounded-lg"
            onPageChange={handlePageClick}
          />
        </div>
      </div>
    </div>
  );
}
