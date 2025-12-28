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
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] py-10 px-4 flex justify-center text-white">
      <div className="w-full max-w-4xl bg-white/95 text-[#2d1b2a] rounded-2xl shadow-2xl p-6 sm:p-8 backdrop-blur">

        {/* Title */}
        <h1 className="text-3xl font-extrabold mb-6 text-center bg-gradient-to-r from-[#64242F] to-[#9D6777] bg-clip-text text-transparent">
          Your Shopping Cart
        </h1>

        {cart.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-lg text-gray-500">🛒 Your cart is empty</p>
            <button
              onClick={() => navigate("/products")}
              className="mt-6 px-10 py-3 rounded-full bg-gradient-to-r from-[#64242F] to-[#9D6777] text-white font-semibold hover:scale-105 transition"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <>
            {/* CART ITEMS */}
            <div className="space-y-6">
              {cart.map((item, index) => (
                <div
                  key={index}
                  className="group flex flex-col sm:flex-row items-center justify-between gap-6 bg-gradient-to-r from-white to-[#f7eef2] border border-[#eadce3] rounded-2xl p-5 shadow-sm hover:shadow-xl transition"
                >
                  {/* Product */}
                  <div className="flex items-center gap-5 w-full sm:w-auto">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-xl shadow-md group-hover:scale-105 transition"
                    />
                    <div>
                      <h2 className="text-lg font-semibold">{item.name}</h2>
                      <p className="text-sm text-gray-500">
                        {item.altNames?.join(", ")}
                      </p>
                      <p className="text-sm font-medium mt-1">
                        LKR {item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row items-center gap-6">
                    {/* Quantity */}
                    <div className="flex items-center rounded-full border border-gray-300 overflow-hidden">
                      <button
                        className="px-4 py-1 bg-gray-100 hover:bg-gray-200 transition"
                        onClick={() => handleQuantityChange(item, -1)}
                      >
                        −
                      </button>
                      <span className="px-5 font-semibold">
                        {item.quantity}
                      </span>
                      <button
                        className="px-4 py-1 bg-gray-100 hover:bg-gray-200 transition"
                        onClick={() => handleQuantityChange(item, 1)}
                      >
                        +
                      </button>
                    </div>

                    {/* Subtotal */}
                    <div className="text-center sm:text-right">
                      <p className="text-xs text-gray-500">Subtotal</p>
                      <p className="font-semibold">
                        LKR {(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() => handleRemove(item.productId)}
                      className="text-red-500 hover:text-red-700 text-xl transition"
                      title="Remove"
                    >
                      <VscTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* SUMMARY */}
            <div className="mt-10 space-y-4">
              <div className="flex justify-between text-lg">
                <span>Original Price</span>
                <span className="line-through text-gray-400">
                  LKR {labeledTotal.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between text-lg">
                <span>Discount</span>
                <span className="text-red-600">
                  − LKR {(labeledTotal - total).toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between text-2xl font-bold border-t pt-4">
                <span>Total</span>
                <span className="text-green-600">
                  LKR {total.toFixed(2)}
                </span>
              </div>
            </div>

            {/* CHECKOUT */}
            <button
              className="w-full mt-8 py-4 rounded-full bg-gradient-to-r from-[#64242F] to-[#9D6777] text-white text-lg font-semibold shadow-lg hover:scale-[1.03] hover:shadow-2xl transition"
              onClick={() =>
                navigate("/checkout", {
                  state: { items: cart },
                })
              }
            >
              Proceed to Checkout →
            </button>
          </>
        )}
      </div>
    </div>
  );
}
