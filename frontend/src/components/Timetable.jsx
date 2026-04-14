import React, { useState } from "react";
import CitySelector from "./CitySelector";

const Timetable = () => {

  const [selectedCity, setSelectedCity] = useState(null);

  const cities = [
    "Mumbai",
    "Pune",
    "Nagpur",
    "Nashik",
    "Aurangabad",
    "Kolhapur",
    "Amravati"
  ];

  const handleSelect = (city) => {
    setSelectedCity(city.toLowerCase()); // ✅ store city
  };

  return (
    <section className="min-h-screen pt-28 bg-[#fdf8f4]">

      <h1 className="text-4xl font-bold text-center mb-10">
        Bus Timetable
      </h1>

      <CitySelector cities={cities} onSelect={handleSelect} />

      {/* 📄 SHOW PDF */}
      {selectedCity && (
        <div className="mt-10 flex justify-center">
          <iframe
            src={`/timetables/${selectedCity}.pdf`}
            title="Timetable PDF"
            className="w-[80%] h-[600px] border rounded-xl shadow-lg"
          />
        </div>
      )}

    </section>
  );
};

export default Timetable;