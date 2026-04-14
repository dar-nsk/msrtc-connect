import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import for navigation
import msrtcLogo from "../../assets/image5.jpg";
import {
  Home,
  Bus,
  Calendar,
  Ticket,
  BarChart3,
  LogOut,
  ChevronRight,
  TrendingUp,
  Menu,
  X,
} from "lucide-react";

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userName, setUserName] = useState("Admin");
  const navigate = useNavigate(); // Initialize navigate

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Logout Handler
  const handleLogout = () => {
    // Add any logic here (e.g., localStorage.clear() or auth signout)
    localStorage.removeItem("user");
    window.location.href = "/"; // Redirects to the login page
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F3F4F9] relative overflow-x-hidden">
      
      {/* ================= SIDEBAR ================= */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/40 z-40 transition-opacity"
          onClick={toggleSidebar}
        />
      )}

      <aside className={`fixed top-0 left-0 h-full w-72 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}>
        <div className="p-6 flex justify-between items-center border-b border-gray-100">
          <div className="flex items-center gap-3">
            
            <span className="font-bold text-gray-800">Menu</span>
          </div>
          <button onClick={toggleSidebar} className="p-1 hover:bg-gray-100 rounded-full transition">
            <X size={24} className="text-gray-500" />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          <SidebarItem icon={<Home size={22} />} text="Dashboard" active onClick={toggleSidebar} />
          <SidebarItem icon={<Bus size={22} />} text="Manage Buses" onClick={toggleSidebar} />
          <SidebarItem icon={<Calendar size={22} />} text="Timetable" onClick={toggleSidebar} />
          <SidebarItem icon={<Ticket size={22} />} text="Ticket Pricing" onClick={toggleSidebar} />
          <SidebarItem icon={<BarChart3 size={22} />} text="Analytics" onClick={toggleSidebar} />
        </nav>

        <div className="p-4 border-t border-gray-100">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-4 w-full p-4 text-red-600 hover:bg-red-50 rounded-xl transition font-semibold"
          >
            <LogOut size={22} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* ================= MAIN AREA ================= */}
      <div className="flex-1 flex flex-col w-full">
        
        {/* HEADER */}
        <header className="flex items-center justify-between bg-[#A32020] text-white px-6 py-4 shadow-lg sticky top-0 z-30">
          <div className="flex items-center gap-5">
            <button onClick={toggleSidebar} className="p-2 hover:bg-white/10 rounded-lg transition">
              <Menu size={28} />
            </button>
            <div className="flex items-center gap-3">
               <img src={msrtcLogo} alt="MSRTC" className="w-8 h-8 object-contain" />
              <h1 className="text-xl font-bold tracking-tight">Admin Dashboard</h1>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 bg-white/10 px-3 py-1.5 rounded-full border border-white/20">
              <img
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userName}`}
                alt="profile"
                className="w-8 h-8 rounded-full bg-white p-0.5"
              />
              <span className="font-semibold text-sm">{userName}</span>
            </div>
            <button 
              onClick={handleLogout}
              className="bg-orange-500 hover:bg-orange-600 px-5 py-2 rounded-lg text-sm font-black uppercase tracking-wider shadow-md transition transform active:scale-95"
            >
              Logout
            </button>
          </div>
        </header>

        {/* DASHBOARD CONTENT */}
        <main className="flex-grow p-6 md:p-8 max-w-6xl mx-auto w-full">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Welcome, <span className="text-[#A32020]">{userName}!</span>
          </h2>

          <div className="bg-white rounded-3xl p-6 md:p-10 shadow-lg border border-gray-100">
            {/* GRID: Reduced gap to lg:gap-8 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              
              <DashboardCard
                title="Update Bus Timetable"
                desc="Modify the bus schedules"
                icon={<Calendar size={32} />} // Reduced icon size
                gradient="bg-blue-600"
                onClick={() => navigate("/admin/timetable")}

              />

              <DashboardCard
                title="Update Ticket Pricing"
                desc="Change the ticket fares"
                icon={<Ticket size={32} />}
                gradient="bg-teal-600"
                onClick={() => navigate("/admin/pricing")}
                
              />

              <DashboardCard
                title="Manage Buses Availability"
                desc="Add or remove buses"
                icon={<Bus size={32} />}
                gradient="bg-orange-500"
                onClick={() => navigate("/admin/buses")}
              />

              <DashboardCard
                title="View Analytics Reports"
                desc="Check website analytics"
                icon={<TrendingUp size={32} />}
                gradient="bg-indigo-500"
                onClick={() => navigate("/admin/analytics")}
              />

              <DashboardCard
              title="View Bookings"
              desc="See all passenger bookings"
              icon={<Ticket size={32} />}
              gradient="bg-pink-500"
              onClick={() => navigate("/admin/bookings")}
            />

            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

/* ================= COMPONENTS ================= */

const SidebarItem = ({ icon, text, active = false, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-5 w-full p-3.5 rounded-xl transition-all duration-200 ${
      active
        ? "bg-[#A32020]/10 text-[#A32020] font-bold"
        : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
    }`}
  >
    <span className={active ? "text-[#A32020]" : "text-gray-400"}>{icon}</span>
    <span className="text-base">{text}</span>
  </button>
);

const DashboardCard = ({ title, desc, icon, gradient, onClick}) => (
  <button onClick={onClick} className={`${gradient} text-white p-6 rounded-2xl shadow-md flex items-center justify-between hover:shadow-xl transition-all duration-300 hover:-translate-y-1 active:scale-[0.98] text-left w-full group`}>
    <div className="flex items-center gap-5">
      <div className="bg-white/10 p-3 rounded-xl backdrop-blur-sm border border-white/20">
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-bold leading-tight">{title}</h3>
        <p className="text-white/80 text-sm">{desc}</p>
      </div>
    </div>
    <div className="opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-10px] group-hover:translate-x-0">
        <ChevronRight size={22} />
    </div>
  </button>
);

export default AdminDashboard;