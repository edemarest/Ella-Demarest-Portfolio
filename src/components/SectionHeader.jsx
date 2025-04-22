import React from "react";
import "../styles/sectionheader.css";

const SectionHeader = ({ icon, title, titleColor, miniButtons, buttonColor, description, selectedTag, setSelectedTag }) => {
  return (
    <div className="section-header">
      {/* ✅ Flexbox Title + Icon (Ensures They Stay on the Same Line) */}
      <div className="section-header-title">
        <span className={`section-icon ${titleColor}`}>{icon}</span>
        <span className={`section-title ${titleColor}`}>{title}</span>
      </div>
      <div className="mini-buttons-container">
        {miniButtons.map((btn) => (
          <div
            key={btn.id}
            className={`mini-glowing-label ${buttonColor} ${selectedTag && selectedTag?.toLowerCase() === btn.label.toLowerCase() ? "active-tag" : ""
              } ${!setSelectedTag ? "non-clickable-tag" : ""}`}
            {...(setSelectedTag
              ? {
                onClick: () =>
                  setSelectedTag(
                    selectedTag?.toLowerCase() === btn.label.toLowerCase() ? null : btn.label
                  ),
              }
              : {})}
          >
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
