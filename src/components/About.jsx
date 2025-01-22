import React, { useState } from "react";
import {FaArrowRight, FaArrowLeft, FaArrowUp, FaArrowDown, FaGamepad, FaLaughSquint, FaDumbbell, FaHandPeace } from "react-icons/fa";
import SectionHeader from "../components/SectionHeader";
import "../styles/about/about.css";

const About = () => {
  // ✅ Define Image Grid Data
  const aboutImages = [
    { id: 1, src: "/assets/images/about-1.jpg", label: "Modeling" },
    { id: 2, src: "/assets/images/about-2.jpg", label: "Programming" },
    { id: 3, src: "/assets/images/about-3.jpg", label: "Game Dev" },
    { id: 4, src: "/assets/images/about-4.jpg", label: "UI/UX" },
  ];

 // ✅ Mini Labels for Project Categories
    const miniButtons = [
      { id: 1, label: "Fitness", icon: <FaDumbbell /> },
      { id: 2, label: "League of Legends", icon: <FaGamepad /> },
      { id: 3, label: "Memes", icon: <FaLaughSquint /> },
  ];

  // ✅ List of Fun Fact Icons (Randomized for button)
  const arrowIcons = [<FaArrowRight />, <FaArrowLeft />, <FaArrowUp />, <FaArrowDown />];
  const [randomIcon, setRandomIcon] = useState(arrowIcons[0]);

  // ✅ Change Icon on Button Click (Functionality to be added later)
  const handleFunFactClick = () => {
    const randomIndex = Math.floor(Math.random() * arrowIcons.length);
    setRandomIcon(arrowIcons[randomIndex]);
  };

  return (
    <div className="about-container pl-8 pt-8">
      {/* ✅ Section Header */}
      <SectionHeader
        icon={<FaHandPeace />}
        title="About Me"
        titleColor="text-pinkPurple"
        miniButtons={miniButtons}
        buttonColor="pinkLabel"
      />

      {/* ✅ Two-Column Layout */}
      <div className="about-content">
        {/* 🔹 Left: Text Content */}
        <div className="about-text">
          <h3 className="about-subheading">💡 My Journey</h3>
          <p>
            I started programming at a young age, developing small games and websites. Over the years, I’ve gained experience in various disciplines, from software engineering to game design.
          </p>

          <h3 className="about-subheading">🚀 Skills & Interests</h3>
          <ul className="about-list">
            <li>Front-End & Back-End Development</li>
            <li>Game Design & Mechanics</li>
            <li>3D Modeling & Animation</li>
            <li>UI/UX & Cyberpunk Aesthetics</li>
          </ul>
        </div>

        {/* 🔹 Right: Image Grid */}
        <div className="about-image-grid">
          {aboutImages.map((image) => (
            <div key={image.id} className="about-image-card">
              <img src={image.src} alt={image.label} className="about-image" />
              <div className="about-image-label">{image.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ✅ Fun Fact Button */}
      <div className="fun-fact-container">
        <button className="fun-fact-button" onClick={handleFunFactClick}>
          {randomIcon} Get a Random Fun Fact
        </button>
      </div>

      {/* ✅ Centered Section: Image on Left, Text on Right */}
      <div className="about-centered-section">
        <img src="/assets/images/about-feature.jpg" alt="Feature" className="about-feature-image" />
        <div className="about-feature-text">
          <h3 className="about-subheading">🌟 Featured Work</h3>
          <p>
            I’ve worked on various projects in game development, front-end UI, and interactive applications. My goal is to create engaging and futuristic digital experiences.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
