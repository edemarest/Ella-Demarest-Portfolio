
import React, { useState } from "react";
import { FaBell } from "react-icons/fa";
import "../styles/site-updates.css"; // ✅ Import the CSS file

const SiteUpdates = () => {
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) return null; // ✅ Prevent rendering when dismissed

    return (
        <div className="site-updates-container">
            {/* 🔔 Header Section */}
            <div className="site-updates-header">
                <FaBell className="site-updates-icon" />
                <h3 className="site-updates-title">Games Page!</h3>
                <button className="dismiss-btn" onClick={() => setIsVisible(false)}>✕</button>
            </div>

            {/* 📌 Body Text */}
            <p className="site-updates-body">
                Exciting changes are coming! Check back soon for new features, performance improvements, and updated visuals.
            </p>
        </div>
    );
};

export default SiteUpdates;
