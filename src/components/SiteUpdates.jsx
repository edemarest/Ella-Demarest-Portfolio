import React, { useState, useEffect } from "react";
import { FaBell } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // ✅ Import React Router navigation
import "../styles/site-updates.css"; // ✅ Import the CSS file

const SiteUpdates = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [updateData, setUpdateData] = useState(null);
    const navigate = useNavigate(); // ✅ Use React Router for navigation

    // ✅ Load JSON data
    useEffect(() => {
        fetch("/assets/data/site-updates.json") // Adjust the path if needed
            .then((response) => response.json())
            .then((data) => setUpdateData(data))
            .catch((error) => console.error("❌ Error loading site updates:", error));
    }, []);

    if (!isVisible || !updateData) return null; // ✅ Prevent rendering when dismissed or data missing

    return (
        <div className="site-updates-container" onClick={() => navigate("/games")}> {/* ✅ Use navigate() */}
            {/* 🔔 Header Section */}
            <div className="site-updates-header">
                <FaBell className="site-updates-icon" />
                <h3 className="site-updates-title">{updateData.title}</h3>
                <button className="dismiss-btn" onClick={(e) => { 
                    e.stopPropagation(); // ✅ Prevents click from triggering navigation
                    setIsVisible(false); 
                }}>
                    ✕
                </button>
            </div>

            {/* 📌 Body Text */}
            <p className="site-updates-body">{updateData.message}</p>
        </div>
    );
};

export default SiteUpdates;
