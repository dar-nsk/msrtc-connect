import React, { useEffect, useState } from "react";
const API = import.meta.env.VITE_API_URL;

const Analytics = () => {
  const [data, setData] = useState({
    totalBookings: 0,
    totalRevenue: 0,
    topRoute: "",
  });

  useEffect(() => {
    fetch(`${API}/api/bookings/analytics`)
      .then(res => res.json())
      .then(data => setData(data));
  }, []);

  return (
    <div className="p-6 bg-[#F3F4F9] min-h-screen">

      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        Analytics Dashboard 📊
      </h2>

      <div className="grid md:grid-cols-3 gap-6">

        {/* Total Bookings */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-500">Total Bookings</h3>
          <p className="text-3xl font-bold text-[#A32020]">
            {data.totalBookings}
          </p>
        </div>

        {/* Total Revenue */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-500">Total Revenue</h3>
          <p className="text-3xl font-bold text-green-600">
            ₹{data.totalRevenue}
          </p>
        </div>

        {/* Top Route */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-500">Most Popular Route</h3>
          <p className="text-xl font-semibold text-blue-600">
            {data.topRoute}
          </p>
        </div>

      </div>
    </div>
  );
};

export default Analytics;