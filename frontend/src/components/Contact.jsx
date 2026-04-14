import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";

const Contact = () => {
  return (
    <section className="py-16 px-6 bg-gradient-to-b from-white to-orange-50">
      
      {/* Heading */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold">Contact Us</h2>
        <p className="text-gray-500 mt-2">
          We are here to help you with your travel queries.
        </p>
      </div>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">

        {/* Left Side - Contact Info */}
        <div className="bg-white shadow-lg rounded-2xl p-8 space-y-6">
          
          <h3 className="text-2xl font-semibold mb-4">Get in Touch</h3>

          <div className="flex items-center gap-4">
            <div className="bg-red-100 p-3 rounded-full">
              <Phone className="text-red-500" />
            </div>
            <span className="text-gray-700">1800 22 1250</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-red-100 p-3 rounded-full">
              <Mail className="text-red-500" />
            </div>
            <span className="text-gray-700">support@msrtc.gov.in</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-red-100 p-3 rounded-full">
              <MapPin className="text-red-500" />
            </div>
            <span className="text-gray-700">Mumbai, Maharashtra</span>
          </div>

          
        </div>

        {/* Right Side - Contact Form */}
        <div className="bg-white shadow-lg rounded-2xl p-8">
          
          <h3 className="text-2xl font-semibold mb-6">Send Message</h3>

          <form className="space-y-4">
            
            <input
              type="text"
              placeholder="Your Name"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-400"
            />

            <input
              type="email"
              placeholder="Your Email"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-400"
            />

            <textarea
              rows="4"
              placeholder="Your Message"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-400"
            ></textarea>

            <button
              type="submit"
              className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-semibold transition"
            >
              Send Message
            </button>

          </form>
        </div>

      </div>
    </section>
  );
};

export default Contact;