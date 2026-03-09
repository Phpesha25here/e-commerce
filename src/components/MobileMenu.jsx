import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext"; // ✅ ADDED

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const { cartItems } = useCart(); // ✅ ADDED

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setOpen(false);
    navigate("/login");
  };

  const goHome = () => {
    setOpen(false);

    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const scrollToSection = (id) => {
    setOpen(false);

    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({
          behavior: "smooth",
        });
      }, 100);
    } else {
      document.getElementById(id)?.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      {/* Top Bar */}
      <div className="relative flex items-center p-4 bg-sage">
        <button
          onClick={() => setOpen(true)}
          className="text-pinky text-2xl"
        >
          ☰
        </button>

        <h2 className="absolute left-1/2 -translate-x-1/2 text-5xl font-bold text-pinky font-serif">
          Creamantra
        </h2>

        {/* Right: Login / Register / Cart */}
        <div className="absolute right-4 top-4 flex gap-3 items-center">
          {/* 🛒 CART ICON */}
          <Link to="/cart" className="relative text-pinky text-2xl">
            🛒
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 rounded-full">
                {cartItems.length}
              </span>
            )}
          </Link>

          <Link
            to="/login"
            className="px-4 py-1 rounded font-semibold text-pinky border-2 border-pinky
                       hover:bg-pinky hover:text-sage transition"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="px-4 py-1 rounded font-semibold text-pinky border-2 border-pinky
                       hover:bg-pinky hover:text-sage transition"
          >
            Register
          </Link>
        </div>
      </div>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Side Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-sage z-50 flex flex-col
        transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-white/30">
          <h2 className="text-2xl font-bold text-white">Creamantra</h2>
          <button
            onClick={() => setOpen(false)}
            className="text-white text-2xl"
          >
            ✕
          </button>
        </div>

        {/* Menu Links */}
        <nav className="flex flex-col mt-4 flex-grow">
          <button
            onClick={goHome}
            className="px-6 py-4 text-lg font-semibold text-white text-left
                       hover:bg-pinky hover:text-sage transition"
          >
            Home
          </button>

          <button
            onClick={() => scrollToSection("menu")}
            className="px-6 py-4 text-lg font-semibold text-white text-left
                       hover:bg-pinky hover:text-sage transition"
          >
            Menu
          </button>

          <button
            onClick={() => scrollToSection("visitus")}
            className="px-6 py-4 text-lg font-semibold text-white text-left
                       hover:bg-pinky hover:text-sage transition"
          >
            About
          </button>
        </nav>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="m-4 flex items-center justify-center gap-2
                     px-4 py-3 rounded-xl border-2 border-pinky
                     text-pinky font-semibold
                     hover:bg-pinky hover:text-sage transition"
        >
          ⎋ Logout
        </button>
      </div>
    </>
  );
}