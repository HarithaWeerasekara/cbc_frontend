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
    setCart(await getCart());
    setTotal(await getTotal());
    setLabeledTotal(await getTotalForLabeledPrice());
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleQty = async (item, qty) => {
    await addToCart(item, qty);
    fetchCart();
  };

  const handleRemove = async (id) => {
    await removeFromCart(id);
    fetchCart();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F0C29] via-[#302B63] to-[#24243E] px-4 py-8 flex justify-center">
      <div className="w-full max-w-4xl bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl p-5 sm:p-8 text-white">

        <h1 className="text-3xl font-bold mb-6 text-center tracking-wide">
          Your Cart
        </h1>

        {cart.length === 0 ? (
          <p className="text-center text-white/70 py-16">
            Your cart is empty 🛒
          </p>
        ) : (
          <>
            {/* ITEMS */}
            <div className="space-y-5">
              {cart.map((item, i) => (
                <div
                  key={i}
                  className="flex flex-col sm:flex-row gap-4 items-center bg-white/5 rounded-xl p-4 border border-white/10"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 rounded-xl object-cover shadow-md"
                  />

                  <div className="flex-1 text-center sm:text-left">
                    <h2 className="text-lg font-semibold">{item.name}</h2>
                    <p className="text-sm text-white/60">
                      {item.altNames?.join(" • ")}
                    </p>
                    <p className="mt-1 font-bold text-pink-300">
                      LKR {item.price.toFixed(2)}
                    </p>
                  </div>

                  {/* QTY */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleQty(item, -1)}
                      className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20"
                    >
                      −
                    </button>
                    <span className="min-w-[24px] text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => handleQty(item, 1)}
                      className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20"
                    >
                      +
                    </button>
                  </div>

                  {/* SUBTOTAL */}
                  <div className="text-center sm:text-right">
                    <p className="text-sm text-white/60">Subtotal</p>
                    <p className="font-semibold">
                      LKR {(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>

                  {/* REMOVE */}
                  <button
                    onClick={() => handleRemove(item.productId)}
                    className="text-red-400 hover:text-red-500 text-xl"
                  >
                    <VscTrash />
                  </button>
                </div>
              ))}
            </div>

            {/* SUMMARY */}
            <div className="mt-8 space-y-3 border-t border-white/20 pt-6">
              <div className="flex justify-between text-white/80">
                <span>Original Total</span>
                <span>LKR {labeledTotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-red-400">
                <span>Discount</span>
                <span>- LKR {(labeledTotal - total).toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-xl font-bold text-green-400 border-t border-white/10 pt-3">
                <span>Payable</span>
                <span>LKR {total.toFixed(2)}</span>
              </div>
            </div>

            {/* CHECKOUT */}
            <button
              onClick={() =>
                navigate("/checkout", { state: { items: cart } })
              }
              className="mt-6 w-full py-4 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-lg font-semibold tracking-wide hover:scale-[1.02] transition-transform shadow-lg"
            >
              Proceed to Checkout
            </button>
          </>
        )}
      </div>
    </div>
  );
}
