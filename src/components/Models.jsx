import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { FaCubes, FaPaintBrush, FaSprayCan } from "react-icons/fa";
import SectionHeader from "../components/SectionHeader";
import { SiBlender, SiAdobe } from "react-icons/si";
import ModelViewer from "./ModelViewer";
import MobileModelViewer from "./MobileModelViewer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/models/models-carousel.css";
import "../styles/tailwind.css";

const Models = () => {
  const [models, setModels] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedTag, setSelectedTag] = useState(null);
  const filteredModels = selectedTag
    ? models.filter((model) =>
      model.tags?.some(
        (tag) => tag.toLowerCase() === selectedTag.toLowerCase()
      )
    )
    : models;

  useEffect(() => {
    fetch("/assets/data/models.json") // ✅ Fetch models.json
      .then((response) => response.json())
      .then((data) => setModels(data))
      .catch((error) => console.error("❌ Error fetching models.json:", error));
  }, []);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3, // or 4 if your layout fits
    slidesToScroll: 1,
    arrows: true,
    autoplay: false,
    swipe: true,
    touchMove: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };  

  const miniButtons = [
    { id: 1, label: "Blender", icon: <SiBlender /> },
    { id: 2, label: "Substance Painter", icon: <SiAdobe /> },
    { id: 3, label: "ZBrush", icon: <FaSprayCan /> },
    { id: 4, label: "Procreate", icon: <FaPaintBrush /> },
  ];

  return (
    <div className="models-container md:pl-8 sm:pl-0">
      {/* Header */}
      <SectionHeader
        icon={<FaCubes />}
        title="3D Models"
        titleColor="text-cyberBlue"
        miniButtons={miniButtons}
        buttonColor="blueLabel"
        description="I am advanced at modeling and texturing 3D assets and do commissions for them as well as sell wearable assets on the Roblox Marketplace. I have extensive experience creating both stylized and realistic clothing, character accessories, environment assets, vehicles, and more."
        selectedTag={selectedTag}
        setSelectedTag={setSelectedTag}
      />

      {/* Conditional Rendering */}
      {isMobile ? <MobileModelViewer models={filteredModels} /> : (
        <div className="carousel-wrapper">
          {filteredModels.length === 1 ? (
            <div className="single-model-wrapper">
              <div className="model-frame">
                <ModelViewer
                  modelPath={filteredModels[0].url}
                  cameraConfig={filteredModels[0].camera}
                />
              </div>
            </div>
          ) : (
            <Slider {...settings} className="models-carousel">
              {filteredModels.map((model, index) => (
                <div key={index} className="model-frame">
                  <ModelViewer modelPath={model.url} cameraConfig={model.camera} />
                </div>
              ))}
            </Slider>
          )}
        </div>
      )}
    </div>
  );
};

export default Models;
