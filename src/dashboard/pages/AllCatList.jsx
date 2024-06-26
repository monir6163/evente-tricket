import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { baseUrl } from "../../config/config";
import LoadingSpinner from "../../utility/LoadingSpinner";

export default function AllCatList() {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const { data } = await axios.get(`${baseUrl}/category/all`);
        setCategory(data?.data);
      } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong");
      }
    };

    fetchCategory();
  }, []);

  const handleDelete = async (id) => {
    try {
      const isConfirm = window.confirm(
        "Are you sure you want to delete this category?"
      );
      if (!isConfirm) return;
      const { data } = await axios.delete(
        `${baseUrl}/category/delete?id=${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (data?.status === true) {
        toast.success(data?.message);
        setCategory(category.filter((cat) => cat?._id !== id));
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="bg-gray-100">
      <div className=" overflow-x-auto">
        {category?.length === 0 && <LoadingSpinner />}
        <table className="w-full text-sm text-left r text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-slate-200">
            <tr>
              <th scope="col" className="px-6 py-3">
                No
              </th>
              <th scope="col" className="px-6 py-3">
                Cat_name
              </th>
              <th scope="col" className="px-6 py-3">
                Cat_img
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {category?.map((cat, index) => (
              <tr className="bg-white border-b" key={index}>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                >
                  {index + 1}
                </th>
                <td className="px-6 py-4">{cat?.name}</td>
                <td className="px-6 py-4">
                  <img
                    src={cat?.cat_img?.url}
                    alt={cat?.name}
                    className="w-10 h-10"
                  />
                </td>
                <td className="flex px-6 py-4 gap-1">
                  <Link
                    to={`/dashboard/category/edit/${cat?._id}`}
                    className="bg-blue-500 text-white px-3 py-1 rounded-sm"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(cat?._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
