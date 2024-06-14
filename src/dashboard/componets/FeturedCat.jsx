import { Link } from "react-router-dom";
import { categories } from "../../utility/Data";

export default function FeturedCat() {
  return (
    <div className="py-10 bg-slate-100">
      <div className="container">
        <h1 className="text-center text-slate-800 font-medium text-2xl">
          FEATURED CATEGORIES
        </h1>
        <header className="mb-9" />
        <div className="grid col md:grid-cols-3 gap-5">
          {categories?.map((cat, i) => (
            <Link
              key={i}
              to="/en/events?category=concert-music"
              className="shadow hover:shadow-lg block relative rounded-lg overflow-hidden hover:bg-slate-400 hover:opacity-90"
            >
              <div
                className={` bg-cover bg-center bg-no-repeat h-60`}
                style={{ backgroundImage: `url(${cat.image})` }}
              ></div>
              <div className="text-center font-bold text-white p-4 absolute left-0 right-0 bottom-3">
                {cat.name}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
