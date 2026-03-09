import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { generateInvoice } from "../utils/invoiceGenerator";

export default function Success() {

  const navigate = useNavigate();

  const order = JSON.parse(localStorage.getItem("latestOrder"));

  useEffect(() => {
    if (!order) {
      navigate("/menu");
    }
  }, [order, navigate]);

  if (!order) return null;

  return (
    <div
      className="flex flex-col items-center justify-center h-screen text-center"
      style={{ background: "#f9f7f4" }}
    >

      <h1
        className="text-3xl font-bold mb-6"
        style={{ color: "#8fa07b" }}
      >
        Order Placed Successfully 🎉
      </h1>

      <p className="mb-8 text-gray-600">
        Thank you for ordering from Creamantra Ice Cream & Eatery.
      </p>

      <button
        onClick={() => generateInvoice(order)}
        className="px-6 py-3 text-white rounded-lg mb-4"
        style={{ background: "#8fa07b" }}
      >
        Download Invoice
      </button>

      <button
        onClick={() => navigate("/menu")}
        className="px-6 py-3 rounded-lg"
        style={{
          background: "#f6c1cf",
          color: "#333"
        }}
      >
        Continue Shopping
      </button>

    </div>
  );
}