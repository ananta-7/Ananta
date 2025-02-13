import { useState, useEffect } from "react";
import Navbar from '../../components/Navbar';
import "./Inventory.css";

const Alerts = () => {
    const [notifications, setNotifications] = useState(() => {
        try {
          const savedNotifications = localStorage.getItem("notifications");
          return savedNotifications ? JSON.parse(savedNotifications) : [];
        } catch (error) {
          console.error("Error parsing notifications from localStorage:", error);
          return [];
        }
      });
      

  useEffect(() => {
    localStorage.setItem("notifications", JSON.stringify(notifications));
  }, [notifications]);

  return (
    <div className="notifications-container">
      <Navbar />
      <h2>🔔 Inventory Notifications</h2>

      {/* Back to Inventory Button */}
      <button className="view-alerts-button" onClick={() => window.location.href = "/admin/home/inventory"}>
        ⬅ Back to Inventory
      </button>

      {/* Notifications List */}
      <ul>
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <li key={notification.id}>
              {notification.message} <span>({notification.time})</span>
            </li>
          ))
        ) : (
          <p>✅ No recent notifications.</p>
        )}
      </ul>
    </div>
  );
};

export default Alerts;
