import { useState } from "react";
import StarRatings from "react-star-ratings";
import formatTimeWithAMPM from "../../utility/TimeConvert";

/* eslint-disable react/prop-types */
export default function EventDetailsCard({ eventDetails, reviews }) {
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
      <hr className="my-2" />
      {/* show review */}
      <div className="flex items-center gap-2 mt-4 mb-4">
        <h1 className="text-2xl font-bold">Reviews: </h1>
        <div className="flex gap-2 items-center">
          <span
            className="text-green-500 font-bold
            bg-green-100 px-2 py-1 rounded-lg
          "
          >
            {reviews?.length}
          </span>
        </div>
      </div>
      {reviews?.map((review, i) => (
        <a
          key={i}
          className="flex flex-col mb-3 items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 transition duration-300 ease-in-out"
        >
          <img
            className="w-20 h-20 rounded-full object-cover"
            src={review?.userId?.avater?.url}
            alt={review?.userId?.name}
          />
          <div className="flex flex-col justify-between p-4 leading-normal">
            <h5 className="mb-2 text-2xl flex items-center gap-3 font-bold tracking-tight text-gray-900 ">
              {review?.userId?.name}{" "}
              <StarRatings
                rating={review?.rating}
                starRatedColor="blue"
                starDimension="20px"
                starSpacing="1px"
              />
            </h5>
            <p className="mb-3 text-gray-700">
              {new Date(review?.createdAt).toDateString()}
            </p>
            <p className="mb-3 font-normal text-gray-700">{review?.comment}</p>
          </div>
        </a>
      ))}
    </div>
  );
}
