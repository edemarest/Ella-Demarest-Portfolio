import React from "react";
import "../styles/sectionheader.css";

const SectionHeader = ({ icon, title, titleColor, miniButtons, buttonColor, description }) => {
  return (
    <div className="section-header">
      {/* ✅ Flexbox Title + Icon (Ensures They Stay on the Same Line) */}
      <div className="section-header-title">
        <span className={`section-icon ${titleColor}`}>{icon}</span>
        <span className={`section-title ${titleColor}`}>{title}</span>
      </div>

      {/* ✅ Mini Buttons (Ensures They Are Properly Aligned) */}
      <div className="mini-buttons-container">
        {miniButtons.map((btn) => (
          <div key={btn.id} className={`mini-glowing-label ${buttonColor}`}>
            <span className="mini-label-icon">{btn.icon}</span>
            {btn.label}
          </div>
        ))}
      </div>

      {/* ✅ Render Description Only If Provided */}
      {description && <p className="section-body-text">{description}</p>}
    </div>
  );
};

export default SectionHeader;
