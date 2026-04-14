import React, { useState } from "react";
const API = import.meta.env.VITE_API_URL;

const Register = () => {
  const [role, setRole] = useState("Passenger");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otp, setOtp] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    age: "",
    gender: "",
    mobile: "",
    email: "",
    password: "",
    adminCode: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔥 SEND OTP
  const sendOtp = async () => {
    if (!formData.mobile) {
      alert("Enter mobile number first");
      return;
    }

    try {
      const res = await fetch(`${API}/api/auth/send-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mobile: formData.mobile }),
      });

      const data = await res.json();
      alert(data.message);
      setOtpSent(true);

    } catch (err) {
      console.error(err);
    }
  };

  // 🔥 VERIFY OTP
  const verifyOtp = async () => {
    try {
      const res = await fetch(`${API}/api/auth/verify-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mobile: formData.mobile,
          otp,
        }),
      });

      const data = await res.json();

      if (data.success) {
        alert("OTP Verified ✅");
        setOtpVerified(true);
      } else {
        alert("Invalid OTP ❌");
      }

    } catch (err) {
      console.error(err);
    }
  };

  // 🔥 FINAL REGISTER
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!otpVerified) {
      alert("Please verify OTP first");
      return;
    }

    try {
      const res = await fetch(`${API}/api/auth/register`, {
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
      alert(data.message);

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-orange-50 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg">
        <h2 className="text-3xl font-bold text-center mb-6">Register</h2>

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

          {/* Passenger Fields */}
          {role === "Passenger" && (
            <>
              <input type="text" name="name" placeholder="First Name" onChange={handleChange} className="input" />
              <input type="text" name="surname" placeholder="Surname" onChange={handleChange} className="input" />
              <input type="number" name="age" placeholder="Age" onChange={handleChange} className="input" />
              <select name="gender" onChange={handleChange} className="input">
                <option value="">Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </>
          )}

          {/* Admin Extra Security */}
          {role === "Admin" && (
            <input
              type="text"
              name="adminCode"
              placeholder="Enter Admin Secret Code"
              onChange={handleChange}
              className="input"
            />
          )}

          {/* Common Fields */}
          <input
            type="text"
            name="mobile"
            placeholder="Mobile Number"
            onChange={handleChange}
            className="input"
          />

          {/* OTP FLOW */}
          {!otpSent ? (
            <button
              type="button"
              onClick={sendOtp}
              className="w-full bg-orange-400 hover:bg-orange-500 text-white py-2 rounded-lg"
            >
              Send OTP
            </button>
          ) : !otpVerified ? (
            <>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="input"
              />
              <button
                type="button"
                onClick={verifyOtp}
                className="w-full bg-green-500 text-white py-2 rounded-lg"
              >
                Verify OTP
              </button>
            </>
          ) : (
            <p className="text-green-600 text-center">OTP Verified ✅</p>
          )}

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            onChange={handleChange}
            className="input"
          />

          <input
            type="password"
            name="password"
            placeholder="Create Password"
            onChange={handleChange}
            className="input"
          />

          <button className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-semibold">
            Register as {role}
          </button>

        </form>
      </div>
    </section>
  );
};

export default Register;