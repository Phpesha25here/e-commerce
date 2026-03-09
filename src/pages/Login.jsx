import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    // normalize email
    const normalizedEmail = email.trim().toLowerCase();

    // 👑 ADMIN LOGIN FIRST
    if (normalizedEmail === "admin@gmail.com" && password === "1234") {
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: "Admin",
          email: "admin@gmail.com",
          role: "admin",
        })
      );

      navigate("/admin"); // redirect to admin panel
      return; // IMPORTANT: stop execution here
    }

    // 👤 CUSTOMER LOGIN ONLY IF NOT ADMIN
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email: normalizedEmail,
        password,
      });

      localStorage.setItem(
        "user",
        JSON.stringify({
          ...res.data.user,
          role: "customer",
        })
      );

      navigate("/"); // redirect to homepage

    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-pinky">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-2xl shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold text-sage text-center">
          Login
        </h2>

        {error && (
          <p className="text-red-500 text-sm text-center mt-3">{error}</p>
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mt-4 p-3 border rounded-lg"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mt-3 p-3 border rounded-lg"
          required
        />

        <button
          type="submit"
          className="w-full mt-5 bg-sage text-white py-3 rounded-lg hover:bg-pinky hover:text-sage transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}