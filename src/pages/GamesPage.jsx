import React from "react";
import HeroSection from "../components/HeroSection";
import { FaGamepad} from "react-icons/fa";
import { SiOpenai, SiRender } from "react-icons/si";
import TicTacToe from "../components/games/TicTacToe.jsx";
import ComingSoon from "../components/games/ComingSoon.jsx";
import Footer from "../components/Footer.jsx";
import "../styles/games/games-grid.css"; // Uses existing game styles
import SectionHeader from "../components/SectionHeader";

  const miniButtons = [
    { id: 1, label: "OpenAi API", icon: <SiOpenai /> },
    { id: 2, label: "Render Hosted Backend", icon: <SiRender /> },
  ];

const GamesPage = () => {
  return (
    <div>
      <HeroSection />
      <div className="games-container">
        <SectionHeader
          icon={<FaGamepad />}
          title="Games"
          titleColor="text-neonCyan"
          miniButtons={miniButtons}
          buttonColor="greenLabel"
          description="See if you can win against an intelligent AI. Tic Tac Toe is the only game available, but more are coming soon!"
        />

        {/* Games Grid */}
        <div className="games-grid">
          <TicTacToe />
          <ComingSoon />
          <ComingSoon />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default GamesPage;
