import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { FaCubes, FaPaintBrush, FaSprayCan } from "react-icons/fa";
import SectionHeader from "../components/SectionHeader";
import { SiBlender, SiAdobe } from "react-icons/si";
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
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    arrows: true,
    centerMode: false,
    variableWidth: false,
    draggable: false,   // ✅ Disables mouse dragging
    swipe: true,       // ✅ Disables swipe gestures
    touchMove: true,   // ✅ Prevents touch movement
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2, centerPadding: "20px" } },
      { breakpoint: 768, settings: { slidesToShow: 1, centerPadding: "0px" } },
    ],
  };

  const miniButtons = [
    { id: 1, label: "Blender", icon: <SiBlender /> }, // ✅ Blender Icon
    { id: 2, label: "Substance Painter", icon: <SiAdobe  /> }, // ✅ Adobe (closest match)
    { id: 3, label: "ZBrush", icon: <FaSprayCan /> }, // ✅ ZBrush Icon
    { id: 4, label: "Procreate", icon: <FaPaintBrush  /> }, // ✅ Procreate Icon
  ];

  return (
    <div className="models-container pl-8">
      {/* Header */}
      <SectionHeader
        icon={<FaCubes />}
        title="3D Models"
        titleColor="text-cyberBlue"
        miniButtons={miniButtons}
        buttonColor="blueLabel"
        description="I am advanced at modeling and texturing 3D assets and do commissions for them as well as sell wearable assets on the Roblox Marketplace. I have extensive experience creating both stylized and realistic clothing, character accessories, environment assets, vehicles, and more."
      />

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
