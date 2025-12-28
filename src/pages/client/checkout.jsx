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

    let t = 0;
    let lt = 0;

    cartItems.forEach((i) => {
      t += i.price * i.quantity;
      lt += i.labeledPrice * i.quantity;
    });

    setTotal(t);
    setLabeledTotal(lt);
  }, [cartItems, navigate]);

  if (!cart.length) return null;

  const placeOrder = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to place an order");
      navigate("/login");
      return;
    }

    axios
      .post(
        `${import.meta.env.VITE_BACKEND_URL}/api/order`,
        {
          name,
          address,
          phoneNumber: phone,
          billItems: cart.map((i) => ({
            productId: i.productId,
            quantity: i.quantity,
            price: i.price,
            labeledPrice: i.labeledPrice,
            image: i.image,
            productName: i.name,
          })),
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => {
        alert("Order placed successfully!");
        navigate("/");
      })
      .catch(() => alert("Failed to place order"));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F0C29] via-[#302B63] to-[#24243E] px-4 py-10 flex justify-center">
      <div className="w-full max-w-3xl bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl p-6 sm:p-8 text-white">

        <h1 className="text-3xl font-bold text-center mb-8 tracking-wide">
          Checkout
        </h1>

        {/* ITEMS */}
        <div className="space-y-4">
          {cart.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between gap-4 bg-white/5 rounded-xl p-4 border border-white/10"
            >
              <div className="flex items-center gap-4">
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                )}
                <div>
                  <h2 className="font-semibold">{item.name}</h2>
                  <p className="text-sm text-white/60">
                    Qty: {item.quantity}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <p className="font-semibold text-pink-300">
                  LKR {(item.price * item.quantity).toFixed(2)}
                </p>
                {item.labeledPrice > item.price && (
                  <p className="text-xs line-through text-white/40">
                    LKR {(item.labeledPrice * item.quantity).toFixed(2)}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* SUMMARY */}
        <div className="mt-8 space-y-3 border-t border-white/20 pt-6">
          <div className="flex justify-between text-white/70">
            <span>Original Price</span>
            <span>LKR {labeledTotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between text-red-400">
            <span>Discount</span>
            <span>- LKR {(labeledTotal - total).toFixed(2)}</span>
          </div>

          <div className="flex justify-between text-xl font-bold text-green-400 border-t border-white/10 pt-3">
            <span>Total</span>
            <span>LKR {total.toFixed(2)}</span>
          </div>
        </div>

        {/* USER DETAILS */}
        <div className="mt-8 space-y-4">
          <Input label="Full Name" value={name} setValue={setName} />
          <Input label="Address" value={address} setValue={setAddress} />
          <Input label="Phone Number" value={phone} setValue={setPhone} />
        </div>

        {/* CONFIRM */}
        <button
          onClick={placeOrder}
          className="mt-8 w-full py-4 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-lg font-semibold hover:scale-[1.02] transition-transform shadow-lg"
        >
          Confirm Order
        </button>
      </div>
    </div>
  );
}

function Input({ label, value, setValue }) {
  return (
    <div>
      <label className="block mb-1 text-sm text-white/70">{label}</label>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full h-12 px-4 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-pink-400"
        placeholder={label}
      />
    </div>
  );
}
