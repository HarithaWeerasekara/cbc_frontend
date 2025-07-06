// pages/Orders.jsx
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

  if (loading) return <div className="p-4">Loading orders...</div>;

  if (orders.length === 0)
    return <div className="p-4 text-gray-600">No orders found.</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-[#64242F] mb-4">Your Orders</h1>
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.orderId} className="border rounded p-4 shadow">
            <p><strong>Order ID:</strong> {order.orderId}</p>
            <p><strong>Email:</strong> {order.email}</p>
            <p><strong>Address:</strong> {order.address}</p>
            <p><strong>Phone:</strong> {order.phoneNumber}</p>
            <p><strong>Total:</strong> LKR {order.total.toFixed(2)}</p>

            <div className="mt-2">
              <p className="font-semibold">Items:</p>
              <ul className="list-disc ml-6">
                {order.billItem.map((item, index) => (
                  <li key={index}>
                    {item.productName} × {item.quantity} — LKR {item.price * item.quantity}
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
