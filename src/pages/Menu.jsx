import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";

export default function Menu() {
  const { addToCart } = useCart();

  const categories = [
    "Pav Bhaji",
    "Ice-Cream Club",
    "Snacks / Breakfast",
    "Drinks/ Faluda",
  ];

  const [products, setProducts] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("Pav Bhaji");
  const [addedItem, setAddedItem] = useState(null);

  // ✅ Simulated admin data
  useEffect(() => {
    setProducts({
      "Pav Bhaji": [
        { id: 1, name: "Butter Pav Bhaji", price: 120, image: "/images/pav1.jpg" },
        { id: 2, name: "Cheese Pav Bhaji", price: 150, image: "/src/assets/pavbhaji.jpg" },
        { id: 3, name: "Jain Pav Bhaji", price: 130, image: "/images/pav3.jpg" },
        { id: 4, name: "Khada Pav Bhaji", price: 140, image: "/images/pav4.jpg" },
       
      ],

      "Ice-Cream Club": [
        { id: 6, name: "Chocolate Scoop", price: 80, image: "/images/ice1.jpg" },
        { id: 7, name: "Vanilla Scoop", price: 70, image: "/images/ice2.jpg" },
        { id: 8, name: "Strawberry Scoop", price: 75, image: "/images/ice3.jpg" },
        { id: 9, name: "Butterscotch", price: 90, image: "/images/ice4.jpg" },
       
      ],

      "Snacks / Breakfast": [
        { id: 11, name: "Veg Sandwich", price: 60, image: "/images/snack1.jpg" },
        { id: 12, name: "Cheese Toast", price: 70, image: "/images/snack2.jpg" },
        { id: 13, name: "Poha", price: 50, image: "/images/snack3.jpg" },
        { id: 14, name: "Upma", price: 55, image: "/images/snack4.jpg" },
        
      ],

      "Drinks/ Faluda": [
        { id: 16, name: "Cold Coffee", price: 90, image: "/images/drink1.jpg" },
        { id: 17, name: "Mojito", price: 85, image: "/images/drink2.jpg" },
        { id: 18, name: "Fresh Lime", price: 60, image: "/images/drink3.jpg" },
        { id: 19, name: "Milkshake", price: 100, image: "/images/drink4.jpg" },

      ],
    });
  }, []);

  return (
    <div className="bg-pinky min-h-screen">
      {/* CATEGORY ROW */}
      <div className="bg-sage py-4 sticky top-0 z-10">
        <div className="flex gap-3 overflow-x-auto px-4 justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition ${
                selectedCategory === cat
                  ? "bg-white text-sage"
                  : "bg-pinky text-sage"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* PRODUCTS */}
      <div className="p-4 grid grid-cols-2 md:grid-cols-3 gap-4">
        {(products[selectedCategory] || []).map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl shadow-sm p-3 flex flex-col"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-32 object-cover rounded-xl"
            />

            <div className="mt-3 text-center flex-1 flex flex-col">
              <h3 className="font-semibold text-sage text-sm">
                {item.name}
              </h3>

              <p className="text-pink-600 font-bold mt-1 mb-3">
                ₹{item.price}
              </p>

              <button
                onClick={() => {
                  addToCart(item);
                  setAddedItem(item.id);
                  setTimeout(() => setAddedItem(null), 800);
                }}
                className={`mt-auto w-full py-2 rounded-full text-sm font-semibold transition ${
                  addedItem === item.id
                    ? "bg-pink-600 text-white"
                    : "bg-sage text-pinky hover:bg-pinky hover:text-sage"
                }`}
              >
                {addedItem === item.id ? "Added ✓" : "Add to Cart"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}