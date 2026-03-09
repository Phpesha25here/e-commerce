import { Link } from "react-router-dom";

const pavbhaji = "/images/pavbhaji.jpg";
const tawapulao = "/images/tawapulao.jpg";
const paneer = "/images/paneer.jpg";
const sundae = "/images/sundae.jpg";
const brownie = "/images/brownie.jpg";

const menuItems = [
  {
    name: "Mumbai Cheese Pav Bhaji",
    desc: "Mumbai's iconic street food in a creamy twist",
    image: pavbhaji,
  },
  {
    name: "Tawa Pulao",

    desc: "Spicy tawa pulao flavor",
    image: tawapulao,
  },
  {
    name: "Tandoori Paneer Pizza",
    desc: "Tandoori paneer with classic pizza crust",
    image: paneer,
  },
  {
    name: "Ice Cream Sundae",
    desc: "Classic sundae with chocolate, nuts & cherry",
    image: sundae,
  },
  {
    name: "Ice Cream Sizzling Brownie",
    desc: "Warm brownie topped with cold ice cream",
    image: brownie,
  },
];

export default function MenuSlider() {
  return (
    <div className="px-6 my-12">
      <div className="flex items-center justify-center gap-6">
        {menuItems.map((item, index) => (
          <div
            key={index}
            className="w-[220px] bg-white rounded-2xl shadow-md"
          >
            <img
              src={item.image}
              alt={item.name}
              className="h-40 w-full object-cover rounded-t-2xl"
            />

            <div className="p-3 text-center">
              <h3 className="font-semibold text-sage">
                {item.name}
              </h3>

              <p className="text-sm text-gray-600 mt-1">
                {item.desc}
              </p>

              <p className="text-lg font-bold text-pinky mt-2">
                {item.price}
              </p>
            </div>
          </div>
        ))}

        <Link
          to="/menu"
          className="h-20 w-20 flex items-center justify-center bg-sage text-white rounded-full shadow-md text-3xl hover:bg-pinky hover:text-sage transition"
        >
          →
        </Link>
      </div>
    </div>
  );
}