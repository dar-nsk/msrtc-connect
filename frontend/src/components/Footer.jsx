import React from 'react';
import { Mail, Phone, MapPin, ChevronRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative bg-[#b31919] text-white pt-12 pb-6 px-10 overflow-hidden">
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

      <div className="relative max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 border-b border-white/20 pb-10">
        
        {/* Column 1: Logo */}
        <div className="flex flex-col items-start">
          <div className="flex items-center gap-3 mb-4">
            
            <div>
              {/* ✅ UPDATED PATH */}
              <img 
                src="/images/msrtc-logo.jpg" 
                alt="MSRTC Logo" 
                className="w-full h-full object-contain"
              />
            </div>

            <div>
              <h2 className="text-2xl font-bold leading-tight">MSRTC</h2>
              <p className="text-xs uppercase tracking-widest opacity-80">
                Maharashtra State Road <br /> Transport Corporation
              </p>
            </div>
          </div>

          <p className="text-sm opacity-70 italic">
            "Safe, Reliable, and Punctual."
          </p>
        </div>

        {/* Column 2: Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-6">Contact Us</h3>
          <ul className="space-y-4 text-sm opacity-90">
            <li className="flex items-center gap-3">
              <Mail size={18} className="text-orange-300" />
              <span>support@msrtc.gov.in</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={18} className="text-orange-300" />
              <span>1800 22 1250 (Toll Free)</span>
            </li>
            <li className="flex items-center gap-3">
              <MapPin size={18} className="text-orange-300" />
              <span>Mumbai, Maharashtra</span>
            </li>
          </ul>
        </div>

        {/* Column 3: Links */}
        <div>
          <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
          <ul className="space-y-3 text-sm opacity-80">
            {['Bus Types', 'Services', 'About Us', 'Contact Us'].map((item) => (
              <li
                key={item}
                className="hover:translate-x-1 transition-transform cursor-pointer flex items-center gap-1"
              >
                <ChevronRight size={14} /> {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4: QR Code */}
        <div className="flex flex-col items-center md:items-end">
          <div className="bg-white p-2 rounded-lg mb-3">
            {/* ✅ UPDATED PATH */}
            <img 
              src="/images/qr-code.png" 
              alt="QR Code" 
              className="w-24 h-24"
            />
          </div>

          <p className="text-xs font-bold text-center md:text-right">
            Download the <br /> MSRTC Mobile App
          </p>
        </div>
      </div>

      {/* Bottom */}
      <div className="relative text-center pt-6 text-xs opacity-60 tracking-wide">
        <p>© 2026 MSRTC. All rights reserved. Designed for Maharashtra Tourism.</p>
      </div>

    </footer>
  );
};

export default Footer;