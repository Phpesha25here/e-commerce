export default function MenuCategoryRow() {
  const categories = [
    "Pav Bhaji",
    "Ice-Cream Club",
    "Snacks / Breakfast",
    "Faluda / Drinks",
  ];

  return (
    <div className="bg-sage py-4 px-3">
      <div className="flex justify-center gap-4 overflow-x-auto scrollbar-hide">
        {categories.map((cat) => (
          <button
            key={cat}
            className="whitespace-nowrap px-6 py-2 rounded-full 
            bg-pinky text-sage font-semibold text-sm
            hover:bg-white hover:text-sage transition"
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}