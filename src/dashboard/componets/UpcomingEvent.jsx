import axios from "axios";
import { useEffect, useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { FaClock, FaLocationDot, FaUser } from "react-icons/fa6";
import { RxCountdownTimer } from "react-icons/rx";
import Carousel from "react-multi-carousel";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { baseUrl } from "../../config/config";
import LoadingSpinner from "../../utility/LoadingSpinner";
import formatTimeWithAMPM from "../../utility/TimeConvert";
import CountdownTimer from "../../utility/TimeCountdown";
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 1, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 1, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};
export default function UpcomingEvent() {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${baseUrl}/event/upcoming`);
        if (data?.status === true) {
          setEvents(data.data);
        }
      } catch (error) {
        toast.error("Failed to fetch upevents");
      }
    };
    fetchData();
  }, []);
  if (events.length === 0) return <LoadingSpinner />;

  return (
    <div className="py-10 bg-white">
      <div className="container">
        <h1 className="text-center text-slate-800 font-medium text-2xl uppercase">
          Upcoming Events
        </h1>
        <header className="mb-9" />
        <Carousel
          swipeable={true}
          draggable={true}
          showDots={false}
          responsive={responsive}
          ssr={true} // means to render carousel on server-side.
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={5000}
          keyBoardControl={true}
          transitionDuration={500}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet", "mobile"]}
          deviceType={["desktop", "tablet", "mobile"]}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
        >
          {events?.map((event, i) => (
            <Link key={i} to={`/events/${event?._id}`} className="">
              <div className="card card-event m-2 rounded-lg overflow-hidden hover:shadow">
                <div
                  className="overflow-hidden relative h-64
           bg-cover bg-center bg-no-repeat rounded-t-lg"
                  style={{
                    backgroundImage: `url(${event?.event_img?.url})`,
                  }}
                ></div>

                <div className="info-wrap p-4 bg-slate-200">
                  <div className="event-info">
                    <h5 className="text-xl font-bold mb-2">{event?.title}</h5>
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
                      Tricket Price: ${" "}
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
              </div>
            </Link>
          ))}
        </Carousel>
      </div>
    </div>
  );
}
