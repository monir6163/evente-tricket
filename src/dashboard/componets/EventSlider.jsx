import { AiFillCalendar } from "react-icons/ai";
import { FaMoneyBill } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { sliderEvents } from "../../utility/Data";
export default function EventSlider() {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };
  return (
    <Carousel
      swipeable={true}
      draggable={false}
      showDots={true}
      responsive={responsive}
      ssr={true} // means to render carousel on server-side.
      infinite={true}
      autoPlay={true}
      autoPlaySpeed={3000}
      keyBoardControl={true}
      customTransition="all .5"
      transitionDuration={500}
      containerClass="carousel-container"
      removeArrowOnDeviceType={["tablet", "mobile"]}
      deviceType={["desktop", "tablet", "mobile"]}
      dotListClass="custom-dot-list-style bg-transparent"
      itemClass="carousel-item-padding-40-px"
    >
      {sliderEvents.map((event) => (
        <div key={event.id} className="relative">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-96 object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white">
            <h2 className="text-2xl text-center text-wrap font-bold">
              {event.title}
            </h2>
            <p className="text-lg text-center text-wrap">{event.description}</p>
            <p className="text-lg flex gap-1 items-center">
              <AiFillCalendar /> {event.dates.start} - {event.dates.time}
            </p>
            <p className="text-lg flex gap-1 items-center">
              <FaLocationDot />
              {event.location}
            </p>
            <a
              href={event.btnLink}
              className="mt-4 px-4 flex gap-1 items-center py-2 bg-lime-500 hover:bg-primary transition-colors rounded"
            >
              <FaMoneyBill />
              {event.btnText}
            </a>
          </div>
        </div>
      ))}
    </Carousel>
  );
}
