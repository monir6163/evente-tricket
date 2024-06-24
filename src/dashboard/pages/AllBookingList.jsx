import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { baseUrl } from "../../config/config";
import LoadingSpinner from "../../utility/LoadingSpinner";
import AllBookingListTable from "../componets/AllBookingListTable";

export default function AllBookingList() {
  const [bookingList, setBookingList] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredBooking, setFilteredBooking] = useState(bookingList);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const fetchBookingList = async () => {
        const { data } = await axios.get(`${baseUrl}/booking/get-all`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (data?.status === true) {
          setBookingList(data?.data);
          setLoading(false);
        }
      };

      fetchBookingList();
    } catch (error) {
      setLoading(false);
      toast.error("failed to fetch booking list");
    }
  }, []);

  useEffect(() => {
    if (search === "") {
      setFilteredBooking(bookingList);
    } else {
      const newFilteredBooking = bookingList.filter(
        (book) =>
          book.tran_id.toLowerCase().includes(search.toLowerCase()) ||
          book.order.phone.toLowerCase().includes(search.toLowerCase()) ||
          book.order.email.toLowerCase().includes(search.toLowerCase())
      );
      if (newFilteredBooking.length === 0) toast.error("No events found");
      setFilteredBooking(newFilteredBooking);
    }
  }, [search, bookingList]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="bg-gray-100">
      <div className=" overflow-x-auto">
        <div className="flex w-full justify-between items-center p-4 bg-white">
          <input
            type="text"
            placeholder="tranId, phone, email"
            className="p-2 border-2 border-gray-700 rounded w-1/3"
            onChange={handleSearch}
          />
        </div>
        <AllBookingListTable bookingList={filteredBooking} />
      </div>
    </div>
  );
}
