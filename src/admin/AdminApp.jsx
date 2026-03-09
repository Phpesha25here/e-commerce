import { Routes, Route } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import Dashboard from "./Dashboard";
import Orders from "./Orders";
import Customers from "./Customers";
import Sales from "./Sales";
import AddProduct from "./AddProduct";

export default function AdminApp() {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="orders" element={<Orders />} />
        <Route path="customers" element={<Customers />} />
        <Route path="sales" element={<Sales />} />
        <Route path="add-product" element={<AddProduct />} />
      </Route>
    </Routes>
  );
}