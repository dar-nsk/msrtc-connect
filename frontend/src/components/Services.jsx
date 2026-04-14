import React, { useState } from "react";
import { BusFront, MapPin, Ticket, Clock, ChevronRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Services = () => {
  const [showMore, setShowMore] = useState(false);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const isLoggedIn = !!user;

  // Top 3 services
  const mainServices = [
  {
    title: "Bus Availability",
    description:
      "Check available buses between your source and destination in real-time.",
    icon: <BusFront className="w-10 h-10 text-orange-600" />,
    path: "/bus-availability",
    public: true, // ✅ ADD THIS
  },
  {
    title: "Bus Timetable",
    description:
      "View complete schedule of buses with departure and arrival timings.",
    icon: <Clock className="w-10 h-10 text-orange-600" />,
    path: "/timetable",
    public: true, // ✅ ADD THIS
  },
  {
    title: "Online Ticket Booking",
    description:
      "Book your bus tickets easily and securely from anywhere.",
    icon: <Ticket className="w-10 h-10 text-orange-600" />,
    path: "/booking",
    public: false, // 🔒 LOGIN REQUIRED
  },
];

  // Extra services
  const extraServices = [
  {
    title: "Bus Tracking",
    description: "Track the real-time location of your bus effortlessly.",
    icon: <MapPin className="w-10 h-10 text-orange-600" />,
    path: "/track-bus",
    public: false,
  },
];

  const ServiceCard = ({ service }) => {
  const handleClick = () => {
    // ✅ Allow public services
    if (service.public) {
      navigate(service.path);
      return;
    }

    // 🔒 Restrict private services
    if (!isLoggedIn) {
      alert("Please login to access this service ");
      navigate("/login");
    } else {
      navigate(service.path);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="flex flex-col items-center cursor-pointer hover:scale-105 transition duration-300"
    >
      <div className="w-24 h-24 mb-8 rounded-full bg-white shadow-inner flex items-center justify-center border border-orange-50/50">
        {service.icon}
      </div>

      <h3 className="text-2xl font-bold text-gray-800 mb-4">
        {service.title} {!service.public && !isLoggedIn }
      </h3>

      <p className="text-gray-500 text-sm px-4">
        {service.description}
      </p>
    </div>
  );
};

  return (
    <section id="services" className="relative py-24 px-6 bg-[#fdf8f4]">
      
      {/* Heading */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-800 mb-2">
          Our Services
        </h2>
        <p className="text-gray-500 italic">
          Explore smart travel features designed for your convenience.
        </p>
      </div>

      {/* Card Container */}
      <div className="max-w-6xl mx-auto bg-white/80 backdrop-blur-md rounded-[50px] shadow-2xl p-12 md:p-20 relative border border-white/50">
        
        {/* Main Services */}
        <div className="grid md:grid-cols-3 gap-16 text-center">
          {mainServices.map((service, index) => (
            <ServiceCard key={index} service={service} />
          ))}
        </div>

        {/* Extra Services */}
        {showMore && (
          <div className="grid md:grid-cols-3 gap-16 text-center mt-16">
            {extraServices.map((service, index) => (
              <ServiceCard key={index} service={service} />
            ))}
          </div>
        )}

        {/* Button */}
        <div className="absolute -bottom-7 left-1/2 -translate-x-1/2">
          <button
            onClick={() => setShowMore(!showMore)}
            className="bg-[#ff5a1f] hover:bg-[#e44e19] text-white font-bold py-4 px-10 rounded-full shadow-xl flex items-center gap-2 transition-transform hover:scale-105"
          >
            {showMore ? "Show Less" : "Explore More Services"}
            <ChevronRight size={20} />
          </button>
        </div>

      </div>
    </section>
  );
};

export default Services;