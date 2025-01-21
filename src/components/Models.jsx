import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { FaCubes, FaGlobe, FaShapes, FaStar, FaCamera, FaRobot, FaPaintBrush } from "react-icons/fa";
import ModelViewer from "./ModelViewer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/models/models-carousel.css";
import "../styles/tailwind.css";

const Models = () => {
  const [models, setModels] = useState([]);

  useEffect(() => {
    fetch("/assets/data/models.json") // ✅ Fetch the models.json file
      .then((response) => response.json())
      .then((data) => {
        console.log("✅ Loaded model data:", data);
        setModels(data);
      })
      .catch((error) => console.error("❌ Error fetching models.json:", error));
  }, []);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    arrows: true,
    centerMode: false,
    variableWidth: false,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2, centerPadding: "20px" } },
      { breakpoint: 768, settings: { slidesToShow: 1, centerPadding: "0px" } },
    ],
  };

  // ✅ Mini Button Data (Each with a unique color)
  const miniButtons = [
    { id: 1, label: "Blender", icon: <FaCubes />},
    { id: 2, label: "Substance Painter", icon: <FaPaintBrush />},
    { id: 3, label: "ZBrush", icon: <FaStar />},
    { id: 4, label: "Photography", icon: <FaCamera />},
    { id: 5, label: "AI Models", icon: <FaRobot />},
  ];

  return (
    <div className="models-container">
      {/* Header */}
      <div className="models-header">
        <FaCubes className="models-icon" />
        <h2 className="models-title">3D Models</h2>
      </div>

      {/* Left-Aligned Mini Buttons */}
      <div className="mini-buttons-container flex flex-row gap-4 pl-10">
        {miniButtons.map((btn) => (
          <button key={btn.id} className={`mini-glowing-label`}>
            <span className="mini-label-icon">{btn.icon}</span>
            {btn.label}
          </button>
        ))}
      </div>

      {/* Body Text Below Buttons */}
      <p className="models-body-text">
        Explore a diverse collection of 3D models ranging from sci-fi structures to abstract creations.  
        Each model is meticulously crafted to provide a stunning visual experience.
      </p>

      {/* Carousel */}
      <div className="carousel-wrapper">
        <Slider {...settings} className="models-carousel">
          {models.map((model, index) => (
            <div key={index} className="model-frame">
              <ModelViewer modelPath={model.url} cameraConfig={model.camera} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Models;
