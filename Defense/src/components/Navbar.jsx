import { Link } from "react-router-dom";
import { useState } from "react";
import "./Navbar.css"; // Import CSS for styling

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // State for mobile menu

  return (
    <>
      <nav className="header">
        <div className="header-left">
          {/* Navigation Links */}
          <div className={`header-right ${isOpen ? "active" : ""}`}>
            <Link to="/admin/home" className="active">Home</Link>
            <Link to="/admin/home/inventory">Inventory</Link>
            <Link to="/admin/home/alert">Alerts</Link>
            <Link to="/admin/home/logistics">Logistics</Link>
            <Link to="/admin/home/personnel">Personnel</Link>
          </div>
        </div>

        {/* Logo Section */}
        <div className="logo-container">
          <Link to="/admin/home" className="logo">
            <span>🇮🇳 Defense Inventory</span>
            <img 
              src="https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg" 
              alt="Indian Flag" 
              className="logo-img"
            />
          </Link>
        </div>

        {/* Mobile Menu Icon */}
        <a href="javascript:void(0);" className="icon" onClick={() => setIsOpen(!isOpen)}>
          <i className={`fa ${isOpen ? "fa-times" : "fa-bars"}`}></i>
        </a>
      </nav>
    </>
  );
};

export default Navbar;
