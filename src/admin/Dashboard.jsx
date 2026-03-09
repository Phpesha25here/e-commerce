import { useEffect, useState } from "react";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalCustomers: 0,
    totalProducts: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    const orders =
      JSON.parse(localStorage.getItem("orders")) || [];

    // TOTAL ORDERS
    const totalOrders = orders.length;

    // TOTAL CUSTOMERS (unique emails)
    const uniqueCustomers = [
      ...new Set(orders.map((o) => o.customerEmail)),
    ];
    const totalCustomers = uniqueCustomers.length;

    // TOTAL REVENUE
    const totalRevenue = orders.reduce(
      (sum, order) => sum + order.total,
      0
    );

    // TOTAL PRODUCTS SOLD (unique products)
    const productSet = new Set();
    orders.forEach((order) => {
      order.items.forEach((item) => {
        productSet.add(item.name);
      });
    });
    const totalProducts = productSet.size;

    setStats({
      totalOrders,
      totalCustomers,
      totalProducts,
      totalRevenue,
    });
  }, []);

  const cards = [
    { title: "Total Orders", value: stats.totalOrders },
    { title: "Customers", value: stats.totalCustomers },
    { title: "Products Sold", value: stats.totalProducts },
    { title: "Revenue", value: `₹${stats.totalRevenue}` },
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 text-[#F6C1CF]">
        Dashboard
      </h2>

      <div className="grid md:grid-cols-4 gap-6">
        {cards.map((card, i) => (
          <div
            key={i}
            className="bg-[#F6C1CF] text-[#2F2F2F] p-6 rounded-2xl shadow-lg"
          >
            <h3 className="text-lg">{card.title}</h3>
            <p className="text-2xl font-bold mt-2">
              {card.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
