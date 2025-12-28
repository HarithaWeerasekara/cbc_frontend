import { useEffect, useState } from "react";
import { addToCart, getCart, getTotal, getTotalForLabeledPrice, removeFromCart } from "../../utils/cart";
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
    <div className="min-h-screen bg-[#F9F9F9] py-6 px-4 flex justify-center">
      <div className="w-full max-w-3xl bg-[#FFFFFF] rounded-xl shadow-lg p-4 sm:p-6">
        <h1 className="text-2xl font-bold text-[#222222] mb-4 sm:mb-6">Shopping Cart</h1>

        {cart.length === 0 ? (
          <div className="text-center text-[#666666] py-10">Your cart is empty.</div>
        ) : (
          <>
            <div className="space-y-4">
              {cart.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row items-center justify-between bg-[#F5F5F5] border border-[#E4E4E4] rounded-xl p-4 sm:p-5 shadow-sm gap-4"
                >
                  <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="text-center sm:text-left">
                      <h2 className="text-lg font-semibold text-[#222222]">{item.name}</h2>
                      <p className="text-sm text-[#666666]">{item.altNames.join(", ")}</p>
                      <p className="text-sm font-medium text-[#333333] mt-1">
                        LKR {item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between sm:gap-6 w-full sm:w-auto">
                    <div className="flex items-center border border-[#E4E4E4] rounded-md mt-3 sm:mt-0">
                      <button
                        className="px-3 py-1 bg-[#EDEDED] hover:bg-[#D6D6D6] rounded-l-md text-[#333333]"
                        onClick={() => handleQuantityChange(item, -1)}
                      >
                        −
                      </button>
                      <span className="px-4 font-medium">{item.quantity}</span>
                      <button
                        className="px-3 py-1 bg-[#EDEDED] hover:bg-[#D6D6D6] rounded-r-md text-[#333333]"
                        onClick={() => handleQuantityChange(item, 1)}
                      >
                        +
                      </button>
                    </div>

                    <div className="text-sm text-[#666666] mt-2 sm:mt-0">
                      <p>Subtotal:</p>
                      <p className="text-base font-semibold text-[#222222]">
                        LKR {(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>

                    <button
                      className="text-[#C81E1E] hover:text-red-700 text-xl mt-2 sm:mt-0"
                      onClick={() => handleRemove(item.productId)}
                      title="Remove"
                    >
                      <VscTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-[#E4E4E4] mt-6 pt-4 flex flex-col sm:flex-row justify-between items-center text-center sm:text-left">
              <h2 className="text-xl font-bold text-[#222222] mb-2 sm:mb-0">Total Price</h2>
              <p className="text-xl font-bold text-[#222222]">LKR {labeledTotal.toFixed(2)}</p>
            </div>
            <div className="border-t border-[#E4E4E4] mt-6 pt-4 flex flex-col sm:flex-row justify-between items-center text-center sm:text-left">
              <h2 className="text-xl font-bold text-[#222222] mb-2 sm:mb-0">Discount</h2>
              <p className="text-xl font-bold border-b-[2px] text-[#C81E1E]">
                - LKR {(labeledTotal - total).toFixed(2)}
              </p>
            </div>
            <div className="border-t border-[#E4E4E4] mt-6 pt-4 flex flex-col sm:flex-row justify-between items-center text-center sm:text-left">
              <h2 className="text-xl font-bold text-[#222222] mb-2 sm:mb-0">Discounted Total Price</h2>
              <p className="text-xl font-bold border-double border-b-[4px] text-[#1E8C3A]">
                LKR {total.toFixed(2)}
              </p>
            </div>

            <button
              className="w-full mt-4 py-3 rounded-lg bg-[#5E2B45] text-white text-lg font-semibold hover:bg-[#7D3F65] transition duration-300"
              onClick={() =>
                navigate("/checkout", {
                  state: {
                    items: cart,
                  },
                })
              }
            >
              Proceed to Checkout
            </button>
          </>
        )}
      </div>
    </div>
  );
}
