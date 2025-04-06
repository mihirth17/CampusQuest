import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuthGuard from "../hooks/useAuthGuard";
import "./ApplicationsPage.css";

const ApplicationsPage = () => {
  useAuthGuard(); // 🔐 Session protection

  const [applications, setApplications] = useState([]);
  const username = localStorage.getItem("username");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/applications/${username}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setApplications(res.data);
      } catch (err) {
        alert("❌ Failed to fetch applications");
      }
    };

    fetchApplications();
  }, [username, token]); // ✅ Clean dependency

  return (
    <div className="applications-container">
      <h2>📋 Tracked College Applications</h2>
      {applications.length === 0 ? (
        <p className="empty-msg">No applications tracked yet.</p>
      ) : (
        <div className="app-list">
          {applications.map((app, idx) => (
            <div key={idx} className="app-card">
              <h3>{app.college_name}</h3>
              <p>Status: <strong>{app.status || "Tracked"}</strong></p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ApplicationsPage;
