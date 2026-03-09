import { useState } from "react";

export default function AddProduct() {
  const [image, setImage] = useState(null);

  const handleImage = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <div>
      <h2 className="text-2xl mb-6 text-[#F6C1CF]">Add Product</h2>

      <form className="bg-[#6D7D60] p-6 rounded-2xl space-y-4">

        <input
          type="text"
          placeholder="Product Name"
          className="w-full p-2 rounded text-black"
        />

        <input
          type="number"
          placeholder="Price"
          className="w-full p-2 rounded text-black"
        />

        <input type="file" onChange={handleImage} />

        {image && (
          <img src={image} alt="preview" className="h-40 rounded-xl" />
        )}

        <button className="bg-[#F6C1CF] text-[#2F2F2F] px-6 py-2 rounded-xl">
          Add Product
        </button>
      </form>
    </div>
  );
}