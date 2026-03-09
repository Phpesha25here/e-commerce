import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom"; // ✅ added

export default function Cart() {
  const {
    cartItems,
    increaseQty,
    decreaseQty,
    removeItem,
    totalAmount,
  } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="h-[60vh] flex items-center justify-center text-sage text-xl font-semibold">
        Your cart is empty 🛒
      </div>
    );
  }

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-sage mb-4">Your Cart</h1>

      {cartItems.map((item) => (
        <div
          key={item.id}
          className="flex items-center gap-4 bg-white rounded-xl p-3 mb-3 shadow-sm"
        >
          <img
            src={item.image}
            alt={item.name}
            className="w-20 h-20 object-cover rounded-lg"
          />

          <div className="flex-1">
            <h3 className="font-semibold text-sage">{item.name}</h3>
            <p className="text-pink-600 font-bold">₹{item.price}</p>

            <div className="flex items-center gap-3 mt-2">
              <button
                onClick={() => decreaseQty(item.id)}
                className="px-3 py-1 bg-sage text-white rounded"
              >
                −
              </button>

              <span className="font-semibold">{item.qty}</span>

              <button
                onClick={() => increaseQty(item.id)}
                className="px-3 py-1 bg-sage text-white rounded"
              >
                +
              </button>
            </div>
          </div>

          <button
            onClick={() => removeItem(item.id)}
            className="text-red-500 font-semibold"
          >
            Remove
          </button>
        </div>
      ))}

      {/* TOTAL */}
      <div className="mt-6 bg-sage text-white rounded-xl p-4 flex justify-between items-center">
        <span className="text-lg font-semibold">Total</span>
        <span className="text-xl font-bold">₹{totalAmount}</span>
      </div>

      {/* ✅ CHECKOUT BUTTON ADDED */}
      <Link
        to="/checkout"
        className="mt-6 block w-full text-center bg-sage text-pinky font-bold py-3 rounded-xl shadow-md hover:scale-105 transition"
      >
        Proceed to Checkout →
      </Link>
    </div>
  );
}