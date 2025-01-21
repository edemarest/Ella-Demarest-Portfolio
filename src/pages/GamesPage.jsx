import React from "react";
import HeroSection from "../components/HeroSection";
import { FaGamepad } from "react-icons/fa";
import TicTacToe from "../components/games/TicTacToe.jsx";
import ComingSoon from "../components/games/ComingSoon.jsx";
import "../styles/games/games-grid.css"; // Uses existing game styles

const GamesPage = () => {
  return (
    <div>
      <HeroSection />

      <div className="games-container">
        {/* Title with Gamepad Icon */}
        <div className="games-header">
          <FaGamepad className="games-icon" />
          <h2 className="games-title">Games</h2>
        </div>

        {/* Games Grid */}
        <div className="games-grid">
          <TicTacToe />
          <ComingSoon />
          <ComingSoon />
        </div>
      </div>
    </div>
  );
};

export default GamesPage;
