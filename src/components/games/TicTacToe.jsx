import React, { useState, useEffect, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSnowflake, faRedo, faGem } from "@fortawesome/free-solid-svg-icons";
import "../../styles/projects/project-card.css";
import "../../styles/games/tictactoe.css";
import { checkWinner } from "../../scripts/tictactoe";

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isBotTurn, setIsBotTurn] = useState(false);
  const [winner, setWinner] = useState(null);
  const [turn, setTurn] = useState(0);
  const [playerSymbol, setPlayerSymbol] = useState("X"); // ✅ Toggle Player X/O

  // ✅ Clear Board Function
  const clearBoard = useCallback(() => {
    console.log("[RESET] Board Cleared.");
    setBoard(Array(9).fill(null));
    setWinner(null);
    setIsBotTurn(playerSymbol === "O");
    setTurn(0);
  }, [playerSymbol]);

  // ✅ Bot Move Function (Calls Render Backend)
  const fetchBotMove = async (currentBoard, botSymbol, difficulty, currentTurn) => {
    try {
      const response = await fetch("https://ella-demarest-portfolio.onrender.com/api/move", { // ✅ Render backend URL
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ board: currentBoard, botSymbol, difficulty }),
      });

      const data = await response.json();
      console.log(`[DEBUG] AI Move Received: ${data.move}`);
      return data.move ?? -1;
    } catch (error) {
      console.error("[ERROR] AI move error:", error);
      return -1;
    }
  };

  // ✅ Handle Move Function
  const handleMove = useCallback(
    (index, player) => {
      if (!board[index] && !winner) {
        setBoard((prevBoard) => {
          const newBoard = [...prevBoard];
          newBoard[index] = player;

          const result = checkWinner(newBoard);
          if (result) {
            console.log(`[INFO] Winner Detected: ${result.winner}`);
            setWinner(result);
          }

          return newBoard;
        });

        setTurn((prevTurn) => prevTurn + 1);
        console.log(`[MOVE] Player ${player} moved to index ${index}`);

        setIsBotTurn(true); // ✅ Hand over turn to bot
      }
    },
    [board, winner]
  );

  // ✅ Effect for bot move
  useEffect(() => {
    if (!isBotTurn || winner) return;

    const makeBotMove = async () => {
      const botSymbol = playerSymbol === "X" ? "O" : "X";
      const botIndex = await fetchBotMove(board, botSymbol, "hard", turn);
      if (botIndex !== -1) {
        handleMove(botIndex, botSymbol);
      }
      setIsBotTurn(false);
    };

    setTimeout(makeBotMove, 1500);
  }, [isBotTurn, winner, board, playerSymbol, turn, handleMove]);

  // ✅ Effect for checking winner
  useEffect(() => {
    const result = checkWinner(board);
    if (result) {
      console.log(`[INFO] Game Over: ${result.winner} wins!`);
      setWinner(result);
      setTimeout(clearBoard, 2000);
    } else if (board.every((cell) => cell !== null)) {
      console.log("[INFO] Game Over: Draw!");
      setWinner({ winner: "Draw" });
      setTimeout(clearBoard, 2000);
    }
  }, [board, clearBoard]);

  const handleSquareClick = (index) => {
    if (!isBotTurn && !board[index] && !winner) {
      handleMove(index, playerSymbol);
    }
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
      <div
        className={`status-message ${
          winner
            ? winner.winner === "Draw"
              ? "draw"
              : winner.winner === playerSymbol
              ? "win"
              : "lose"
            : isBotTurn
            ? "thinking"
            : ""
        }`}
      >
        {winner
          ? winner.winner === "Draw"
            ? "It's a draw!"
            : winner.winner === playerSymbol
            ? "You win!"
            : "You lose!"
          : isBotTurn
          ? "Thinking..."
          : `Your Turn`}
      </div>

      {/* Tic-Tac-Toe Board */}
      <div className="tictactoe-board">
        {board.map((cell, index) => (
          <div
            key={index}
            className={`tictactoe-cell ${
              winner?.winningLine?.includes(index) ? "winning-cell" : ""
            }`}
            onClick={() => handleSquareClick(index)}
          >
            {cell === "X" && <FontAwesomeIcon icon={faGem} className="icon-x" />}
            {cell === "O" && (
              <FontAwesomeIcon icon={faSnowflake} className="icon-o" />
            )}
          </div>
        ))}
      </div>

      {/* Button Container */}
      <div className="button-container">
        {/* Toggle Player Symbol Button */}
        <button className="circle-button" onClick={togglePlayerSymbol}>
          <FontAwesomeIcon
            icon={playerSymbol === "X" ? faGem : faSnowflake}
            className="player-icon"
          />
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
