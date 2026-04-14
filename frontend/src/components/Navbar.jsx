import logo from "../assets/image5.jpg";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

function Navbar() {

  const navigate = useNavigate();

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  // ✅ Get user from localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  // ✅ Logout function
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
    window.location.reload();
  };

  return (
    <nav className="flex justify-between items-center px-12 py-4 bg-white shadow-sm sticky top-0 z-50">

      {/* Left: Logo */}
      <div className="flex items-center gap-3">
        <img src={logo} alt="MSRTC Logo" className="h-14 w-auto" />
        <h1 className="text-xl font-semibold text-gray-800">
          <span className="text-red-600 font-bold">Apli</span> ST
        </h1>
      </div>

      {/* Center Links */}
      <ul className="flex gap-10 text-gray-700 font-medium">
        <li onClick={() => scrollToSection("home")} className="cursor-pointer hover:text-red-500">Home</li>
        <li onClick={() => scrollToSection("bus")} className="cursor-pointer hover:text-red-500">Bus Types</li>
        <li onClick={() => scrollToSection("services")} className="cursor-pointer hover:text-red-500">Services</li>
        <li onClick={() => scrollToSection("contact")} className="cursor-pointer hover:text-red-500">Contact</li>
      </ul>

      {/* Right Section */}
      <div className="flex items-center gap-4">

        <div className="border px-3 py-1 rounded-md text-sm cursor-pointer hover:bg-gray-100">
          EN | MR
        </div>

        {/* ✅ IF USER LOGGED IN */}
        {user ? (
          <div className="flex items-center gap-3">

            <div className="flex items-center gap-2">
              <FaUserCircle size={28} className="text-gray-700" />
              <span className="text-sm font-medium">
                {user.name || "User"}
              </span>
            </div>

            <button
              onClick={handleLogout}
              className="text-red-500 text-sm"
            >
              Logout
            </button>

          </div>
        ) : (
          <Link
            to="/login"
            className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-full shadow-sm transition"
          >
            Login / Signup
          </Link>
        )}

      </div>

    </nav>
  );
}

export default Navbar;