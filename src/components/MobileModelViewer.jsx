import React from "react";
import "../styles/models/mobilemodelviewer.css";

const MobileModelViewer = ({ models }) => {
  return (
    <div className="mobile-models-grid sm:mx-2">
      {models.map((model, index) => (
        <div key={index} className="mobile-model-frame">
          <img src={model.thumbnail} alt={model.name} className="mobile-model-image" />
        </div>
      ))}
    </div>
  );
};

export default MobileModelViewer;
