
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import UserTypeSelection from "./pages/User/UserTypeSelection";
import "bootstrap/dist/css/bootstrap.min.css";
import AdminAccess from "./components/AdminAccess";
import Navbar from "./components/Navbar";
import AdminSignup from "./pages/admin/AdminSignup";
import AdminLogin from "./pages/admin/AdminLogin";
import Home from "./pages/admin/Home";
import Inventory from "./pages/admin/Inventory";
import Personnel from "./pages/admin/Personnel";
import Alerts from "./pages/admin/Alerts";
import Logistics from "./pages/admin/Logistics";




const App = () => {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<UserTypeSelection />} /> */}
        <Route path="/" element={<AdminAccess />} />
        <Route path="/" element={<Navbar />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/signup" element={<AdminSignup />} />
        <Route path="/admin/home" element={<Home />} />
        <Route path="/admin/home/inventory" element={<Inventory />} />
        <Route path="/admin/home/alert" element={<Alerts />} />
        <Route path="/admin/home/personnel" element={<Personnel />} />
        <Route path="/admin/home/logistics" element={<Logistics />} />
      </Routes>
    </Router>
  );
};

export default App;
