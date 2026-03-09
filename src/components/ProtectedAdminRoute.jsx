import { Navigate } from "react-router-dom";

export default function ProtectedAdminRoute({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));

  // DEBUG: Check what is stored
  console.log("ProtectedAdminRoute user:", user);

  if (!user || user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
}