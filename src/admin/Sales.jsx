import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Sales() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const orders =
      JSON.parse(localStorage.getItem("orders")) || [];

    const monthlySales = {};

    orders.forEach((order) => {
      const date = new Date(order.date);
      const month = date.toLocaleString("default", {
        month: "short",
      });

      if (!monthlySales[month]) {
        monthlySales[month] = 0;
      }

      monthlySales[month] += order.total;
    });

    const formattedData = Object.keys(monthlySales).map(
      (month) => ({
        month,
        sales: monthlySales[month],
      })
    );

    setData(formattedData);
  }, []);

  return (
    <div>
      <h2 className="text-2xl mb-6 text-[#F6C1CF]">
        Monthly Sales
      </h2>

      <div className="h-[300px] bg-[#6D7D60] p-4 rounded-xl">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="month" stroke="white" />
            <YAxis stroke="white" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#F6C1CF"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}