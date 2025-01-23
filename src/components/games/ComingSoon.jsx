import React from "react";
import { FaHourglassHalf } from "react-icons/fa";
import "../../styles/games/tictactoe.css"; // Using TicTacToe styles for consistency

const ComingSoon = () => {
  return (
    <div className="coming-soon-container">
      <FaHourglassHalf className="coming-soon-icon" />
      <p className="coming-soon-text">COMING SOON...</p>
    </div>
  );
};

export default ComingSoon;
