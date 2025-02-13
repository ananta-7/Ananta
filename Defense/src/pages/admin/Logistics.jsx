import { useState, useEffect } from "react";
import Navbar from '../../components/Navbar'; // Import the Navbar component
import "./Logistics.css";

const Logistics = () => {
  // Default data for each section
  const defaultRequests = [
    { id: 1, item: "Ammunition", quantity: 500, status: "Pending" },
    { id: 2, item: "Medical Kits", quantity: 50, status: "Approved" }
  ];

  const defaultTransportLogs = [
    { id: 1, item: "Fuel", from: "Base A", to: "Forward Post", date: "2025-02-10" },
    { id: 2, item: "Food Rations", from: "Warehouse", to: "Camp B", date: "2025-02-11" }
  ];

  const defaultRepairs = [
    { id: 1, item: "Tank Treads", issue: "Worn Out", status: "Under Repair" },
    { id: 2, item: "Communication Radio", issue: "Signal Failure", status: "Pending" }
  ];

  // Load from localStorage if available
  const [resupplyRequests, setResupplyRequests] = useState(() => {
    const savedData = localStorage.getItem("resupplyRequests");
    return savedData ? JSON.parse(savedData) : defaultRequests;
  });

  const [transportLogs, setTransportLogs] = useState(() => {
    const savedData = localStorage.getItem("transportLogs");
    return savedData ? JSON.parse(savedData) : defaultTransportLogs;
  });

  const [repairTracker, setRepairTracker] = useState(() => {
    const savedData = localStorage.getItem("repairTracker");
    return savedData ? JSON.parse(savedData) : defaultRepairs;
  });

  useEffect(() => {
    localStorage.setItem("resupplyRequests", JSON.stringify(resupplyRequests));
    localStorage.setItem("transportLogs", JSON.stringify(transportLogs));
    localStorage.setItem("repairTracker", JSON.stringify(repairTracker));
  }, [resupplyRequests, transportLogs, repairTracker]);

  // Function to update the status of resupply requests
  const updateRequestStatus = (id, newStatus) => {
    setResupplyRequests(prevRequests =>
      prevRequests.map(req =>
        req.id === id ? { ...req, status: newStatus } : req
      )
    );
  };

  // Function to update the status of repair tracker
  const updateRepairStatus = (id, newStatus) => {
    setRepairTracker(prevRepairs =>
      prevRepairs.map(rep =>
        rep.id === id ? { ...rep, status: newStatus } : rep
      )
    );
  };

  // Handle adding new resupply request
  const [newRequest, setNewRequest] = useState({ item: "", quantity: "" });

  const addResupplyRequest = () => {
    if (!newRequest.item || !newRequest.quantity) {
      alert("Please enter item and quantity.");
      return;
    }

    const newEntry = { id: resupplyRequests.length + 1, ...newRequest, status: "Pending" };
    setResupplyRequests([...resupplyRequests, newEntry]);
    setNewRequest({ item: "", quantity: "" });
  };

  // Handle adding new transport log
  const [newTransport, setNewTransport] = useState({ item: "", from: "", to: "", date: "" });

  const addTransportLog = () => {
    if (!newTransport.item || !newTransport.from || !newTransport.to || !newTransport.date) {
      alert("Please fill in all fields.");
      return;
    }

    const newEntry = { id: transportLogs.length + 1, ...newTransport };
    setTransportLogs([...transportLogs, newEntry]);
    setNewTransport({ item: "", from: "", to: "", date: "" });
  };

  // Handle adding new repair entry
  const [newRepair, setNewRepair] = useState({ item: "", issue: "", status: "Pending" });

  const addRepairEntry = () => {
    if (!newRepair.item || !newRepair.issue) {
      alert("Please fill in all fields.");
      return;
    }

    const newEntry = { id: repairTracker.length + 1, ...newRepair };
    setRepairTracker([...repairTracker, newEntry]);
    setNewRepair({ item: "", issue: "", status: "Pending" });
  };

  return (
    <div className="logistics-container">
   
      <Navbar /> {/* Include the Navbar component */}

      <h2>📦 Logistics & Supply Chain</h2>

      {/* Resupply Requests Section */}
      <div className="section">
        <h3>📋 Resupply Requests</h3>
        <div className="form">
          <input
            type="text"
            placeholder="Item Name"
            value={newRequest.item}
            onChange={(e) => setNewRequest({ ...newRequest, item: e.target.value })}
          />
          <input
            type="number"
            placeholder="Quantity"
            value={newRequest.quantity}
            onChange={(e) => setNewRequest({ ...newRequest, quantity: e.target.value })}
          />
          <button onClick={addResupplyRequest}>➕ Add Request</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Quantity</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {resupplyRequests.map(req => (
              <tr key={req.id}>
                <td>{req.item}</td>
                <td>{req.quantity}</td>
                <td>
                  <select value={req.status} onChange={(e) => updateRequestStatus(req.id, e.target.value)}>
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Transportation Logs Section */}
      <div className="section">
        <h3>🚚 Transportation Logs</h3>
        <div className="form">
          <input
            type="text"
            placeholder="Item"
            value={newTransport.item}
            onChange={(e) => setNewTransport({ ...newTransport, item: e.target.value })}
          />
          <input
            type="text"
            placeholder="From"
            value={newTransport.from}
            onChange={(e) => setNewTransport({ ...newTransport, from: e.target.value })}
          />
          <input
            type="text"
            placeholder="To"
            value={newTransport.to}
            onChange={(e) => setNewTransport({ ...newTransport, to: e.target.value })}
          />
          <input
            type="date"
            value={newTransport.date}
            onChange={(e) => setNewTransport({ ...newTransport, date: e.target.value })}
          />
          <button onClick={addTransportLog}>➕ Add Log</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>From</th>
              <th>To</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {transportLogs.map((log) => (
              <tr key={log.id}>
                <td>{log.item}</td>
                <td>{log.from}</td>
                <td>{log.to}</td>
                <td>{log.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Damage & Repair Tracker Section */}
      <div className="section">
        <h3>🛠️ Damage & Repair Tracker</h3>
        <div className="form">
          <input
            type="text"
            placeholder="Item"
            value={newRepair.item}
            onChange={(e) => setNewRepair({ ...newRepair, item: e.target.value })}
          />
          <input
            type="text"
            placeholder="Issue"
            value={newRepair.issue}
            onChange={(e) => setNewRepair({ ...newRepair, issue: e.target.value })}
          />
          <button onClick={addRepairEntry}>➕ Add Repair</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Issue</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {repairTracker.map((repair) => (
              <tr key={repair.id}>
                <td>{repair.item}</td>
                <td>{repair.issue}</td>
                <td>
                  <select value={repair.status} onChange={(e) => updateRepairStatus(repair.id, e.target.value)}>
                    <option value="Pending">Pending</option>
                    <option value="Under Repair">Under Repair</option>
                    <option value="Completed">Completed</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Logistics;