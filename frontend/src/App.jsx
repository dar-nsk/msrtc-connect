import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import BusTypes from "./components/BusTypes";
import Services from "./components/Services";
import Contact from "./components/Contact";
import Footer from "./components/Footer"; 
import Login from "./components/Login";
import Register from "./components/Register";
import BusAvailability from "./components/BusAvailability";
import Timetable from "./components/Timetable";
import Booking from "./components/Booking";
import BusTracking from "./components/BusTracking";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminTimetable from "./pages/Admin/AdminTimetable";
import ManageBuses from "./pages/Admin/ManageBuses";
import TicketPricing from "./pages/Admin/TicketPricing";
import Analytics from "./pages/Admin/Analytics";
import Bookings from "./pages/Admin/Bookings";

import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

/* 🔥 Layout Controller */
function Layout() {
  const location = useLocation();

  // ✅ Check if admin page
  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <>
      {/* ✅ Hide Navbar on Admin */}
      {!isAdminPage && <Navbar />}

      <Routes>

        {/* Home Page */}
        <Route
          path="/"
          element={
            <>
              <section id="home">
                <Hero />
              </section>

              <section id="bus">
                <BusTypes />
              </section>

              <section id="services">
                <Services />
              </section>

              <section id="contact">
                <Contact />
              </section>
            </>
          }
        />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* User Features */}
        <Route path="/bus-availability" element={<BusAvailability />} />
        <Route path="/timetable" element={<Timetable />} />
        <Route
  path="/booking"
  element={
    <ProtectedRoute>
      <Booking />
    </ProtectedRoute>
  }
/>

<Route
  path="/track-bus"
  element={
    <ProtectedRoute>
      <BusTracking />
    </ProtectedRoute>
  }
/>

        {/* Admin */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/timetable" element={<AdminTimetable />} />
        <Route path="/admin/buses" element={<ManageBuses />} />
        <Route path="/admin/pricing" element={<TicketPricing />} />
        <Route path="/admin/analytics" element={<Analytics />} />
        <Route path="/admin/bookings" element={<Bookings />} />

      </Routes>

      {/* ✅ Hide Footer on Admin */}
      {!isAdminPage && <Footer />}
    </>
  );
}

/* MAIN APP */
function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;