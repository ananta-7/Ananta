
import Navbar from "../../components/Navbar"; // Import Navbar
import "./Home.css"; // Import CSS for styling

const Home = () => {
  return (
    <div>
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-container">
          <div className="hero-text">
            <h1>🇮🇳 Indian Defence Inventory</h1>
            <p>
              A secure, scalable, and efficient platform for managing military inventory, 
              role-based access, and seamless allocation of resources to soldiers.
            </p>
            <a href="https://mod.gov.in" className="btn-primary">Learn More</a>
          </div>
          <div className="hero-image">
            {/* Image will be set via CSS */}
          </div>
        </div>
      </section>

      {/* Information Cards Section */}
      <section className="info-cards">
        <div className="card">
          <h3>🔔 Latest Updates</h3>
          <p>Stay informed about new defense policies, procurement, and technologies.</p>
          <a href="https://mod.gov.in/updates" className="btn-link">Read More</a>
        </div>
        <div className="card">
          <h3>👤 Know Your Minister</h3>
          <p>Learn about India's Defence Minister and key military officials.</p>
          <a href="https://mod.gov.in/minister" className="btn-link">Read More</a>
        </div>
        <div className="card">
          <h3>📝 Public Feedback</h3>
          <p>Share your views and raise defense-related concerns.</p>
          <a href="https://pgportal.gov.in" className="btn-link">Submit Feedback</a>
        </div>
        <div className="card">
          <h3>📊 Performance Dashboard</h3>
          <p>View real-time statistics on inventory, defense spending, and allocations.</p>
          <a href="https://mod.gov.in/performance" className="btn-link">Explore</a>
        </div>
      </section>

      {/* About Section */}
      <section className="about">
        <div className="about-container">
          <h2>About the Defence Inventory System</h2>
          <p>
            The system was designed to handle multiple user roles (Admin, Manager, Soldier) 
            with distinct access levels. It ensures the secure and efficient allocation of 
            military resources, safeguarding national security.
          </p>
          <ul>
            <li>🔐 <strong>Secure Access:</strong> Role-Based Control</li>
            <li>📦 <strong>Inventory Optimization:</strong> Real-Time Resource Management</li>
            <li>📊 <strong>Data-Driven Decisions:</strong> Advanced Reporting & Analytics</li>
            <li>⚡ <strong>Future-Ready:</strong> AI-Powered Predictions & Automation</li>
          </ul>
          <a href="https://mod.gov.in" className="btn-outline">Read More</a>
        </div>
      </section>

      {/* Additional Sections */}
      <section className="features">
        <div className="feature-box">
          <h3>🔍 Defense Research & Development</h3>
          <p>Explore innovations in defense technology and strategic advancements.</p>
          <a href="https://drdo.gov.in" className="btn-link">Explore DRDO</a>
        </div>
        <div className="feature-box">
          <h3>🛡️ Defence Procurement</h3>
          <p>Stay updated on procurement policies, tenders, and strategic partnerships.</p>
          <a href="https://mod.gov.in/procurement" className="btn-link">Learn More</a>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 Ministry of Defence, Government of India</p>
        <p>
          <a href="https://mod.gov.in/contact">Contact Us</a> | 
          <a href="https://mod.gov.in/privacy-policy"> Privacy Policy</a> | 
          <a href="https://mod.gov.in/terms"> Terms of Use</a>
        </p>
      </footer>
    </div>
  );
};

export default Home;
