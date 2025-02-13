import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminAccess = () => {
  const [showOptions, setShowOptions] = useState(false);
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      {!showOptions ? (
        <button 
          onClick={() => setShowOptions(true)} 
          style={{ padding: "10px 20px", fontSize: "18px", cursor: "pointer" }}
        >
          Admin
        </button>
      ) : (
        <div>
          <h3>Admin Access</h3>
          <button 
            onClick={() => navigate("/admin/login")} 
            style={{ padding: "10px", margin: "5px", cursor: "pointer" }}
          >
            Login
          </button>
          <button 
            onClick={() => navigate("/admin/signup")} 
            style={{ padding: "10px", margin: "5px", cursor: "pointer" }}
          >
            Signup
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminAccess;
