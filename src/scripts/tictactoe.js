export const checkWinner = (board) => {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]  
    ];

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return { winner: board[a], winningLine: pattern };
        }
    }
    return null;
};

// Calls the backend AI server at port 5050
export const botMove = async (board, botSymbol, difficulty, turn) => {
    console.log(`[DEBUG] Turn ${turn} | Sending AI move request`);

    try {
        const response = await fetch("https://tictactoe-ai.onrender.com/api/move", { // Use Render URL
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ board, botSymbol, difficulty })
        });

        const data = await response.json();
        console.log(`[DEBUG] AI move received: ${data.move}`);
        return data.move;
    } catch (error) {
        console.error("[ERROR] AI move error:", error);
        return -1; 
    }
};
// Handles difficulty switch
export const resetGame = (setBoard, setWinner, setIsBotTurn, setTurn, newDifficulty) => {
    console.log(`[DEBUG] Difficulty changed to: ${newDifficulty} | Resetting game...`);
    setBoard(Array(9).fill(null));
    setWinner(null);
    setIsBotTurn(false);
    setTurn(0);
};
