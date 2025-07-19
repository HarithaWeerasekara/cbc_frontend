import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const cartItems = location.state?.items || [];

  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [labeledTotal, setLabeledTotal] = useState(0);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (!cartItems.length) {
      navigate("/", { replace: true });
      return;
    }
    setCart(cartItems);

    let totalValue = 0;
    let labeledValue = 0;

    cartItems.forEach((item) => {
      totalValue += item.price * item.quantity;
      labeledValue += item.labeledPrice * item.quantity;
    });

    setTotal(totalValue);
    setLabeledTotal(labeledValue);
  }, [cartItems, navigate]);

  if (!cartItems.length) return null;

  const placeOrder = () => {
    const token = localStorage.getItem("token");

    
    if (!token) {
      alert("Please login to place an order");
      navigate("/login");
      return;
      
    }

    const orderData = {
      name,
      address,
      phoneNumber: phone,
      billItems: cart.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
          image: item.image,
          productName: item.name,
          labeledPrice: item.labeledPrice,
})),
    };

    

    console.log("Bill Items to send:", orderData.billItems)

    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/order`, orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("Order success:", res.data);
        alert("Order placed successfully!");
        navigate("/");
      })
      .catch((err) => {
        console.error("Order failed:", err.response?.data || err.message);
        alert("Failed to place order. Try again.");
      });
  };

  return (
    <div className="min-h-screen bg-[#F7F1F3] py-6 px-4 flex justify-center">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-2xl font-extrabold mb-6 text-[#64242F]">Checkout Summary</h1>

        <div className="space-y-4">
          {cart.map((item, index) => (
            <div
              key={index}
              className="flex justify-between border-b border-gray-200 pb-3 items-center"
            >
              <div className="flex items-center gap-4">
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                )}
                <div>
                  <h2 className="text-md font-semibold text-gray-800">{item.name}</h2>
                  <p className="text-sm text-gray-500">
                    {Array.isArray(item.altNames) ? item.altNames.join(", ") : ""}
                  </p>
                  <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                </div>
              </div>

              <div className="text-right">
                <p className="text-md font-semibold text-[#64242F]">
                  LKR {(item.price * item.quantity).toFixed(2)}
                </p>
                {item.labeledPrice > item.price && (
                  <p className="text-xs text-gray-400 line-through">
                    LKR {(item.labeledPrice * item.quantity).toFixed(2)}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 border-t border-gray-300 pt-6 space-y-4">

          {/* Summary */}
          <div className="grid grid-cols-2 gap-2 text-base">
            <span className="text-gray-700">Original Price</span>
            <span className="text-right line-through text-gray-400">
              LKR {labeledTotal.toFixed(2)}
            </span>

            <span className="text-gray-700">Discount</span>
            <span className="text-right text-red-500">
              − LKR {(labeledTotal - total).toFixed(2)}
            </span>

            <span className="text-xl font-bold text-[#64242F]">Total</span>
            <span className="text-xl font-bold text-green-600 text-right">
              LKR {total.toFixed(2)}
            </span>
          </div>

          {/* User Inputs */}
          <div className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full h-12 px-4 border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#64242F]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Delivery address"
                className="w-full h-12 px-4 border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#64242F]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g., 0771234567"
                className="w-full h-12 px-4 border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#64242F]"
              />
            </div>
          </div>
        </div>

        {/* Confirm Button */}
        <button
          onClick={placeOrder}
          className="mt-8 w-full py-3 bg-[#64242F] text-white rounded-lg text-lg font-semibold hover:bg-[#4e1a28] transition duration-300"
        >
          Confirm Order
        </button>
      </div>
    </div>
  );
}
