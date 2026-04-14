import React, { useState } from "react";
import { Search } from "lucide-react";

const CitySelector = ({ cities, onSelect }) => {
  const [query, setQuery] = useState("");

  const filteredCities = cities.filter((city) =>
    city.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center justify-center mb-12">

      {/* Search Box */}
      <div className="flex items-center gap-3 bg-white shadow-lg rounded-full px-6 py-4 w-full max-w-xl border border-gray-100">
        <Search className="text-orange-500" />
        <input
          type="text"
          placeholder="Search your city or village..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full outline-none text-gray-700"
        />
      </div>

      {/* Suggestions */}
      {query && (
        <div className="w-full max-w-xl bg-white shadow-md rounded-xl mt-2 max-h-60 overflow-y-auto">
          {filteredCities.map((city, index) => (
            <div
              key={index}
              onClick={() => {
                onSelect(city);
                setQuery(city);
              }}
              className="px-6 py-3 hover:bg-orange-50 cursor-pointer"
            >
              {city}
            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default CitySelector;