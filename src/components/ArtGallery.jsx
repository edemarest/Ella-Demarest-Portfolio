import React, { useState, useEffect } from "react";
import { FaPaintBrush, FaVectorSquare, FaPenNib } from "react-icons/fa";
import SectionHeader from "../components/SectionHeader";
import "../styles/art/art-gallery.css";

const ArtGallery = () => {
  const [artworks, setArtworks] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);

  useEffect(() => {
    fetch("/assets/data/art.json")
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

  // ✅ Case-insensitive tag filtering
  const filteredArtworks = selectedTag
    ? artworks.filter((art) =>
        art.tags?.some(
          (tag) => tag.toLowerCase() === selectedTag.toLowerCase()
        )
      )
    : artworks;

  return (
    <div className="art-gallery-container">
      <SectionHeader
        icon={<FaPaintBrush />}
        title="Artwork & Design"
        titleColor="text-deepBlue"
        miniButtons={miniButtons}
        buttonColor="purpleLabel"
        description="I have been drawing since I was in elementary school, and picked up digital art very early. I have been selling artwork commissions since I was in 5th grade and steadily increased my skills, prices, and marketing since then. I expanded my expertise into vector art and UI design, animation, painting, and more. While I focus more on programming now and rarely take commissions, I like to sit down and draw on Procreate now and then to destress. I enjoy painting horror-themed pieces and drawing characters from my favorite shows."
        selectedTag={selectedTag} // ✅ Pass filter state to SectionHeader
        setSelectedTag={setSelectedTag}
      />

      {/* ✅ Filtered Artwork Grid */}
      <div className="art-grid">
        {filteredArtworks.map((art, index) => (
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
