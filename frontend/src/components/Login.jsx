import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const API = import.meta.env.VITE_API_URL;

const Login = () => {
  const [role, setRole] = useState("Passenger");

  const [formData, setFormData] = useState({
    mobile: "",
    password: "",
  });

  const navigate = useNavigate(); // ✅ for redirect

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔥 LOGIN API CALL
  const handleSubmit = async (e) => {
  e.preventDefault();

  // ✅ Basic validation
  if (!formData.mobile || !formData.password) {
    alert("Please enter mobile and password");
    return;
  }

  try {
    const res = await fetch(`${API}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        role,
        ...formData,
      }),
    });

    const data = await res.json();

    // ✅ If login failed
    if (!res.ok) {
      alert(data.message || "Login failed");
      return;
    }

    // ✅ If login successful
    if (data.user) {
      localStorage.setItem("user", JSON.stringify(data.user));

      alert("Login Successful ✅");

      if (data.user.role === "Admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    }

  } catch (error) {
    console.error(error);
    alert("Server error. Try again later.");
  }
};

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-orange-50 px-4">
      
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        
        <h2 className="text-3xl font-bold text-center mb-6">Login</h2>

        {/* Role Selection */}
        <div className="flex justify-between mb-6">
          {["Passenger", "Admin"].map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRole(r)}
              className={`px-4 py-2 rounded-full text-sm ${
                role === r
                  ? "bg-red-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {r}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          <input
            type="text"
            name="mobile"
            placeholder="Mobile Number"
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-400"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-400"
          />

          <button className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-semibold">
            Login as {role}
          </button>

        </form>

        <p className="text-sm text-center mt-4">
          Don’t have an account?{" "}
          <Link to="/register" className="text-red-500 hover:underline">
            Register
          </Link>
        </p>

      </div>
    </section>
  );
};

export default Login;