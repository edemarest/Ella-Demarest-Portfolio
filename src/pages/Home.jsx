import React, { useEffect, useState } from "react";
import HeroSection from "../components/HeroSection";
import ProjectsGrid from "../components/ProjectsGrid";
import Models from "../components/Models.jsx";
import ArtGallery from "../components/ArtGallery.jsx";
import About from "../components/About.jsx";
import SiteUpdates from "../components/SiteUpdates.jsx"; // ✅ Import Site Updates
import "../styles/tailwind.css"; // ✅ Import the CSS file
import Footer from "../components/Footer";

const Home = () => {
    const [showUpdates] = useState(true); // ✅ Control visibility

    useEffect(() => {
        const scrollTo = sessionStorage.getItem("scrollTo");
        if (scrollTo) {
            setTimeout(() => {
                document.getElementById(scrollTo)?.scrollIntoView({ behavior: "smooth" });
                sessionStorage.removeItem("scrollTo");
            }, 100);
        }
    }, []);

    return (
        <div className="relative">
            {/* ✅ Hero Section (No Background) */}
            <HeroSection />

            {/* ✅ Site Updates (Only Show if Not Dismissed) */}
            {showUpdates && <SiteUpdates />}

            {/* ✅ Content Sections */}
            <div id="projects-section">
                <ProjectsGrid />
            </div>
            <div id="models-section">
                <Models />
            </div>
            <div id="design-section">
                <ArtGallery />
            </div>
            <div id="about-section">
                <About />
            </div>
            <Footer />
        </div>
    );
};

export default Home;
