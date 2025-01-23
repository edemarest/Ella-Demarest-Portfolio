import React, { useState, useRef, useEffect } from "react";
import { FaRedo, FaDumbbell, FaGamepad, FaLaughSquint, FaHandPeace, FaShower } from "react-icons/fa";
import SectionHeader from "../components/SectionHeader";
import "../styles/about/about.css";

const About = () => {
  // ✅ Image Grid Data
  const aboutImages = [
    { id: 1, src: "/assets/images/me.jpg", label: "Me" },
    { id: 2, src: "/assets/images/ember.jpg", label: "Ember" },
    { id: 3, src: "/assets/images/walter.jpg", label: "Walter" },
    { id: 4, src: "/assets/images/misty-and-sandy.jpg", label: "Misty & Sandy" },
  ];

  // ✅ Mini Labels for Interests
  const miniButtons = [
    { id: 1, label: "Fitness", icon: <FaDumbbell /> },
    { id: 2, label: "Pokemon Go", icon: <FaGamepad /> },
    { id: 3, label: "Memes", icon: <FaLaughSquint /> },
    { id: 4, label: "League of Legends", icon: <FaShower /> }
  ];

  // ✅ Fun Fact Data
  const funFacts = [
    { img: "/assets/images/funfacts/death-note.png", text: "My favorite animes are Attack on Titan and Death Note."},
    { img: "/assets/images/funfacts/pfizer.png", text: "I was in a clinical trial for the Pfizer COVID-19 vaccine." },
    { img: "/assets/images/funfacts/frog.png", text: "I have over a dozen tree frogs and dart frogs back home." },
    { img: "/assets/images/funfacts/rdc.webp", text: "I attended the Roblox Developer Conference in 2020 (virtual)." },
    { img: "/assets/images/funfacts/pogo.webp", text: "I walk 60+ kilometers per week playing Pokemon Go, am level 50, and play with a group in Cambridge every week!" },
    { img: "/assets/images/funfacts/volleyball.png", text: "I used to play competitive indoor & beach volleyball but only play for fun now." },
    { img: "/assets/images/funfacts/silicon-valley.png", text: "My favorite TV show is Silicon Valley." },
    { img: "/assets/images/funfacts/croagunk.png", text: "My favorite pokemon is Croagunk." },
    { img: "/assets/images/funfacts/skyrim.png", text: "I have hundreds of hours on Skyrim and am (im)patiently waiting for Elder Scrolls VI." }  ];

  // ✅ State for Fun Fact Display
  const [currentFunFact, setCurrentFunFact] = useState(funFacts[0]);

  // ✅ Function to Pick a Random Fun Fact
  const handleFunFactClick = () => {
    const randomFact = funFacts[Math.floor(Math.random() * funFacts.length)];
    setCurrentFunFact(randomFact);
  };

  // ✅ Dynamically Match Heights of Both Sections
  const leftSectionRef = useRef(null);
  const rightSectionRef = useRef(null);

  useEffect(() => {
    const updateHeights = () => {
      if (leftSectionRef.current && rightSectionRef.current) {
        rightSectionRef.current.style.height = `${leftSectionRef.current.offsetHeight}px`;
      }
    };

    updateHeights();
    window.addEventListener("resize", updateHeights);
    
    return () => window.removeEventListener("resize", updateHeights);
  }, []);

  return (
    <div className="about-container md:pl-8 sm:pl-0 pt-8">
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
        <div className="about-text" ref={leftSectionRef}>
          <h3 className="about-subheading">Hello!</h3>
          <p className="pb-2">I'm Ella! Though I've studied and worked all over the place the last few years, I am originally from San Diego, California.</p>
          <p className="pb-2">Ever since I was young, I've always been interested in making things, and that is just as true for me now.
            I absolutely love working on projects and seeing them through from start to end. My favorite days are ones where I can sit down and grind from morning to night with some music or a podcast and not think about anything else. That's what I did with this site, for example.
          </p>
          <p className="pb-2">
            Even though many of my interests involve sitting down at a computer, I spend a whole lot of time outside. I try to walk everywhere not just to get extra steps in,
            but because I play Pokemon Go. The app motivates me to go on a new adventure every weekend and walk to campus or work instead of taking the Boston T whenever the weather allows!
          </p>
          <p className="pb-2">I also take health and fitness very seriously; I work out 6 days a week and try to fit as much protein as possible into my day. Because of this, I always look forward to picking a brand new (or old favorite) dessert every Saturday. My current favorite is the edible cookie dough at Little Miss Cupcape.
          </p>
          <h3 className="about-subheading">Work Experience</h3>
          <ul className="about-list">
            <li>Digital Developer at Vue Health (Spring 2024)</li>
            <li>Research Assistant at IoT Innovation Labs</li>
            <li>UI Design & 3D Asset Contractor for Roblox Developers (2017-present)</li>
            <li>Upcoming intern at Regeneron in the Development Services & Operational Excellence Department (Summer 2025)</li>
          </ul>

          {/* ✅ Fun Fact Section */}
          <div className="fun-fact-container">
            <span className="fun-fact-text" onClick={handleFunFactClick}>
              <FaRedo className="fun-fact-icon" /> Generate a Fun Fact
            </span>

            <div className="fun-fact-display">
              <img src={currentFunFact.img} alt="Fun Fact" className="fun-fact-image" />
              <p className="fun-fact-description">{currentFunFact.text}</p>
            </div>
          </div>
        </div>

        {/* 🔹 Right: Image Grid (Scales Based on Left Section) */}
        <div className="about-image-grid" ref={rightSectionRef}>
          {aboutImages.map((image) => (
            <div key={image.id} className="about-image-card">
              <img src={image.src} alt={image.label} className="about-image" />
              <div className="about-image-label">{image.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;