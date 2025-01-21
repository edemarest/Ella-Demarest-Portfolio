import React, { useEffect, useState } from "react";
import HeroSection from "../components/HeroSection";
import ProjectsGrid from "../components/ProjectsGrid";
import Models from "../components/Models.jsx";
import ArtGallery from "../components/ArtGallery.jsx";

const Home = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Detect if the device is mobile based on screen width
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkIfMobile(); // Initial check
        window.addEventListener("resize", checkIfMobile); // Update on resize

        return () => window.removeEventListener("resize", checkIfMobile);
    }, []);

    useEffect(() => {
        // Check if there's a stored section ID
        const scrollTo = sessionStorage.getItem("scrollTo");
        if (scrollTo) {
            setTimeout(() => {
                document.getElementById(scrollTo)?.scrollIntoView({ behavior: "smooth" });
                sessionStorage.removeItem("scrollTo");
            }, 100);
        }
    }, []);

    return (
        <div>
            <HeroSection />
            <div id="projects-section">
                <ProjectsGrid />
            </div>
            <div id="models-section">
                {isMobile ? <p>Models section is not available on mobile.</p> : <Models />}
            </div>
            <div id="art-section">
                <ArtGallery />
            </div>
        </div>
    );
};

export default Home;
