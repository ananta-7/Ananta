import { useState, useEffect } from "react";
import Navbar from '../../components/Navbar';// Import Navbar
import "./Inventory.css";

const Inventory = () => {
  // Default Inventory Data
  const defaultInventory = [
    { id: 1, type: "Tank", name: "T-90 Bhishma", status: "Available", deleted: false },
    { id: 2, type: "Tank", name: "Arjun MK1A", status: "Deployed", deleted: false },
    { id: 3, type: "Weapon", name: "INSAS Rifle", status: "Available", deleted: false },
    { id: 4, type: "Weapon", name: "AK-203 Assault Rifle", status: "Deployed", deleted: false },
    { id: 5, type: "Weapon", name: "MP-5 Submachine Gun", status: "Under Maintenance", deleted: false }
  ];

  // Load Inventory and Notifications from localStorage
  const [inventory, setInventory] = useState(() => {
    const savedData = localStorage.getItem("inventoryData");
    return savedData ? JSON.parse(savedData) : defaultInventory;
  });

  const [notifications, setNotifications] = useState(() => {
    const savedNotifications = localStorage.getItem("notifications");
    return savedNotifications ? JSON.parse(savedNotifications) : [];
  });

  const [alert, setAlert] = useState(null); // Pop-up notification

  useEffect(() => {
    localStorage.setItem("inventoryData", JSON.stringify(inventory));
  }, [inventory]);

  useEffect(() => {
    localStorage.setItem("notifications", JSON.stringify(notifications));
  }, [notifications]);

  // Function to show temporary alerts
  const showAlert = (message) => {
    setAlert(message);
    setTimeout(() => setAlert(null), 3000);
  };

  // Add notification to list
  const addNotification = (message) => {
    const newNotification = { id: Date.now(), message, time: new Date().toLocaleString() };
    setNotifications((prev) => [newNotification, ...prev]);
    showAlert(message);
  };

  // Update Status of an Item
  const updateStatus = (id, newStatus) => {
    setInventory((prevInventory) =>
      prevInventory.map((item) =>
        item.id === id ? { ...item, status: newStatus } : item
      )
    );
    addNotification(`🔄 Status changed: ${id} is now ${newStatus}`);
  };

  // Add New Item
  const addNewItem = () => {
    const type = prompt("Enter Equipment Type (Tank, Weapon, Ammunition, Vehicle):");
    const name = prompt("Enter Equipment Name:");
    if (type && name) {
      const newItem = {
        id: inventory.length + 1,
        type,
        name,
        status: "Available",
        deleted: false
      };
      setInventory((prev) => [...prev, newItem]);
      addNotification(`✅ Added new item: ${name} (${type})`);
    }
  };

  // Remove Item
  const removeItem = (id) => {
    setInventory((prevInventory) =>
      prevInventory.map((item) =>
        item.id === id ? { ...item, deleted: true } : item
      )
    );
    addNotification(`❌ Removed: Item ${id}`);
  };

  // Restore Item
  const restoreItem = (id) => {
    setInventory((prevInventory) =>
      prevInventory.map((item) =>
        item.id === id ? { ...item, deleted: false } : item
      )
    );
    addNotification(`🔄 Restored: Item ${id}`);
  };

  return (
    <div>
      {/* Add Navbar Here */}
      <Navbar />

      <div className="inventory-container">
        <h2>📦 Inventory & Equipment Management</h2>

        {/* Pop-up alert */}
        {alert && <div className="alert-popup">{alert}</div>}

        {/* Admin Controls */}
        <button className="add-button" onClick={addNewItem}>➕ Add New Equipment</button>
        <button className="view-alerts-button" onClick={() => window.location.href = "/admin/home/alert"}>🔔 View Alerts</button>

        {/* Active Inventory Table */}
        <h3>✅ Active Inventory</h3>
        <table className="inventory-table">
          <thead>
            <tr>
              <th>Type</th>
              <th>Name</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {inventory.filter(item => !item.deleted).map((item) => (
              <tr key={item.id}>
                <td>{item.type}</td>
                <td>{item.name}</td>
                <td>
                  <select value={item.status} onChange={(e) => updateStatus(item.id, e.target.value)}>
                    <option value="Available">Available</option>
                    <option value="Deployed">Deployed</option>
                    <option value="Under Maintenance">Under Maintenance</option>
                  </select>
                </td>
                <td>
                  <button className="remove-button" onClick={() => removeItem(item.id)}>❌ Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Deleted Items Table */}
        <h3>🗑️ Removed Items (Stored Permanently)</h3>
        <table className="inventory-table deleted-table">
          <thead>
            <tr>
              <th>Type</th>
              <th>Name</th>
              <th>Restore</th>
            </tr>
          </thead>
          <tbody>
            {inventory.filter(item => item.deleted).map((item) => (
              <tr key={item.id}>
                <td>{item.type}</td>
                <td>{item.name}</td>
                <td>
                  <button className="restore-button" onClick={() => restoreItem(item.id)}>🔄 Restore</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Inventory;
