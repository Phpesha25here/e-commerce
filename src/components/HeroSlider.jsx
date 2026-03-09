import { useState, useEffect } from "react";


import slide2 from "../assets/slide3.jpg";
import slide3 from "../assets/slide2.jpg";

const slides = [
  { image: slide3 },
  { image: slide2 },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  /* Auto Slide */
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[80vh] overflow-hidden flex items-center justify-center bg-[#8fad80]">

      {/* Slides */}
      {slides.map((slide, index) => (
        <img
          key={index}
          src={slide.image}
          alt="Creamantra Slide"
          className={`absolute w-full h-full object-contain transition-opacity duration-1000 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* Dots */}
      <div className="absolute bottom-6 flex gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-3 h-3 rounded-full transition ${
              current === i ? "bg-[#F6C1CF]" : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}