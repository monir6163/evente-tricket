export default function Failed() {
  return (
    <div className="container py-2">
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-red-500">Failed</h1>
          <p className="text-lg mt-5">Your order has been failed</p>
        </div>
      </div>
    </div>
  );
}
