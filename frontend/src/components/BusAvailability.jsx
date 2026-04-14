import React, { useState } from "react";
import { BusFront, MapPin, CalendarDays } from "lucide-react";
const API = import.meta.env.VITE_API_URL;

const BusAvailability = () => {
  const [formData, setFormData] = useState({
    source: "",
    destination: "",
    date: "",
    busType: "All",
  });

  const [buses, setBuses] = useState([]); // ✅ store results
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ CONNECTED TO BACKEND
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${API}/api/bus/search`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      setBuses(data); // ✅ save data
    } catch (error) {
      console.error("Error fetching buses:", error);
    }

    setLoading(false);
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-white to-orange-50 py-20 px-6">
      
      {/* Heading */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-800 mb-2">
          Check Bus Availability
        </h2>
        <p className="text-gray-500">
          Find buses between your desired locations easily.
        </p>
      </div>

      {/* Form */}
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl p-10">
        
        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
          
          {/* Source */}
          <div className="flex items-center border rounded-lg px-4 py-3">
            <MapPin className="text-orange-500 mr-2" />
            <input
              type="text"
              name="source"
              placeholder="From (Source)"
              value={formData.source}
              onChange={handleChange}
              className="w-full outline-none"
            />
          </div>

          {/* Destination */}
          <div className="flex items-center border rounded-lg px-4 py-3">
            <MapPin className="text-red-500 mr-2" />
            <input
              type="text"
              name="destination"
              placeholder="To (Destination)"
              value={formData.destination}
              onChange={handleChange}
              className="w-full outline-none"
            />
          </div>

          {/* Date */}
          <div className="flex items-center border rounded-lg px-4 py-3">
            <CalendarDays className="text-blue-500 mr-2" />
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full outline-none"
            />
          </div>

          {/* Bus Type */}
          <div className="flex items-center border rounded-lg px-4 py-3">
            <BusFront className="text-green-500 mr-2" />
            <select
              name="busType"
              value={formData.busType}
              onChange={handleChange}
              className="w-full outline-none bg-transparent"
            >
              <option value="All">All Bus Types</option>
              <option value="Ordinary">Ordinary</option>
              <option value="Shivshahi">Shivshahi</option>
              <option value="Hirakani">Hirakani</option>
            </select>
          </div>

          {/* Button */}
          <div className="md:col-span-2 text-center mt-4">
            <button
              type="submit"
              className="bg-red-500 hover:bg-red-600 text-white px-10 py-3 rounded-full shadow-lg font-semibold transition"
            >
              {loading ? "Searching..." : "Search Buses"}
            </button>
          </div>

        </form>
      </div>

      {/* ✅ RESULTS SECTION */}
      <div className="max-w-5xl mx-auto mt-16">
        
        {buses.length > 0 ? (
          <div className="space-y-6">
            {buses.map((bus, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-xl p-6 flex justify-between items-center"
              >
                <div>
                  <h3 className="text-xl font-bold text-gray-800">
                    {bus.busName}
                  </h3>
                  <p className="text-gray-500">
                    {bus.source} → {bus.destination}
                  </p>
                  <p className="text-sm text-gray-400">
                    {bus.departureTime} - {bus.arrivalTime}
                  </p>
                  <p className="text-green-600 font-medium">
                    Seats Available: {bus.availableSeats}
                  </p>
                </div>

                
              </div>
            ))}
          </div>
        ) : (
          !loading && (
            <p className="text-center text-gray-500 mt-10">
              No buses found. Try different route.
            </p>
          )
        )}

      </div>

    </section>
  );
};

export default BusAvailability;