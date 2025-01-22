import React, { useEffect, useState } from "react";
import HeroSection from "../components/HeroSection";
import ProjectsGrid from "../components/ProjectsGrid";
import Models from "../components/Models.jsx";
import ArtGallery from "../components/ArtGallery.jsx";
import About from "../components/About.jsx";
import SiteUpdates from "../components/SiteUpdates.jsx"; // ✅ Import Site Updates
import "../styles/tailwind.css"; // ✅ Import the CSS file

const Home = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [showUpdates, setShowUpdates] = useState(true); // ✅ Control visibility

    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkIfMobile();
        window.addEventListener("resize", checkIfMobile);

        return () => window.removeEventListener("resize", checkIfMobile);
    }, []);

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
                {isMobile ? <p>Models section is not available on mobile.</p> : <Models />}
            </div>
            <div id="art-section">
                <ArtGallery />
            </div>
            <div id="about-section">
                <About />
            </div>
        </div>
    );
};

export default Home;
