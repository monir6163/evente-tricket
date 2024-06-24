import axios from "axios";
import { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { baseUrl } from "../../config/config";

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

export default function FeturedCat() {
  const [cat, setCat] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(`${baseUrl}/category/all`);
        if (data?.status === true) {
          setCat(data.data);
        }
      } catch (error) {
        toast.error("Failed to fetch categories");
      }
    }
    fetchData();
  }, []);
  return (
    <div className="py-10 bg-slate-100">
      <div className="container">
        <h1 className="text-center text-slate-800 font-medium text-2xl">
          FEATURED CATEGORIES
        </h1>
        <header className="mb-9" />
        <Carousel
          swipeable={true}
          draggable={false}
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
          {cat?.map((item, i) => (
            <Link to={`/events/${item._id}`} key={i}>
              <div className="rounded-lg bg-white shadow-lg m-2 hover:shadow-xl transition duration-500 ease-in-out hover:bg-slate-200">
                <img
                  src={item?.cat_img?.url}
                  alt={item?.name}
                  className="w-40 h-40 mx-auto rounded-lg"
                />
                <h1 className="text-center text-slate-800 font-medium text-lg mt-2">
                  {item?.name}
                </h1>
              </div>
            </Link>
          ))}
        </Carousel>
      </div>
    </div>
  );
}
