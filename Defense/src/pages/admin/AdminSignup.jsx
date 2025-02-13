import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const AdminSignup = () => {
  const [formData, setFormData] = useState({
    email: "",
    phoneNumber: "",
    registerNumber: "",
    password: "",
  });

  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [userOtp, setUserOtp] = useState("");
  const [verified, setVerified] = useState(false);
  const [success, setSuccess] = useState(false);
  const [method, setMethod] = useState("");

  const predefinedOtp = "123456"; // Simulated OTP for verification
  const navigate = useNavigate(); // Redirect after signup

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignupClick = () => {
    if (!formData.email || !formData.phoneNumber || !formData.registerNumber || !formData.password) {
      alert("Please fill in all fields.");
      return;
    }
    setOtpSent(true);
  };

  const handleOtpSend = (method) => {
    setMethod(method);
    setOtp(predefinedOtp);
    alert(`OTP sent to your ${method === "email" ? "Email" : "Phone"}: 123456`);
  };

  const handleOtpVerify = () => {
    if (userOtp === predefinedOtp) {
      setVerified(true);
      alert("OTP Verified Successfully!");
    } else {
      alert("Invalid OTP. Please try again.");
    }
  };

  const handleFinalSignup = () => {
    setSuccess(true);
    // Store user data in localStorage for login
    localStorage.setItem("adminData", JSON.stringify(formData));
    alert("Signup Successful! You can now log in.");
    navigate("/admin/home"); // Redirect to home page
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h2>Admin Signup</h2>

      {success ? (
        <>
          <p style={{ color: "green", fontWeight: "bold" }}>🎉 Signup Successful!</p>
          <Link to="/login">
            <button style={{ width: "100%", padding: "10px", backgroundColor: "green", color: "white", cursor: "pointer" }}>
              Go to Login
            </button>
          </Link>
        </>
      ) : (
        <>
          {!otpSent ? (
            <form>
              <div style={{ marginBottom: "10px" }}>
                <label>Email:</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required style={{ width: "100%", padding: "8px", marginTop: "5px" }} />
              </div>

              <div style={{ marginBottom: "10px" }}>
                <label>Phone Number:</label>
                <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required style={{ width: "100%", padding: "8px", marginTop: "5px" }} />
              </div>

              <div style={{ marginBottom: "10px" }}>
                <label>Register Number:</label>
                <input type="text" name="registerNumber" value={formData.registerNumber} onChange={handleChange} required style={{ width: "100%", padding: "8px", marginTop: "5px" }} />
              </div>

              <div style={{ marginBottom: "10px" }}>
                <label>Password:</label>
                <input type="password" name="password" value={formData.password} onChange={handleChange} required style={{ width: "100%", padding: "8px", marginTop: "5px" }} />
              </div>

              <button type="button" onClick={handleSignupClick} style={{ width: "100%", padding: "10px", backgroundColor: "blue", color: "white", border: "none", cursor: "pointer" }}>
                Signup
              </button>
            </form>
          ) : !otp ? (
            <>
              <p>Choose OTP Verification Method:</p>
              <button onClick={() => handleOtpSend("email")} style={{ marginRight: "10px", padding: "8px", cursor: "pointer" }}>
                Email
              </button>
              <button onClick={() => handleOtpSend("phone")} style={{ padding: "8px", cursor: "pointer" }}>
                Phone
              </button>
            </>
          ) : !verified ? (
            <>
              <p>Enter OTP sent to your {method === "email" ? "Email" : "Phone"}:</p>
              <input type="text" value={userOtp} onChange={(e) => setUserOtp(e.target.value)} style={{ width: "100%", padding: "8px", marginBottom: "10px" }} />
              <button onClick={handleOtpVerify} style={{ width: "100%", padding: "10px", backgroundColor: "green", color: "white", cursor: "pointer" }}>
                Verify OTP
              </button>
            </>
          ) : (
            <button onClick={handleFinalSignup} style={{ width: "100%", padding: "10px", backgroundColor: "blue", color: "white", cursor: "pointer" }}>
              Final Signup
            </button>
          )}

          {/* Link to Admin Login Page */}
          <p style={{ textAlign: "center", marginTop: "10px" }}>
            Already have an account? <Link to="/admin/login">Login</Link>
          </p>
          
        </>
      )}
    </div>
  );
};

export default AdminSignup;
