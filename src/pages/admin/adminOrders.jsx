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
    <div className="w-full min-h-screen bg-[#fef2f2] p-2 sm:p-4">
      {loaded ? (
        <div className="w-full h-full overflow-x-auto">
          <table className="min-w-[1000px] w-full bg-white shadow-xl rounded-xl text-sm">
            <thead className="bg-[#fda4af] text-[#7f1d1d] font-semibold">
              <tr>
                <th className="p-3 text-left">Order ID</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left hidden sm:table-cell">Address</th>
                <th className="p-3 text-left hidden sm:table-cell">Phone</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Total</th>
                <th className="p-3 text-left hidden sm:table-cell">Date</th>
                <th className="p-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {Orders.map((order) => (
                <tr
                  key={order.orderId}
                  className="border-t hover:bg-[#fef2f2] transition-all"
                >
                  <td className="p-3">{order.orderId}</td>
                  <td className="p-3">{order.email}</td>
                  <td className="p-3">{order.name}</td>
                  <td className="p-3 hidden sm:table-cell">{order.address}</td>
                  <td className="p-3 hidden sm:table-cell">{order.phoneNumber}</td>
                  <td className="p-3">
                    <select
                      value={order.status}
                      onChange={(e) => changeOrderstatus(order.orderId, e.target.value)}
                      className="border border-[#be123c] bg-[#fef2f2] text-[#7f1d1d] rounded px-2 py-1 text-sm"
                    >
                      <option value="pending">Pending</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Canceled">Canceled</option>
                      <option value="Processing">Processing</option>
                    </select>
                  </td>
                  <td className="p-3 whitespace-nowrap font-semibold text-[#be123c]">
                    Rs {order.total.toFixed(2)}
                  </td>
                  <td className="p-3 hidden sm:table-cell text-gray-600">
                    {new Date(order.date).toDateString()}
                  </td>
                  <td className="p-3">
                    <button
                      className="bg-[#be123c] hover:bg-[#9f1239] text-white px-3 py-1 rounded-md text-xs shadow transition"
                      onClick={() => {
                        setModelIsDisplaying(true);
                        setDisplayingOrder(order);
                      }}
                    >
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Modal for Order Details */}
          {modelIsDisplaying && displayingOrder && (
            <div className="fixed bg-[#00000080] w-full h-full top-0 left-0 flex justify-center items-center z-50">
              <div className="w-[90%] sm:w-[600px] h-[90%] bg-white rounded-xl overflow-hidden shadow-2xl relative">
                <div className="bg-[#be123c] text-white p-5 space-y-1">
                  <h1 className="text-xl font-bold">
                    Order ID: {displayingOrder.orderId}
                  </h1>
                  <p>Customer: {displayingOrder.name}</p>
                  <p>Email: {displayingOrder.email}</p>
                  <p>Phone: {displayingOrder.phoneNumber}</p>
                  <p>Address: {displayingOrder.address}</p>
                  <p className="font-semibold">Total: Rs {displayingOrder.total}</p>
                </div>

                <div className="overflow-y-auto p-4 space-y-3 h-[calc(100%-180px)] bg-[#fff0f1]">
                  {displayingOrder.billItems.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center bg-white rounded-lg p-2 shadow-sm"
                    >
                      <img
                        src={item.image}
                        className="w-16 h-16 object-cover rounded mr-4"
                        alt={item.productName}
                      />
                      <div>
                        <h2 className="font-semibold text-[#7f1d1d]">
                          {item.productName}
                        </h2>
                        <p className="text-gray-600 text-sm">
                          Rs {item.price.toFixed(2)} × {item.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  className="absolute top-2 right-2 bg-white text-gray-700 p-2 rounded-full shadow hover:bg-gray-100"
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
