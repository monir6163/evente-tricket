import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { baseUrl } from "../../config/config";
import LoadingSpinner from "../../utility/LoadingSpinner";
import AllBookingListTable from "../componets/AllBookingListTable";

export default function MyBooking() {
  const [bookingList, setBookingList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const fetchBookingList = async () => {
        const { data } = await axios.get(`${baseUrl}/booking/get/email`, {
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
  if (loading) return <LoadingSpinner />;
  return (
    <div className="bg-gray-100">
      <div className=" overflow-x-auto">
        <AllBookingListTable bookingList={bookingList} />
      </div>
    </div>
  );
}
