import { useState } from "react";
import formatTimeWithAMPM from "../../utility/TimeConvert";

/* eslint-disable react/prop-types */
export default function EventDetailsCard({ eventDetails }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <div>
      <div className="relative mb-5">
        <img
          src={eventDetails?.event_img?.url}
          className="w-full rounded border-[15px] border-slate-300"
          alt={eventDetails?.title}
        />
        <div className=" absolute top-[45px] bg-slate-300  md:px-7 md:py-3 px-5 py-3 font-semibold text-lg">
          {eventDetails?.title}
        </div>
      </div>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Price: </h1>
        <div className="flex gap-x-2">
          <span className="text-green-500 font-bold">
            {eventDetails?.price === "null"
              ? "Free"
              : `$${eventDetails?.price}`}
          </span>
        </div>
      </div>
      <div className="flex gap-x-2 mt-2">
        <span className="text-gray-500">Category:</span>
        <span className="text-gray-600">{eventDetails?.category?.name}</span>
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
        <span className="text-gray-600">{eventDetails?.location}</span>
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
      <hr className="my-2" />

      <div className="flex flex-col gap-x-2 mt-2">
        <span className="text-gray-500 font-bold">Description:</span>
        <span className="text-gray-600 leading-8">
          {isExpanded
            ? eventDetails?.description
            : `${eventDetails?.description?.substring(0, 400)}...`}
        </span>
        <button
          type="button"
          className="text-primary font-semibold"
          onClick={toggleReadMore}
        >
          {isExpanded ? "Read Less" : "Read More"}
        </button>
      </div>
    </div>
  );
}
