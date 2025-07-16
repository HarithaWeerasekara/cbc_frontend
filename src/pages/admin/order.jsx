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
    return <div className="p-4 text-[#be123c] font-semibold">Loading orders...</div>;

  if (orders.length === 0)
    return <div className="p-4 text-gray-600">No orders found.</div>;

  return (
    <div className="p-4 min-h-screen bg-[#fef2f2]">
      <h1 className="text-2xl font-bold text-[#be123c] mb-6">Your Orders</h1>
      <div className="space-y-5">
        {orders.map((order) => (
          <div
            key={order.orderId}
            className="bg-white border border-[#fda4af] rounded-xl p-4 shadow-md"
          >
            <div className="mb-2 text-sm text-[#7f1d1d] space-y-1">
              <p><strong>Order ID:</strong> {order.orderId}</p>
              <p><strong>Email:</strong> {order.email}</p>
              <p><strong>Address:</strong> {order.address}</p>
              <p><strong>Phone:</strong> {order.phoneNumber}</p>
              <p><strong>Total:</strong> LKR {order.total.toFixed(2)}</p>
              <p><strong>Status:</strong> <span className="text-[#be123c] font-medium">{order.status}</span></p>
            </div>

            <div className="mt-3">
              <p className="font-semibold text-[#be123c] mb-1">Items:</p>
              <ul className="list-disc ml-6 text-gray-700 text-sm space-y-1">
                {order.billItem.map((item, index) => (
                  <li key={index}>
                    {item.productName} × {item.quantity} — LKR{" "}
                    {(item.price * item.quantity).toFixed(2)}
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
