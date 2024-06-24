import moment from "moment";

/* eslint-disable react/prop-types */
export default function AllBookingListTable({ bookingList }) {
  return (
    <div>
      <table className="w-full text-sm text-left r text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-slate-200">
          <tr>
            <th scope="col" className="px-6 py-3">
              No
            </th>
            <th scope="col" className="px-6 py-3">
              tranId
            </th>
            <th scope="col" className="px-6 py-3">
              amount
            </th>
            <th scope="col" className="px-6 py-3">
              CardType
            </th>
            <th scope="col" className="px-6 py-3">
              TranDate
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Location
            </th>
            <th scope="col" className="px-6 py-3 text-wrap">
              Title
            </th>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Phone
            </th>
          </tr>
        </thead>
        <tbody>
          {bookingList?.map((book, index) => (
            <tr className="bg-white border-b" key={index}>
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
              >
                {index + 1}
              </th>
              <td className="px-6 py-4 text-wrap">{book?.tran_id}</td>
              <td className="px-6 py-4">
                {book?.amount} {book?.currency}
              </td>
              <td className="px-6 py-4">{book?.card_type}</td>
              <td className="px-6 py-4">
                {moment(new Date(book?.tran_date).toLocaleDateString()).format(
                  "LL"
                )}{" "}
              </td>
              <td className="px-6 py-4">{book?.paymentStatus}</td>
              <td className="px-6 py-4">{book?.event_id?.location}</td>
              <td className="px-6 py-4">{book?.event_id?.title}</td>
              <td className="px-6 py-4">{book?.order?.name}</td>
              <td className="px-6 py-4">{book?.order?.email}</td>
              <td className="px-6 py-4">{book?.order?.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
