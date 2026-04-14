import React, { useState, useEffect } from "react";
const API = import.meta.env.VITE_API_URL;

const ManageBuses = () => {
  const [form, setForm] = useState({
    busName: "",
    source: "",
    destination: "",
    type: "",
    departureTime: "",
    arrivalTime: "",
    availableSeats: ""
  });

  const [buses, setBuses] = useState([]);

  fetch(`${API}/api/bus`);

  const fetchBuses = async () => {
    const res = await fetch(API);
    const data = await res.json();
    setBuses(data);
  };

  useEffect(() => {
    fetchBuses();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = async () => {
    await fetch(`${API}/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    });

    fetchBuses();

    setForm({
      source: "",
      destination: "",
      time: "",
      type: ""
    });
  };

  const handleDelete = async (id) => {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    fetchBuses();
  };

  return (
    <div className="p-8 bg-[#F3F4F9] min-h-screen">

      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        Manage Bus Availability
      </h2>

      {/* FORM */}
      <div className="bg-white p-6 rounded-xl shadow mb-6">
        <div className="grid md:grid-cols-4 gap-4">

            {/* Bus Name */}
            <input
            name="busName"
            placeholder="Bus Name"
            value={form.busName}
            onChange={handleChange}
            className="p-3 border rounded"
            />

            {/* Source */}
            <input
            name="source"
            placeholder="Source"
            value={form.source}
            onChange={handleChange}
            className="p-3 border rounded"
            />

            {/* Destination */}
            <input
            name="destination"
            placeholder="Destination"
            value={form.destination}
            onChange={handleChange}
            className="p-3 border rounded"
            />

            {/* Departure Time */}
            <input
            type="time"
            name="departureTime"
            value={form.departureTime}
            onChange={handleChange}
            className="p-3 border rounded"
            />

            {/* Arrival Time */}
            <input
            type="time"
            name="arrivalTime"
            value={form.arrivalTime}
            onChange={handleChange}
            className="p-3 border rounded"
            />

            {/* Available Seats */}
            <input
            type="number"
            name="availableSeats"
            placeholder="Seats"
            value={form.availableSeats}
            onChange={handleChange}
            className="p-3 border rounded"
            />

            {/* Bus Type */}
            <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="p-3 border rounded"
            >
            <option value="">Select Type</option>
            <option>ShivShahi</option>
            <option>Hirakani</option>
            <option>Ordinary</option>
            </select>

        </div>

        <button
          onClick={handleAdd}
          className="mt-4 bg-[#A32020] text-white px-5 py-2 rounded"
        >
          Add Bus
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white p-6 rounded-xl shadow">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="border-b text-gray-700 text-left">
                <th className="py-3 px-4">Bus Name</th>
                <th className="py-3 px-4">Source</th>
                <th className="py-3 px-4">Destination</th>
                <th className="py-3 px-4">Departure</th>
                <th className="py-3 px-4">Arrival</th>
                <th className="py-3 px-4">Seats</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Action</th>
            </tr>
            </thead>

          <tbody>
        {buses.map((bus) => (
            <tr key={bus._id} className="border-b hover:bg-gray-50">

            <td className="py-3 px-4">{bus.busName}</td>
            <td className="py-3 px-4">{bus.source}</td>
            <td className="py-3 px-4">{bus.destination}</td>
            <td className="py-3 px-4">{bus.departureTime}</td>
            <td className="py-3 px-4">{bus.arrivalTime}</td>
            <td className="py-3 px-4 text-center">{bus.availableSeats}</td>
            <td className="py-3 px-4">{bus.type}</td>

            <td className="py-3 px-4">
                <button
                onClick={() => handleDelete(bus._id)}
                className="text-red-500 hover:underline"
                >
                Delete
                </button>
            </td>

            </tr>
        ))}
        </tbody>

        </table>
      </div>

    </div>
  );
};

export default ManageBuses;