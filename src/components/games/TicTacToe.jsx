import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSnowflake, faRedo, faGem } from "@fortawesome/free-solid-svg-icons";
import "../../styles/projects/project-card.css";
import "../../styles/games/tictactoe.css";
import { checkWinner, botMove } from "../../scripts/tictactoe";

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isBotTurn, setIsBotTurn] = useState(false);
  const [winner, setWinner] = useState(null);
  const [turn, setTurn] = useState(0);
  const [playerSymbol, setPlayerSymbol] = useState("X"); // ✅ Toggle Player X/O

  useEffect(() => {
    if (!isBotTurn || winner) return;

    setTimeout(async () => {
      const botSymbol = playerSymbol === "X" ? "O" : "X";
      const botIndex = await botMove(board, botSymbol, "hard", turn);
      if (botIndex !== -1) {
        handleMove(botIndex, botSymbol);
      }
    }, 1500);
  }, [isBotTurn, winner, board, playerSymbol, turn]); // ✅ Fixes missing dependencies

  useEffect(() => {
    const result = checkWinner(board);
    if (result) {
      console.log(`[INFO] Game Over: ${result.winner} wins!`);
      setWinner(result);
      setTimeout(clearBoard, 2000); // ✅ Fix: Resets board on win
      return;
    }
    if (board.every(cell => cell !== null)) {
      console.log("[INFO] Game Over: Draw!");
      setWinner({ winner: "Draw" });
      setTimeout(clearBoard, 2000); // ✅ Fix: Resets board on draw
    }
  }, [board]);

  const handleMove = (index, player) => {
    if (!board[index] && !winner) {
      const newBoard = [...board];
      newBoard[index] = player;
      setBoard(newBoard);
      setTurn(turn + 1);
      
      console.log(`[MOVE] Player ${player} moved to index ${index}`);

      const result = checkWinner(newBoard);
      if (result) {
        console.log(`[INFO] Winner Detected: ${result.winner}`);
        setWinner(result);
        return;
      }

      setIsBotTurn(!isBotTurn);
    }
  };

  const handleSquareClick = (index) => {
    if (!isBotTurn && !board[index] && !winner) {
      handleMove(index, playerSymbol);
      setIsBotTurn(true);
    }
  };

  const clearBoard = () => {
    console.log("[RESET] Board Cleared.");
    setBoard(Array(9).fill(null));
    setWinner(null);
    setIsBotTurn(playerSymbol === "O");
    setTurn(0);
  };

  const togglePlayerSymbol = () => {
    const newSymbol = playerSymbol === "X" ? "O" : "X";
    console.log(`[TOGGLE] Player Symbol Changed: Now Playing as ${newSymbol}`);
    setPlayerSymbol(newSymbol);
    clearBoard();
  };

  return (
    <div className="project-card">
      <h2 className="project-title text-center">Tic-Tac-Toe</h2>

      {/* Status Message */}
      <div className={`status-message ${winner ? winner.winner === "Draw" ? "draw" : winner.winner === playerSymbol ? "win" : "lose" : isBotTurn ? "thinking" : ""}`}>
        {winner ? (winner.winner === "Draw" ? "It's a draw!" : winner.winner === playerSymbol ? "You win!" : "You lose!") : isBotTurn ? "Thinking..." : `Your Turn`}
      </div>

      {/* Tic-Tac-Toe Board */}
      <div className="tictactoe-board">
        {board.map((cell, index) => (
          <div 
            key={index} 
            className={`tictactoe-cell ${winner?.winningLine?.includes(index) ? "winning-cell" : ""}`} 
            onClick={() => handleSquareClick(index)}
          >
            {cell === "X" && <FontAwesomeIcon icon={faGem} className="icon-x" />}
            {cell === "O" && <FontAwesomeIcon icon={faSnowflake} className="icon-o" />}
          </div>
        ))}
      </div>

      {/* Button Container (Aligns Buttons to the Right) */}
      <div className="button-container">
        {/* Toggle Player Symbol Button */}
        <button className="circle-button" onClick={togglePlayerSymbol}>
          <FontAwesomeIcon icon={playerSymbol === "X" ? faGem : faSnowflake} className="player-icon" />
        </button>

        {/* Reset Board Button */}
        <button className="circle-button" onClick={clearBoard}>
          <FontAwesomeIcon icon={faRedo} className="reset-icon" />
        </button>
      </div>
    </div>
  );
};

export default TicTacToe;
