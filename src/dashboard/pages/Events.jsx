import { Link } from "react-router-dom";
import { events } from "../../utility/Data";

export default function Events() {
  // const [events, setEvents] = useState([]);

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
          />
          <button className="bg-primary text-light p-2 ml-2">Search</button>
        </div>

        <header className="mb-9" />
        <div className="grid col md:grid-cols-3 gap-5">
          {events?.map((event, i) => (
            <Link
              key={i}
              to={`/events/${event._id}`}
              className="block w-full h-full shadow relative rounded-lg overflow-hidden hover:bg-slate-200
              hover:shadow-lg hover:opacity-90"
            >
              <div className="card card-event bg-white rounded-lg overflow-hidden">
                <div
                  className="overflow-hidden relative h-64
               bg-cover bg-center bg-no-repeat rounded-t-lg"
                  style={{ backgroundImage: `url(${event.image})` }}
                ></div>

                <div className="info-wrap p-4">
                  <div className="event-info">
                    <h5 className="text-xl font-bold mb-2">{event.title}</h5>
                    <div className="text-gray-500 text-sm">
                      {event.location}
                    </div>
                    <div className="text-gray-500 text-sm">{event.dates}</div>
                  </div>
                  <div className="price-wrap text-right mt-2">
                    <span className="text-lg font-bold text-green-600">
                      {event.price ? `$${event.price}` : "Free"}
                    </span>
                  </div>
                </div>
                <span className="event-category bg-gray-200 text-gray-700 py-1 px-2 text-sm rounded-full absolute top-4 left-4">
                  {event.category}
                </span>
                <div className="event-date text-center absolute top-4 right-4">
                  <div className="event-month bg-primary text-light px-2 py-1 rounded-t-lg">
                    Aug
                  </div>
                  <div className="event-day bg-white text-black px-2 py-1 rounded-b-lg">
                    28
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
