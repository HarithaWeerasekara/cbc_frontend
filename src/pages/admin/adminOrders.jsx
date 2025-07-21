import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../../components/loader";
import { IoClose } from "react-icons/io5";
import toast from "react-hot-toast";

export default function AdminOrders() {
  const [Orders, setOrders] = useState([]);
  const [loaded, setLoad] = useState(false);
  const [modelIsDisplaying, setModelIsDisplaying] = useState(false);
  const [displayingOrder, setDisplayingOrder] = useState(null);

  useEffect(() => {
    if (!loaded) {
      const token = localStorage.getItem("token");
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/order`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setOrders(response.data);
          setLoad(true);
        });
    }
  }, [loaded]);

  function changeOrderstatus(orderId, status) {
    const token = localStorage.getItem("token");

    axios
      .post(
        `${import.meta.env.VITE_BACKEND_URL}/api/order/${orderId}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        toast.success("Order status updated");
        setLoad(false);
      })
      .catch((error) => {
        console.error("❌ Error updating order:", error);
        toast.error("Failed to update order");
      });
  }

  return (
    <div className="w-full min-h-screen bg-[#fef2f2] px-2 py-4 sm:px-4">
      {loaded ? (
        <div className="overflow-x-auto">
          <h1 className="text-xl sm:text-2xl font-bold text-[#be123c] mb-4 text-center">
            Admin Orders Panel
          </h1>
          <table className="min-w-full bg-white rounded-xl shadow-lg">
            <thead className="bg-[#fda4af] text-[#7f1d1d] text-sm">
              <tr>
                <th className="p-2 text-left">Order ID</th>
                <th className="p-2 text-left">Email</th>
                <th className="p-2 text-left hidden sm:table-cell">Name</th>
                <th className="p-2 text-left hidden md:table-cell">Address</th>
                <th className="p-2 text-left hidden md:table-cell">Phone</th>
                <th className="p-2 text-left">Status</th>
                <th className="p-2 text-left">Total</th>
                <th className="p-2 text-left hidden sm:table-cell">Date</th>
                <th className="p-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {Orders.map((order) => (
                <tr
                  key={order.orderId}
                  className="border-t hover:bg-[#fff1f3] transition-all"
                >
                  <td className="p-2 text-xs sm:text-sm">{order.orderId}</td>
                  <td className="p-2 text-xs sm:text-sm">{order.email}</td>
                  <td className="p-2 text-xs sm:text-sm hidden sm:table-cell">{order.name}</td>
                  <td className="p-2 text-xs hidden md:table-cell">{order.address}</td>
                  <td className="p-2 text-xs hidden md:table-cell">{order.phoneNumber}</td>
                  <td className="p-2">
                    <select
                      value={order.status}
                      onChange={(e) => changeOrderstatus(order.orderId, e.target.value)}
                      className="border border-[#be123c] text-[#7f1d1d] bg-[#fff0f3] rounded px-2 py-1 text-sm"
                    >
                      <option value="pending">Pending</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Canceled">Canceled</option>
                      <option value="Processing">Processing</option>
                    </select>
                  </td>
                  <td className="p-2 text-xs font-semibold text-[#be123c]">
                    Rs {order.total.toFixed(2)}
                  </td>
                  <td className="p-2 text-xs hidden sm:table-cell text-gray-600">
                    {new Date(order.date).toDateString()}
                  </td>
                  <td className="p-2">
                    <button
                      className="bg-[#be123c] hover:bg-[#9f1239] text-white px-3 py-1 rounded text-xs shadow"
                      onClick={() => {
                        setModelIsDisplaying(true);
                        setDisplayingOrder(order);
                      }}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {modelIsDisplaying && displayingOrder && (
            <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
              <div className="w-[95%] max-w-lg h-[90%] bg-white rounded-xl overflow-hidden relative shadow-2xl">
                <div className="bg-[#be123c] text-white p-4">
                  <h1 className="text-lg font-bold">Order ID: {displayingOrder.orderId}</h1>
                  <p className="text-sm">Customer: {displayingOrder.name}</p>
                  <p className="text-sm">Email: {displayingOrder.email}</p>
                  <p className="text-sm">Phone: {displayingOrder.phoneNumber}</p>
                  <p className="text-sm">Address: {displayingOrder.address}</p>
                  <p className="text-sm font-semibold">Total: Rs {displayingOrder.total}</p>
                </div>
                <div className="overflow-y-auto p-4 bg-[#fff0f1] space-y-3 h-[calc(100%-170px)]">
                  {displayingOrder.billItems.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center bg-white rounded-lg p-2 shadow-sm"
                    >
                      <img
                        src={item.image}
                        alt={item.productName}
                        className="w-14 h-14 object-cover rounded mr-3"
                      />
                      <div className="text-sm">
                        <p className="font-semibold text-[#7f1d1d]">{item.productName}</p>
                        <p className="text-gray-600 text-xs">
                          Rs {item.price.toFixed(2)} × {item.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  className="absolute top-2 right-2 bg-white text-gray-700 p-1.5 rounded-full shadow hover:bg-gray-100"
                  onClick={() => {
                    setModelIsDisplaying(false);
                    setDisplayingOrder(null);
                  }}
                >
                  <IoClose size={20} />
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
}