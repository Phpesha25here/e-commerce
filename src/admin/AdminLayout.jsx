import { Link, Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-[#7C8C6B] text-white">

      {/* Sidebar */}
      <aside className="w-64 bg-[#6D7D60] p-6 space-y-6">
        <h1 className="text-2xl font-bold text-[#F6C1CF]">
          Creamantra Admin panel
          
        </h1>

        <nav className="flex flex-col gap-4">
          <Link to="" className="hover:text-[#F6C1CF]">Dashboard</Link>
          <Link to="orders" className="hover:text-[#F6C1CF]">Orders</Link>
          <Link to="customers" className="hover:text-[#F6C1CF]">Customers</Link>
          <Link to="sales" className="hover:text-[#F6C1CF]">Sales</Link>
          <Link to="add-product" className="hover:text-[#F6C1CF]">Add Product</Link>
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
