const API_URL = "https://ella-demarest-portfolio.onrender.com/api/move"; 

// ✅ Function to Check Winner
export const checkWinner = (board) => {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]  
    ];

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            console.log(`[INFO] Winner Found: ${board[a]} | Winning Line: ${pattern}`);
            return { winner: board[a], winningLine: pattern };
        }
    }
    return null;
};

// ✅ Function to Fetch AI Move
export const botMove = async (board, botSymbol, difficulty, turn) => {
    console.log(`[DEBUG] Turn ${turn} | AI Request Sent`);

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ board, botSymbol, difficulty })
        });

        if (!response.ok) {
            throw new Error(`Server responded with status: ${response.status}`);
        }

        const data = await response.json();
        console.log(`[DEBUG] AI Move Received: ${data.move}`);
        return data.move ?? -1;
    } catch (error) {
        console.error("[ERROR] AI Move Error:", error);
        return -1;
    }
};

// ✅ Handles Player Moves & Ensures Immediate Bot Response
export const handleMove = async (index, board, player, setBoard, setTurn, setIsBotTurn, setWinner, playerSymbol, turn) => {
    if (!board[index] && !checkWinner(board)) {
        console.log(`[MOVE] Player ${player} moved to index ${index}`);

        setBoard((prevBoard) => {
            const newBoard = [...prevBoard];
            newBoard[index] = player;
            return newBoard;
        });

        const updatedTurn = turn + 1;
        setTurn(updatedTurn);

        const winnerCheck = checkWinner([...board.slice(0, index), player, ...board.slice(index + 1)]);
        if (winnerCheck) {
            setWinner(winnerCheck);
            console.log(`[INFO] Winner Detected: ${winnerCheck.winner}`);
            return;
        }

        // ✅ Trigger AI Move After Player Move
        if (player === playerSymbol) {
            setIsBotTurn(true);
            setTimeout(async () => {
                const botSymbol = playerSymbol === "X" ? "O" : "X";
                const botIndex = await botMove([...board.slice(0, index), player, ...board.slice(index + 1)], botSymbol, "hard", updatedTurn);
                
                if (botIndex !== -1) {
                    setBoard((prevBoard) => {
                        const newBoard = [...prevBoard];
                        newBoard[botIndex] = botSymbol;
                        return newBoard;
                    });

                    console.log(`[MOVE] AI (${botSymbol}) moved to index ${botIndex}`);

                    const botWinnerCheck = checkWinner([...board.slice(0, botIndex), botSymbol, ...board.slice(botIndex + 1)]);
                    if (botWinnerCheck) {
                        setWinner(botWinnerCheck);
                        console.log(`[INFO] AI Wins: ${botWinnerCheck.winner}`);
                    }
                }

                setIsBotTurn(false);
            }, 500);
        }
    }
};

// ✅ Reset Game Function (Includes Debug Logging)
export const resetGame = (setBoard, setWinner, setIsBotTurn, setTurn, newDifficulty) => {
    console.log(`[DEBUG] Difficulty set to: ${newDifficulty} | Resetting game...`);
    setBoard(Array(9).fill(null));
    setWinner(null);
    setIsBotTurn(false);
    setTurn(0);
};
