import { useEffect, useState } from "react";

export default function Customers() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    // 🔹 Later this will be API call
    // fetch("/api/users").then(...)

    const storedUsers =
      JSON.parse(localStorage.getItem("users")) || [];

    setCustomers(storedUsers);
  }, []);

  return (
    <div>
      <h2 className="text-2xl mb-4 text-[#F6C1CF]">
        Customers
      </h2>

      {customers.length === 0 ? (
        <p>No customers registered yet.</p>
      ) : (
        customers.map((c) => (
          <div
            key={c.id}
            className="bg-[#F6C1CF] text-[#2F2F2F] p-4 mb-3 rounded-xl"
          >
            {c.name} — {c.email}
          </div>
        ))
      )}
    </div>
  );
}
