import React, { useEffect, useState } from "react";
const API = import.meta.env.VITE_API_URL;

const Bookings = () => {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    try {
      const res = await fetch(`${API}/api/bookings/all`)
      const data = await res.json();
      setBookings(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="p-6 bg-[#F3F4F9] min-h-screen">

      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        Passenger Bookings 🎟️
      </h2>

      <div className="bg-white rounded-xl shadow p-4 overflow-x-auto">
        <table className="w-full text-left">

          <thead>
            <tr className="border-b text-gray-600">
              <th className="py-3">Name</th>
              <th>Email</th>
              <th>Route</th>
              <th>Seats</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {bookings.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-400">
                  No bookings found
                </td>
              </tr>
            ) : (
              bookings.map((b) => (
                <tr key={b._id} className="border-b hover:bg-gray-50">
                  <td className="py-3">{b.userName}</td>
                  <td>{b.userId?.email || "N/A"}</td>
                  <td>{b.source} → {b.destination}</td>
                  <td>{b.seatsBooked}</td>
                  <td>₹{b.totalPrice}</td>
                  <td className={
                    b.status === "CONFIRMED"
                      ? "text-green-600"
                      : "text-yellow-600"
                  }>
                    {b.status}
                  </td>
                </tr>
              ))
            )}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default Bookings;