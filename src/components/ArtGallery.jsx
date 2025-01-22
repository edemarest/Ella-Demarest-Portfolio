import React, { useState, useEffect } from "react";
import { FaPaintBrush, FaVectorSquare, FaPenNib} from "react-icons/fa";
import SectionHeader from "../components/SectionHeader";
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

  const miniButtons = [
    { id: 1, label: "Digital Art", icon: <FaPaintBrush /> },
    { id: 2, label: "Vector Art", icon: <FaPenNib /> },
    { id: 3, label: "UI Design", icon: <FaVectorSquare /> },
  ];

  return (
    <div className="art-gallery-container">
        <SectionHeader
          icon={<FaPaintBrush />}
          title="Artwork & Design"
          titleColor="text-deepBlue"
          miniButtons={miniButtons}
          buttonColor="purpleLabel"
          description="I am advanced at modeling and texturing 3D assets and do commissions for them as well as sell wearable assets on the Roblox Marketplace. I have extensive experience creating both stylized and realistic clothing, character accessories, environment assets, vehicles, and more."
      />

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

