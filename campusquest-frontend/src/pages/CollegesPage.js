import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import useAuthGuard from "../hooks/useAuthGuard";
import "./CollegesPage.css";

const streams = ["Any", "Science", "Commerce", "Arts"];
const courses = ["Any", "B.Tech", "MBA", "B.Com", "B.Sc", "BA", "MBBS", "LLB", "BA LLB", "BBA", "BCA"];

const CollegesPage = () => {
  useAuthGuard();

  const [colleges, setColleges] = useState([]);
  const [score, setScore] = useState("");
  const [percentage, setPercentage] = useState("");
  const [stream, setStream] = useState("Any");
  const [course, setCourse] = useState("Any");
  const [loading, setLoading] = useState(false);
  const [appliedLoading, setAppliedLoading] = useState(false);
  const [applied, setApplied] = useState([]);

  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  const API_BASE = process.env.REACT_APP_API_BASE_URL;

  // ✅ Fetch previously applied colleges
  const fetchApplied = useCallback(async () => {
    setAppliedLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/applications/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const appliedList = res.data.map((a) => a.college_name);
      setApplied(appliedList);
    } catch (err) {
      if (err.response?.status !== 404) {
        toast.error("❌ Failed to fetch applied colleges.");
      }
      setApplied([]);
    } finally {
      setAppliedLoading(false);
    }
  }, [username, token, API_BASE]);

  // ✅ Fetch colleges based on filters
  const fetchColleges = useCallback(async () => {
    const scoreInt = parseInt(score);
    const percentageFloat = parseFloat(percentage);

    if (scoreInt > 15 || percentageFloat > 100) {
      toast.warn("⚠️ Score or percentage exceeds the allowed maximum.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE}/colleges`, {
        params: {
          score: scoreInt,
          percentage: percentageFloat,
          stream,
          course,
        },
        headers: { Authorization: `Bearer ${token}` },
      });
      setColleges(res.data);
    } catch {
      toast.error("❌ Failed to fetch colleges.");
    } finally {
      setLoading(false);
    }
  }, [score, percentage, stream, course, token, API_BASE]);

  // ✅ Track applied college
  const handleApply = async (collegeName) => {
    try {
      await axios.post(
        `${API_BASE}/apply`,
        { username, college_name: collegeName },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setApplied([...applied, collegeName]);
      toast.success("✅ Application tracked successfully!");
    } catch {
      toast.error("❌ Failed to track application.");
    }
  };

  useEffect(() => {
    fetchApplied();
  }, [fetchApplied]);

  useEffect(() => {
    setColleges([]);
  }, [score, percentage, stream, course]);

  return (
    <div className="college-page">
      <h2>College Recommendations</h2>
      <p className="track-note">
        Note: This is for your tracking only. You must apply officially on the college website.
      </p>

      <div className="filter-box">
        <input
          type="number"
          placeholder="Aptitude Score (0-15)"
          max={15}
          value={score}
          onChange={(e) => setScore(e.target.value)}
        />
        <input
          type="number"
          placeholder="12th Percentage (0-100)"
          max={100}
          value={percentage}
          onChange={(e) => setPercentage(e.target.value)}
        />
        <select value={stream} onChange={(e) => setStream(e.target.value)}>
          {streams.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
        <select value={course} onChange={(e) => setCourse(e.target.value)}>
          {courses.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <button onClick={fetchColleges} disabled={!score || !percentage}>
          Search Colleges
        </button>
      </div>

      <p className="filter-hint">
        🎯 Tip: Aptitude Score must be between 0-15 and Percentage between 0-100.
      </p>

      {loading || appliedLoading ? (
        <p>Loading colleges...</p>
      ) : colleges.length > 0 ? (
        <>
          <p className="college-count">{colleges.length} colleges found</p>
          <div className="college-list">
            {colleges.map((c, idx) => (
              <div key={idx} className="college-card">
                <h3>{c.college_name}</h3>
                <p>Stream: {c.stream} | Course: {c.preferred_course}</p>
                <p>Required Score: {c.required_score} | Entrance: {c.entrance_exam}</p>
                <p>12th % Required: {c.percentage_required}</p>
                <p>Location: {c.location}</p>
                <p>Fees: {c.estimated_fees}</p>
                <p>Contact: {c.contact_info}</p>
                <a href={c.website} target="_blank" rel="noreferrer">
                  Visit Website
                </a>
                <button
                  className="apply-btn"
                  onClick={() => handleApply(c.college_name)}
                  disabled={applied.includes(c.college_name)}
                >
                  {applied.includes(c.college_name) ? "Applied" : "Apply"}
                </button>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p>No colleges found</p>
      )}
    </div>
  );
};

export default CollegesPage;
