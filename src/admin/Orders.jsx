import { useEffect, useState } from "react";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadOrders();

    // 🔥 Real-time update when localStorage changes
    window.addEventListener("storage", loadOrders);

    return () => {
      window.removeEventListener("storage", loadOrders);
    };
  }, []);

  const loadOrders = () => {
    const storedOrders =
      JSON.parse(localStorage.getItem("orders")) || [];

    // Show latest orders first
    const sortedOrders = storedOrders.sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );

    setOrders(sortedOrders);
  };

  return (
    <div>
      <h2 className="text-2xl mb-6 text-[#F6C1CF]">
        Orders
      </h2>

      {orders.length === 0 ? (
        <p className="text-white">No orders yet.</p>
      ) : (
        orders.map((order) => (
          <div
            key={order.id}
            className="bg-[#F6C1CF] text-[#2F2F2F] p-4 mb-4 rounded-xl shadow-md"
          >
            <p>
              <strong>Customer:</strong> {order.customerName}
            </p>

            <p>
              <strong>Email:</strong> {order.customerEmail}
            </p>

            <p>
              <strong>Date:</strong>{" "}
              {new Date(order.date).toLocaleString()}
            </p>

            <p className="font-bold mt-2">
              Total: ₹{order.total}
            </p>

            <div className="mt-3">
              <strong>Items:</strong>
              <ul className="list-disc ml-5 mt-1">
                {order.items.map((item, i) => (
                  <li key={i}>
                    {item.name} × {item.qty}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))
      )}
    </div>
  );
}