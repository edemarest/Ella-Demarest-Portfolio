import React, { useState, useEffect } from "react";
import { FaGithub, FaLinkedin, FaCode, FaCubes, FaTwitter, FaDownload, FaPencilRuler, FaGamepad, FaHandPeace } from "react-icons/fa";
import "../styles/hero/main-buttons.css";
import "../styles/hero/mini-buttons.css";
import "../styles/hero/banner.css";

// Scroll to Section Function
const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
        section.scrollIntoView({ behavior: "smooth" });
    }
};

// Debug log function
const logButtonData = () => {
    console.log("Hero Buttons:", heroButtons);
    console.log("Mini Buttons:", miniButtons);
};

// Define Hero Buttons
const heroButtons = [
    { id: 1, label: "Projects", icon: <FaCode />, action: () => scrollToSection("projects-section") },
    { id: 2, label: "3D Models", icon: <FaCubes />, action: () => scrollToSection("models-section") },
    { id: 3, label: "Design", icon: <FaPencilRuler />, link: "/" },
    { id: 4, label: "About Me", icon: <FaHandPeace />, link: "https://twitter.com" },
    { id: 5, label: "Games", icon: <FaGamepad />, link: "/games", special: true },
];

// Define Mini Buttons
const miniButtons = [
    { id: 1, label: "Resume", icon: <FaDownload />, link: "/assets/Ella_Demarest_Resume_2025.pdf", isDownload: true },
    { id: 2, icon: <FaLinkedin />, link: "https://www.linkedin.com/in/ella-demarest-b48553189/" },
    { id: 3, icon: <FaGithub />, link: "https://github.com/edemarest" },
    { id: 4, icon: <FaTwitter />, link: "https://x.com/PhantomMisty" },
];

const HeroSection = () => {
    const [isHovered, setIsHovered] = useState(false);

    // Run debug logs once when the component mounts
    useEffect(() => {
        logButtonData();
    }, []);

    return (
        <div>
            <div
                className="relative min-h-fit w-full flex flex-col md:flex-row justify-between items-center py-10 md:py-12 bg-cover bg-center transition-all duration-[1000ms]"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Static Background Image */}
                <div
                    className="absolute inset-0 w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: "url('/assets/images/hero-static.jpg')" }}
                ></div>

                {/* Video Background (Appears on hover) */}
                <video
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 z-10 ${isHovered ? "opacity-100" : "opacity-0"}`}
                    autoPlay
                    loop
                    muted
                    playsInline
                >
                    <source src="/assets/hero-animated.mp4" type="video/mp4" />
                </video>

                {/* Black Expanding Gradient Overlay */}
                <div className={`absolute inset-0 pointer-events-none transition-all duration-700 z-20 ${isHovered ? "expanded-gradient" : "default-gradient"}`}></div>

                {/* Left Section - Title & Mini Buttons */}
                <div className="mini-button-container flex flex-col items-center md:items-start text-center md:text-left px-4 sm:px-8 z-30">
                    {/* Futuristic Title */}
                    <h1 className="banner-title">Ella Demarest</h1>

                    {/* Subtle Futuristic Subtext */}
                    <p className="banner-subtext">B.S. Computer Science Major, Anticipated Graduation May 2026</p>

                    {/* Mini Buttons */}
                    <div className="flex flex-wrap justify-center md:justify-start gap-2 sm:gap-4">
                        {miniButtons.map((btn) => (
                            <a
                                key={btn.id}
                                href={btn.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={btn.isDownload ? "mini-button resume-button" : "mini-button mini-icon-button"}
                                download={btn.isDownload}
                            >
                                <span className="mini-icon">{btn.icon}</span>
                                {btn.isDownload && btn.label}
                            </a>
                        ))}
                    </div>
                </div>

                {/* Right-Side Hero Buttons */}
                <div className="flex flex-wrap gap-4 md:mt-0 mt-6 px-4 sm:px-8 z-30 place-content-center">
                    {heroButtons.map((btn) => (
                        <button
                            key={btn.id}
                            onClick={btn.action || (() => (window.location.href = btn.link))}
                            className="relative flex items-center group"
                        >
                            <div className={`glowing-button transition-all duration-500 ease-in-out ${btn.special ? "special-glow" : ""}`}>
                                <span className={`button-icon ${btn.special ? "special-icon" : ""}`}>{btn.icon}</span>
                                <span className={`button-text ${btn.special ? "special-text" : ""}`}>{btn.label}</span>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
            <div className="w-full h-[2px] glowing-green mt-4"></div>
        </div>
    );
};

export default HeroSection;
