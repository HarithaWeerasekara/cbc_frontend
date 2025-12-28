import { useEffect, useState } from "react";
import {
  addToCart,
  getCart,
  getTotal,
  getTotalForLabeledPrice,
  removeFromCart,
} from "../../utils/cart";
import { VscTrash } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [labeledTotal, setLabeledTotal] = useState(0);

  const navigate = useNavigate();

  const fetchCart = async () => {
    const result = await getCart();
    const totalAmount = await getTotal();
    const labeledAmount = await getTotalForLabeledPrice();

    setCart(Array.isArray(result) ? result : []);
    setTotal(Number(totalAmount));
    setLabeledTotal(Number(labeledAmount));
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleRemove = async (productId) => {
    await removeFromCart(productId);
    fetchCart();
  };

  const handleQuantityChange = async (item, qtyChange) => {
    await addToCart(item, qtyChange);
    fetchCart();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#120c12] via-[#1a1219] to-[#0b070b] px-4 py-14 text-[#f4edf1]">
      <div className="max-w-5xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-14">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-[#f3c6d3] via-[#ffffff] to-[#d7a0b3] bg-clip-text text-transparent">
            Your Cart
          </h1>
          <p className="mt-3 text-sm text-white/50">
            Curated beauty, thoughtfully selected
          </p>
        </div>

        {/* EMPTY */}
        {cart.length === 0 ? (
          <div className="text-center py-28 bg-white/5 rounded-3xl backdrop-blur border border-white/10">
            <p className="text-lg text-white/60">Your cart is currently empty</p>
            <button
              onClick={() => navigate("/products")}
              className="mt-8 px-12 py-4 rounded-full bg-gradient-to-r from-[#7b3246] to-[#b76e87] text-white font-semibold tracking-wide hover:scale-105 transition"
            >
              Explore Products
            </button>
          </div>
        ) : (
          <>
            {/* ITEMS */}
            <div className="space-y-6">
              {cart.map((item, index) => (
                <div
                  key={index}
                  className="group relative flex flex-col sm:flex-row items-center gap-6 rounded-3xl p-6 bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 transition"
                >
                  {/* glow */}
                  <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition bg-gradient-to-r from-[#7b324620] to-[#b76e8720]" />

                  {/* IMAGE */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="relative w-28 h-28 rounded-2xl object-cover shadow-xl"
                  />

                  {/* INFO */}
                  <div className="relative flex-1 text-center sm:text-left">
                    <h2 className="text-lg font-semibold">
                      {item.name}
                    </h2>
                    <p className="text-xs text-white/50 mt-1">
                      {item.altNames?.join(", ")}
                    </p>
                    <p className="mt-2 text-sm font-medium text-white/80">
                      LKR {item.price.toFixed(2)}
                    </p>
                  </div>

                  {/* CONTROLS */}
                  <div className="relative flex flex-col sm:flex-row items-center gap-5">
                    {/* qty */}
                    <div className="flex items-center rounded-full bg-black/30 border border-white/10 overflow-hidden">
                      <button
                        onClick={() => handleQuantityChange(item, -1)}
                        className="px-4 py-1 hover:bg-white/10 transition"
                      >
                        −
                      </button>
                      <span className="px-5 font-semibold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(item, 1)}
                        className="px-4 py-1 hover:bg-white/10 transition"
                      >
                        +
                      </button>
                    </div>

                    {/* subtotal */}
                    <div className="text-sm text-center sm:text-right">
                      <p className="text-white/40">Subtotal</p>
                      <p className="font-semibold">
                        LKR {(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>

                    {/* remove */}
                    <button
                      onClick={() => handleRemove(item.productId)}
                      className="text-white/40 hover:text-red-500 transition text-xl"
                    >
                      <VscTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* SUMMARY */}
            <div className="mt-14 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 space-y-4">
              <div className="flex justify-between text-sm text-white/60">
                <span>Original</span>
                <span className="line-through">
                  LKR {labeledTotal.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-white/60">Discount</span>
                <span className="text-[#f19aa8]">
                  − LKR {(labeledTotal - total).toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between text-2xl font-bold pt-4 border-t border-white/10">
                <span>Total</span>
                <span className="text-[#8fe1b3]">
                  LKR {total.toFixed(2)}
                </span>
              </div>
            </div>

            {/* CTA */}
            <button
              onClick={() =>
                navigate("/checkout", { state: { items: cart } })
              }
              className="w-full mt-10 py-5 rounded-full bg-gradient-to-r from-[#7b3246] to-[#b76e87] text-white text-lg font-semibold tracking-wide shadow-[0_20px_60px_rgba(183,110,135,0.35)] hover:scale-[1.04] transition"
            >
              Proceed to Checkout →
            </button>
          </>
        )}
      </div>
    </div>
  );
}
