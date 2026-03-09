import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Checkout() {

  const { cartItems, totalAmount } = useCart();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [mobile, setMobile] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  const handleProceed = () => {

    if (!name || !address || !mobile || !paymentMethod) {
      alert("Please fill all details");
      return;
    }

    const orderData = {
      name,
      address,
      mobile,
      paymentMethod,
      items: cartItems,
      total: totalAmount,
    };

    // store temporarily for payment page
    localStorage.setItem(
      "pendingOrder",
      JSON.stringify(orderData)
    );

    navigate("/payment");
  };

  if (cartItems.length === 0) {
    return (
      <div className="text-center mt-10 text-lg">
        Your cart is empty.
      </div>
    );
  }

  return (

    <div className="max-w-3xl mx-auto p-6">

      <h2 className="text-2xl font-bold mb-6 text-sage">
        Checkout
      </h2>

      <div className="bg-white p-6 rounded-xl shadow">

        {/* NAME */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">
            Full Name
          </label>

          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            className="w-full border p-3 rounded-lg"
          />
        </div>

        {/* ADDRESS */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">
            Address
          </label>

          <textarea
            placeholder="Enter delivery address"
            value={address}
            onChange={(e)=>setAddress(e.target.value)}
            className="w-full border p-3 rounded-lg"
          />
        </div>

        {/* MOBILE */}
        <div className="mb-6">
          <label className="block font-semibold mb-1">
            Mobile Number
          </label>

          <input
            type="tel"
            placeholder="Enter mobile number"
            value={mobile}
            onChange={(e)=>setMobile(e.target.value)}
            className="w-full border p-3 rounded-lg"
          />
        </div>

        {/* PAYMENT MODE */}
        <h3 className="text-lg font-bold mb-3">
          Mode of Payment
        </h3>

        <div className="mb-6 space-y-2">

          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="Cash On Delivery"
              onChange={(e)=>setPaymentMethod(e.target.value)}
            />
            Cash on Delivery
          </label>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="Razorpay"
              onChange={(e)=>setPaymentMethod(e.target.value)}
            />
            Razorpay
          </label>

        </div>

        {/* TOTAL */}
        <div className="flex justify-between font-semibold text-lg mb-6">
          <span>Total Amount</span>
          <span>₹{totalAmount}</span>
        </div>

        {/* BUTTON */}
        <button
          onClick={handleProceed}
          className="w-full py-3 rounded-lg text-white font-semibold"
          style={{
            background:"#8fa07b"
          }}
        >
          Proceed to Payment
        </button>

      </div>

    </div>
  );
}