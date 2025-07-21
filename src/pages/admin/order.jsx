import { useEffect, useState } from "react";
import axios from "axios";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login to view your orders");
      return;
    }

    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/order`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        alert("Error loading orders");
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <div className="p-6 text-center text-[#be123c] font-semibold animate-pulse">
        Loading your orders...
      </div>
    );

  if (orders.length === 0)
    return (
      <div className="p-6 text-center text-gray-600 font-medium">
        No orders found.
      </div>
    );

  return (
    <div className="w-full min-h-screen bg-[#fff1f2] p-4 sm:p-6 font-sans">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-[#be123c] mb-6 text-center">
        Your Orders
      </h1>

      <div className="grid gap-6">
        {orders.map((order) => (
          <div
            key={order.orderId}
            className="bg-white border border-[#fda4af] rounded-2xl shadow-sm hover:shadow-md transition-all p-5 sm:p-6 space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
              <div className="space-y-1 text-sm text-gray-700 sm:w-1/2">
                <p>
                  <span className="font-semibold text-[#7f1d1d]">Order ID:</span>{" "}
                  {order.orderId}
                </p>
                <p>
                  <span className="font-semibold text-[#7f1d1d]">Email:</span>{" "}
                  {order.email}
                </p>
                <p>
                  <span className="font-semibold text-[#7f1d1d]">Phone:</span>{" "}
                  {order.phoneNumber}
                </p>
                <p>
                  <span className="font-semibold text-[#7f1d1d]">Address:</span>{" "}
                  {order.address}
                </p>
              </div>

              <div className="mt-4 sm:mt-0 text-sm text-gray-700 sm:text-right sm:w-1/2">
                <p>
                  <span className="font-semibold text-[#7f1d1d]">Total:</span>{" "}
                  LKR {order.total.toFixed(2)}
                </p>
                <p>
                  <span className="font-semibold text-[#7f1d1d]">Status:</span>{" "}
                  <span className="text-[#be123c] font-medium">
                    {order.status}
                  </span>
                </p>
              </div>
            </div>

            <div>
              <p className="text-[#be123c] font-semibold mb-2 text-sm sm:text-base">
                Items:
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                {order.billItem.map((item, index) => (
                  <li key={index}>
                    {item.productName} × {item.quantity} —{" "}
                    <span className="text-[#7f1d1d]">
                      LKR {(item.price * item.quantity).toFixed(2)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
