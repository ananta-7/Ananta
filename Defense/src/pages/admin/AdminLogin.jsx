import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [loginData, setLoginData] = useState({
    registerNumber: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleLogin = () => {
    const storedData = JSON.parse(localStorage.getItem("adminData"));

    if (storedData && storedData.registerNumber === loginData.registerNumber && storedData.password === loginData.password) {
      alert("Login Successful!");
      navigate("/admin/home"); // Redirect to Home Page
    } else {
      alert("Invalid Credentials. Please try again.");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h2>Admin Login</h2>

      <div style={{ marginBottom: "10px" }}>
        <label>Register Number:</label>
        <input 
          type="text" 
          name="registerNumber" 
          value={loginData.registerNumber} 
          onChange={handleChange} 
          required 
          style={{ width: "100%", padding: "8px", marginTop: "5px" }} 
        />
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label>Password:</label>
        <input 
          type="password" 
          name="password" 
          value={loginData.password} 
          onChange={handleChange} 
          required 
          style={{ width: "100%", padding: "8px", marginTop: "5px" }} 
        />
      </div>

      <button 
        onClick={handleLogin} 
        style={{ width: "100%", padding: "10px", backgroundColor: "blue", color: "white", cursor: "pointer" }}
      >
        Login
      </button>

      <p style={{ textAlign: "center", marginTop: "10px" }}>
        Do not have an account? <Link to="/admin/signup">Signup</Link>
      </p>
    </div>
  );
};

export default AdminLogin;
