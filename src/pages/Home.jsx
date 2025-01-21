import React from "react";
import HeroSection from "../components/HeroSection";
import ProjectsGrid from "../components/ProjectsGrid";
import Models from "../components/Models.jsx";

const Home = () => {
  return (
    <div>
      <HeroSection />
      {/* 🔥 Anchor for Projects Section */}
      <div id="projects-section">
        <ProjectsGrid />
      </div>
      
      {/* 🔥 Anchor for 3D Models Section */}
      <div id="models-section">
        <Models />
      </div>
    </div>
  );
};

export default Home;
