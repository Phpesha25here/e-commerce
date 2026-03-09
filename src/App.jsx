import { Routes, Route, useLocation } from "react-router-dom";

/* COMPONENTS */
import MobileMenu from "./components/MobileMenu";
import HeroSlider from "./components/HeroSlider";
import BestSellers from "./components/BestSellers";
import MenuSlider from "./components/MenuSlider";
import VisitUs from "./components/VisitUs";

/* PAGES */
import Login from "./pages/Login";
import Register from "./pages/Register";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Payment from "./pages/Payment";
import Success from "./pages/Success";

/* ADMIN */
import AdminApp from "./admin/AdminApp";

/* CONTEXT */
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";

export default function App() {
  const location = useLocation();

  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminPage && <MobileMenu />}

      <div className="bg-pinky min-h-screen pt-2">
        <Routes>
          {/* HOME */}
          <Route
            path="/"
            element={
              <>
                <HeroSlider />
                <BestSellers />
                <MenuSlider />
                <VisitUs />
              </>
            }
          />

          {/* AUTH */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* SHOP */}
          <Route path="/menu" element={<Menu />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/payment" element={<Payment />} />

          {/* SUCCESS */}
          <Route path="/success" element={<Success />} />

          {/* ADMIN */}
          <Route
            path="/admin/*"
            element={
              <ProtectedAdminRoute>
                <AdminApp />
              </ProtectedAdminRoute>
            }
          />
        </Routes>
      </div>
    </>
  );
}