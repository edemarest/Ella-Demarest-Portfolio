import React from "react";
import HeroSection from "../components/HeroSection";
import ProjectsGrid from "../components/ProjectsGrid";
import Models from "../components/Models.jsx";
import { useEffect } from "react";
import ArtGallery from "../components/ArtGallery.jsx";

const Home = () => {
    useEffect(() => {
        // Check if there's a stored section ID
        const scrollTo = sessionStorage.getItem("scrollTo");
        if (scrollTo) {
            // Scroll to the section and remove from storage
            setTimeout(() => {
                document.getElementById(scrollTo)?.scrollIntoView({ behavior: "smooth" });
                sessionStorage.removeItem("scrollTo");
            }, 100); // Small delay to ensure page is fully loaded
        }
    }, []);

    return (
        <div>
            <HeroSection />
            <div id="projects-section">
                <ProjectsGrid />
            </div>
            <div id="models-section">
                <Models />
            </div>
            <div id="art-section">
                <ArtGallery />
            </div>
        </div>
    );
};

export default Home;
