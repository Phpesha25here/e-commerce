import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    // Name validation: letters only
    if (!/^[a-zA-Z\s]+$/.test(name)) {
      alert("Name can only contain letters and spaces");
      return;
    }

    // Stricter email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.com$/; // only .com
    const atCount = (email.match(/@/g) || []).length;

    if (!emailRegex.test(email) || atCount !== 1 || /^\d+$/.test(email.split("@")[0])) {
      alert(
        "Invalid email. Make sure it contains letters, only one @, and ends with .com"
      );
      return;
    }

    // Password validation: at least 1 letter and 1 number
    if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(password)) {
      alert(
        "Password must be at least 6 characters and include both letters and numbers"
      );
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name,
          email,
          password,
        }
      );

      alert(res.data.message);
      navigate("/login");
    } catch (error) {
      alert("Registration failed");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-pinky">
      <form
        onSubmit={handleRegister}
        className="bg-white p-8 rounded-2xl shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold text-sage text-center">Register</h2>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mt-4 p-3 border rounded-lg"
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mt-3 p-3 border rounded-lg"
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
          className="w-full mt-5 bg-sage text-white py-3 rounded-lg"
        >
          Register
        </button>
      </form>
    </div>
  );
}