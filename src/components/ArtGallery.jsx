import React, { useState, useEffect } from "react";
import "../styles/art/art-gallery.css";

const ArtGallery = () => {
  const [artworks, setArtworks] = useState([]);

  useEffect(() => {
    fetch("/assets/data/art.json") // ✅ Fetch artworks from a JSON file
      .then((response) => response.json())
      .then((data) => {
        console.log("✅ Loaded art data:", data);
        setArtworks(data);
      })
      .catch((error) => console.error("❌ Error fetching art.json:", error));
  }, []);

  return (
    <div className="art-gallery-container">
      {/* Title */}
      <div className="art-gallery-header">
        <h2 className="art-title">My Artworks</h2>
      </div>

      {/* Artwork Grid */}
      <div className="art-grid">
        {artworks.map((art, index) => (
          <div key={index} className={`art-frame tilt-${index % 3}`}>
            <div className="art-tape tape-top"></div>
            <div className="art-tape tape-bottom"></div>
            <img src={art.url} alt={art.title} className="art-image" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArtGallery;
