/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { baseUrl } from "../../config/config";
import useStore from "../../hooks/useStore";
import LoadingSpinner from "../../utility/LoadingSpinner";

export default function Card() {
  const { id } = useParams();
  const { store } = useStore();
  const [cart, setCart] = useState({});
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const { data } = await axios.get(`${baseUrl}/event/getId/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (data.status === true) {
          setCart(data?.data);
        }
      } catch (error) {
        toast.error("failed to fetch event details");
      }
    };
    fetchCart();
  }, [id]);

  const [order, setOrder] = useState({
    user_id: store.userInfo?.id,
    name: store.userInfo?.name,
    email: store.userInfo?.email,
    phone: "",
    address: "",
    postcode: "",
    currency: "",
    event_id: "",
  });

  useEffect(() => {
    setOrder({
      ...order,

      event_id: cart?._id,
    });
  }, [cart]);

  const handleChange = (e) => {
    setOrder({ ...order, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    try {
      const { data } = await axios.post(`${baseUrl}/payment/create`, order, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (data.status === true) {
        setLoader(false);
        window.location.replace(data?.url);
      }
    } catch (error) {
      setLoader(false);
      toast.error("failed to place order");
    }
  };

  if (!cart?.title) return <LoadingSpinner />;

  return (
    <>
      <section className="py-10">
        <div className="container max-w-screen-xl mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4">
            <main className="md:w-2/4">
              <article className="border border-gray-200 bg-white shadow-sm rounded mb-5 p-3 lg:p-5">
                <h2 className="text-2xl font-semibold text-gray-800 mb-5">
                  Event Details 🎉
                </h2>
                <hr className="my-4" />
                <div>
                  <div className="flex flex-wrap items-center">
                    <div className="w-full">
                      <figure className="flex  items-center leading-5">
                        <div>
                          <div className="block w-40 h-40 rounded border border-gray-200 overflow-hidden">
                            <img
                              src={cart?.event_img?.url}
                              alt="product"
                              className="object-cover w-full h-full"
                            />
                          </div>
                        </div>
                        <figcaption className="ml-3">
                          <p>
                            <Link
                              to={`/events/${cart?._id}`}
                              className="text-lg font-semibold text-gray-800 hover:text-primary"
                            >
                              {cart?.title}
                            </Link>
                          </p>
                          <p className="mt-1 text-gray-400">
                            Price: ${" "}
                            {cart?.price === "null" ? "Free" : cart?.price}
                          </p>
                          <p className="mt-1 text-gray-400">
                            Location: {cart?.location}
                          </p>
                        </figcaption>
                      </figure>
                    </div>
                  </div>
                </div>
              </article>
            </main>
            <aside className="md:w-2/4">
              <article className="border border-gray-200 bg-white shadow-sm rounded mb-5 p-3 lg:p-5">
                <form onSubmit={handleSubmit}>
                  <ul className="mb-5">
                    <li className="text-lg font-bold flex justify-between mt-3 pt-3">
                      <input
                        type="text"
                        name="name"
                        value={order?.name}
                        readOnly
                        className="w-full px-4 py-1 border border-gray-200 rounded-md"
                        onChange={handleChange}
                      />
                    </li>
                    <li className="text-lg font-bold flex justify-between mt-3 pt-3">
                      <input
                        type="text"
                        onChange={handleChange}
                        value={order?.email}
                        readOnly
                        name="email"
                        className="w-full px-4 py-1 border border-gray-200 rounded-md"
                      />
                    </li>
                    <li className="text-lg font-bold flex justify-between mt-3 pt-3">
                      <input
                        type="text"
                        onChange={handleChange}
                        name="phone"
                        placeholder="Phone"
                        className="w-full px-4 py-1 border border-gray-200 rounded-md"
                      />
                    </li>
                    <li className="text-lg font-bold flex justify-between mt-3 pt-3">
                      <input
                        type="text"
                        onChange={handleChange}
                        name="address"
                        placeholder="Address"
                        className="w-full px-4 py-1 border border-gray-200 rounded-md"
                      />
                    </li>
                    <li className="text-lg font-bold flex justify-between mt-3 pt-3">
                      <input
                        type="text"
                        onChange={handleChange}
                        name="postcode"
                        placeholder="Postcode"
                        className="w-full px-4 py-1 border border-gray-200 rounded-md"
                      />
                    </li>
                    <li className="text-lg font-bold flex justify-between mt-3 pt-3">
                      <select
                        name="currency"
                        onChange={handleChange}
                        className="w-full px-4 py-1 border border-gray-200 rounded-md"
                      >
                        <option value="">Select Currency</option>
                        {cart?.price === 0 ? (
                          <option value="0">Free Event</option>
                        ) : (
                          <>
                            <option value="BDT">BDT</option>
                            <option value="USD">USD</option>
                          </>
                        )}
                      </select>
                    </li>
                  </ul>
                  <button
                    type="submit"
                    className="px-4 py-2 mb-2 inline-block text-lg w-full text-center font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 cursor-pointer"
                    disabled={loader}
                  >
                    {loader ? "Processing..." : "Place Order"}
                  </button>
                </form>
              </article>
            </aside>
          </div>
        </div>
      </section>
      {/* end */}
    </>
  );
}
