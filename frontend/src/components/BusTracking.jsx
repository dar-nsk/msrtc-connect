import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { Bus, MapPin, Search, Navigation } from "lucide-react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// 1. IMPORT YOUR CUSTOM BUS ICON
import busIconSvg from "../assets/bus-marker.svg"; // Adjust path as needed

// 2. DEFINE THE CUSTOM LEAFLET ICON
const busIcon = L.icon({
  iconUrl: busIconSvg,
  iconSize: [40, 50], // The size of your SVG [width, height]
  iconAnchor: [20, 50], // The point that will correspond to the marker's location (centered at the bottom tip)
  popupAnchor: [0, -45], // Point from which the popup should open relative to the iconAnchor
});

// Helper component to refocus the map when the bus moves
const RecenterMap = ({ position }) => {
  const map = useMap();
  useEffect(() => {
    if (position) map.setView(position, map.getZoom());
  }, [position, map]);
  return null;
};

const BusTracking = () => {
  const [busNo, setBusNo] = useState("");
  const [searchedBus, setSearchedBus] = useState(null);
  const [showMap, setShowMap] = useState(false);
  const [busPosition, setBusPosition] = useState([19.0760, 72.8777]);

  const handleSearch = () => {
    if (busNo.trim() !== "") {
      setSearchedBus(busNo.toUpperCase());
      setShowMap(false);
    }
  };

  // Simulate Real-Time Movement logic
  useEffect(() => {
    let interval;
    if (showMap) {
      interval = setInterval(() => {
        setBusPosition((prev) => [
          prev[0] + (Math.random() - 0.5) * 0.002,
          prev[1] + (Math.random() - 0.5) * 0.002,
        ]);
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [showMap]);

  return (
    <div className="min-h-screen bg-[#F3F4F9] p-4 md:p-10">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-gray-100">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
            <Navigation className="text-[#A32020]" />
            Live Bus Tracking
          </h2>

          {/* Search Input */}
          <div className="flex gap-3 mb-8">
            <div className="relative flex-1">
              <Bus className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Enter Bus Number (e.g. MH-14-BT-1234)"
                value={busNo}
                onChange={(e) => setBusNo(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:outline-none transition-all"
              />
            </div>
            <button
              onClick={handleSearch}
              className="bg-[#A32020] text-white px-8 rounded-xl font-bold hover:bg-red-800 transition-colors flex items-center gap-2"
            >
              <Search size={20} />
              Search
            </button>
          </div>

          {/* Search Result Card */}
          {searchedBus && (
            <div className="flex justify-between items-center bg-gray-50 border border-gray-100 p-5 rounded-2xl mb-6">
              <div className="flex items-center gap-4">
                <div className="bg-red-100 p-3 rounded-full text-[#A32020]">
                  <Bus size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">{searchedBus}</h4>
                  <p className="text-xs text-green-600 font-medium">● Live Now</p>
                </div>
              </div>

              <button
                onClick={() => setShowMap(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-md"
              >
                Track Live Location
              </button>
            </div>
          )}

          {/* Map Section */}
          {showMap && (
            <div className="mt-6 rounded-3xl overflow-hidden border-4 border-white shadow-2xl h-[450px] relative">
              <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[1000] bg-white px-4 py-2 rounded-full shadow-lg border flex items-center gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                <span className="text-xs font-bold text-gray-700">Tracking {searchedBus}...</span>
              </div>

              <MapContainer 
                center={busPosition} 
                zoom={15} 
                style={{ height: "100%", width: "100%" }}
                scrollWheelZoom={false}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                
                {/* 3. PASS THE CUSTOM ICON TO THE MARKER */}
                <Marker position={busPosition} icon={busIcon}>
                  <Popup>
                    <div className="text-center">
                      <p className="font-bold">{searchedBus}</p>
                      <p className="text-[10px]">Current Velocity: 42 km/h</p>
                    </div>
                  </Popup>
                </Marker>
                
                <RecenterMap position={busPosition} />
              </MapContainer>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BusTracking;