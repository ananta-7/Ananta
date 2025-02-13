import { useState, useEffect } from "react";

import Navbar from '../../components/Navbar';
import "./Personnel.css";

const Personnel = () => {
  const defaultPersonnel = [
    { id: 1, name: "Captain Vikram", rank: "Captain", assignedTo: "T-90 Bhishma", training: ["Tank Operation"], status: "Ready" },
    { id: 2, name: "Lt. Arjun", rank: "Lieutenant", assignedTo: "INSAS Rifle", training: ["Rifle Handling"], status: "In Training" },
    { id: 3, name: "Sgt. Karan", rank: "Sergeant", assignedTo: "MP-5 Submachine Gun", training: ["Close Combat"], status: "Ready" }
  ];

  const [personnel, setPersonnel] = useState(() => {
    const savedData = localStorage.getItem("personnelData");
    return savedData ? JSON.parse(savedData) : defaultPersonnel;
  });

  useEffect(() => {
    localStorage.setItem("personnelData", JSON.stringify(personnel));
  }, [personnel]);

  const updateStatus = (id, newStatus) => {
    setPersonnel((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: newStatus } : p))
    );
  };

  const [newPersonnel, setNewPersonnel] = useState({
    name: "",
    rank: "",
    assignedTo: "",
    training: "",
    status: "Ready",
  });

  const addPersonnel = () => {
    if (!newPersonnel.name || !newPersonnel.rank || !newPersonnel.assignedTo) {
      alert("Please fill in all fields.");
      return;
    }

    const newEntry = {
      id: personnel.length + 1,
      ...newPersonnel,
      training: newPersonnel.training.split(",").map((t) => t.trim()),
    };

    setPersonnel([...personnel, newEntry]);
    setNewPersonnel({ name: "", rank: "", assignedTo: "", training: "", status: "Ready" });
  };

  return (
    <div>
      <Navbar /> {/* ✅ Navbar added here */}

      <div className="personnel-container">
        <h2>🪖 Personnel & Deployment Management</h2>

        <div className="add-personnel">
          <input
            type="text"
            placeholder="Name"
            value={newPersonnel.name}
            onChange={(e) => setNewPersonnel({ ...newPersonnel, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Rank"
            value={newPersonnel.rank}
            onChange={(e) => setNewPersonnel({ ...newPersonnel, rank: e.target.value })}
          />
          <input
            type="text"
            placeholder="Assigned To"
            value={newPersonnel.assignedTo}
            onChange={(e) => setNewPersonnel({ ...newPersonnel, assignedTo: e.target.value })}
          />
          <input
            type="text"
            placeholder="Training (comma-separated)"
            value={newPersonnel.training}
            onChange={(e) => setNewPersonnel({ ...newPersonnel, training: e.target.value })}
          />
          <button onClick={addPersonnel}>➕ Add Personnel</button>
        </div>

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Rank</th>
              <th>Assigned To</th>
              <th>Training</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {personnel.map((p) => (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>{p.rank}</td>
                <td>{p.assignedTo}</td>
                <td>{p.training.join(", ")}</td>
                <td>
                  <select value={p.status} onChange={(e) => updateStatus(p.id, e.target.value)}>
                    <option value="Ready">Ready</option>
                    <option value="In Training">In Training</option>
                    <option value="On Leave">On Leave</option>
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

export default Personnel;

