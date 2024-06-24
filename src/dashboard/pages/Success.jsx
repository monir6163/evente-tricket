import { Navigate, useParams } from "react-router-dom";

export default function Success() {
  const { tranId } = useParams();
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/" />;
  }

  return (
    <div className="container py-2">
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-green-500">Success</h1>
          <p className="text-lg mt-5">
            Your order has been placed successfully with transaction id:{" "}
            {tranId}
          </p>
        </div>
      </div>
    </div>
  );
}
