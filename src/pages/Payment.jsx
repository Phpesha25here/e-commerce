import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Payment() {
  const navigate = useNavigate();

  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const pendingOrder = JSON.parse(localStorage.getItem("pendingOrder")) || {};

  const handlePayment = () => {
    // Remove spaces from card number
    const cleanCard = cardNumber.replace(/\s+/g, "");

    // Basic validations
    if (!cleanCard || !expiry || !cvv) {
      alert("Please fill all card details");
      return;
    }

    if (!/^\d{16}$/.test(cleanCard)) {
      alert("Card number must be 16 digits");
      return;
    }

    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry)) {
      alert("Expiry must be in MM/YY format");
      return;
    }

    if (!/^\d{3}$/.test(cvv)) {
      alert("CVV must be 3 digits");
      return;
    }

    // All good → save order
    const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];

    const newOrder = {
      ...pendingOrder,
      id: Date.now(),
      paymentMethod: "Razorpay",
      date: new Date().toLocaleString()
    };

    localStorage.setItem("orders", JSON.stringify([...existingOrders, newOrder]));
    localStorage.setItem("latestOrder", JSON.stringify(newOrder));

    navigate("/success");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#f3d6d6]">
      <div className="bg-white p-8 rounded-xl shadow-lg w-[400px]">
        <h2 className="text-2xl font-bold text-center mb-6 text-[#8fa07b]">
          Razorpay Payment
        </h2>

        {/* CARD NUMBER */}
        <label className="block font-semibold mb-1">Card Number</label>
        <input
          type="text"
          placeholder="1234 5678 9012 3456"
          value={cardNumber}
          maxLength={19} // allows space formatting
          onChange={(e) =>
            setCardNumber(
              e.target.value.replace(/[^\d\s]/g, "") // only digits & spaces
            )
          }
          className="w-full border p-3 rounded-lg mb-4"
        />

        {/* EXPIRY */}
        <label className="block font-semibold mb-1">Expiry (MM/YY)</label>
        <input
          type="text"
          placeholder="MM/YY"
          value={expiry}
          maxLength={5}
          onChange={(e) =>
            setExpiry(e.target.value.replace(/[^\d/]/g, "")) // only digits & slash
          }
          className="w-full border p-3 rounded-lg mb-4"
        />

        {/* CVV */}
        <label className="block font-semibold mb-1">CVV</label>
        <input
          type="password"
          placeholder="123"
          value={cvv}
          maxLength={3}
          onChange={(e) => setCvv(e.target.value.replace(/[^\d]/g, ""))}
          className="w-full border p-3 rounded-lg mb-6"
        />

        {/* PAY BUTTON */}
        <button
          onClick={handlePayment}
          className="w-full py-3 rounded-lg text-white font-semibold"
          style={{ background: "#8fa07b" }}
        >
          Pay ₹{pendingOrder.total || 0}
        </button>
      </div>
    </div>
  );
}