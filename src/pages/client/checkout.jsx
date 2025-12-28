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
    <div className="min-h-screen bg-gradient-to-b from-[#120c12] via-[#1a1219] to-[#0b070b] px-4 py-16 text-[#f5edf1]">
      <div className="max-w-4xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-14">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-[#f3c6d3] via-[#ffffff] to-[#d7a0b3] bg-clip-text text-transparent">
            Checkout
          </h1>
          <p className="mt-3 text-sm text-white/50">
            One final step to your glow ✨
          </p>
        </div>

        {/* CONTENT */}
        <div className="grid md:grid-cols-5 gap-10">

          {/* LEFT – ITEMS */}
          <div className="md:col-span-3 space-y-5">
            {cart.map((item, idx) => (
              <div
                key={idx}
                className="relative group rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-5 flex gap-5 items-center hover:border-white/20 transition"
              >
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition bg-gradient-to-r from-[#7b324620] to-[#b76e8720]" />

                {item.image && (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="relative w-20 h-20 rounded-xl object-cover shadow-lg"
                  />
                )}

                <div className="relative flex-1">
                  <h2 className="font-semibold">{item.name}</h2>
                  <p className="text-xs text-white/50 mt-1">
                    Qty: {item.quantity}
                  </p>
                </div>

                <div className="relative text-right">
                  <p className="font-semibold">
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

          {/* RIGHT – SUMMARY */}
          <div className="md:col-span-2 space-y-6">
            <div className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 space-y-4">
              <h3 className="text-lg font-semibold">Order Summary</h3>

              <div className="flex justify-between text-sm text-white/60">
                <span>Original</span>
                <span className="line-through">
                  LKR {labeledTotal.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between text-sm text-[#f19aa8]">
                <span>Discount</span>
                <span>
                  − LKR {(labeledTotal - total).toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between text-xl font-bold border-t border-white/10 pt-4">
                <span>Total</span>
                <span className="text-[#8fe1b3]">
                  LKR {total.toFixed(2)}
                </span>
              </div>
            </div>

            {/* USER DETAILS */}
            <div className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 space-y-4">
              <LuxuryInput label="Full Name" value={name} setValue={setName} />
              <LuxuryInput label="Address" value={address} setValue={setAddress} />
              <LuxuryInput label="Phone Number" value={phone} setValue={setPhone} />
            </div>

            {/* CTA */}
            <button
              onClick={placeOrder}
              className="w-full py-5 rounded-full bg-gradient-to-r from-[#7b3246] to-[#b76e87] text-white text-lg font-semibold tracking-wide shadow-[0_20px_60px_rgba(183,110,135,0.35)] hover:scale-[1.04] transition"
            >
              Confirm Order →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================= INPUT ================= */

function LuxuryInput({ label, value, setValue }) {
  return (
    <div>
      <label className="block mb-1 text-xs tracking-wide text-white/60">
        {label}
      </label>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={label}
        className="w-full h-12 px-4 rounded-xl bg-black/30 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-[#b76e87] transition"
      />
    </div>
  );
}
