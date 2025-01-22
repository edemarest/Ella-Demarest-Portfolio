const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { OpenAI } = require("openai");

dotenv.config(); // Load .env variables

const app = express();
const PORT = process.env.PORT || 5050;

app.use(cors()); // ✅ Allow cross-origin requests (for Netlify Frontend)
app.use(express.json()); // ✅ Parse JSON requests

const openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY, // ✅ Render's ENV variable
});

// ✅ Function to find blocking move
const findBlockingMove = (board, playerSymbol) => {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]
    ];

    for (let pattern of winPatterns) {
        const values = pattern.map(index => board[index]);
        const emptyIndex = pattern.find(index => board[index] === null);
        const playerCount = values.filter(v => v === playerSymbol).length;
        const emptyCount = values.filter(v => v === null).length;

        if (playerCount === 2 && emptyCount === 1) {
            return emptyIndex;
        }
    }
    return null;
};

// ✅ Function to construct ASCII board for OpenAI
const constructAsciiBoard = (board) => {
    return `
    ${board[0] ?? "0"} | ${board[1] ?? "1"} | ${board[2] ?? "2"}
    --+---+--
    ${board[3] ?? "3"} | ${board[4] ?? "4"} | ${board[5] ?? "5"}
    --+---+--
    ${board[6] ?? "6"} | ${board[7] ?? "7"} | ${board[8] ?? "8"}
    `;
};

// ✅ API Route for AI Move
app.post("/api/move", async (req, res) => {
    const { board, botSymbol, difficulty } = req.body;
    const playerSymbol = botSymbol === "X" ? "O" : "X";
    const emptyIndices = board.map((val, idx) => (val === null ? idx : null)).filter(val => val !== null);

    if (emptyIndices.length === 0) return res.json({ move: -1 });

    // Block opponent if possible
    if (difficulty === "hard" || difficulty === "medium") {
        const blockMove = findBlockingMove(board, playerSymbol);
        if (blockMove !== null) return res.json({ move: blockMove });
    }

    // Easy mode: Random move
    if (difficulty === "easy") {
        const randomMove = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
        return res.json({ move: randomMove });
    }

    // GPT-4 Strategy (Hard Mode)
    const asciiBoard = constructAsciiBoard(board);
    const prompt = `
You are an **advanced Tic-Tac-Toe AI** playing as '${botSymbol}'. Here is the **current board state**:

${asciiBoard}

### **Rules for Making a Move**
1️⃣ **FIRST PRIORITY:** If you have a move that **immediately wins the game**, take it **NOW**.
2️⃣ **SECOND PRIORITY:** **Check all rows, columns, and diagonals.** If the opponent '${playerSymbol}' has two marks in any line with one empty cell, **BLOCK THAT CELL IMMEDIATELY**.
3️⃣ **THIRD PRIORITY:** If no immediate win/loss prevention is needed, **choose the most strategic move to control the board**.
4️⃣ The board is a **3x3 grid**, labeled from **0-8** (top-left to bottom-right).
5️⃣ **DO NOT LOSE. CHECK EVERY WINNING LINE BEFORE MOVING.**
6️⃣ **DO NOT IGNORE A WINNING MOVE OR A REQUIRED BLOCK.**
7️⃣ **Return only the index (0-8) of your move and nothing else.** No explanations.

### **Your Task**
- **First, analyze the board for immediate win/loss scenarios.**
- **Then, return only the index (0-8) of your move and nothing else.**`;

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [{ role: "system", content: prompt }]
        });

        const rawResponse = response.choices[0].message.content.trim();
        const moveMatch = rawResponse.match(/\b[0-8]\b/);
        const aiMove = moveMatch ? parseInt(moveMatch[0], 10) : null;

        return res.json({ move: aiMove ?? emptyIndices[0] });
    } catch (error) {
        return res.status(500).json({ error: "AI API failed", move: emptyIndices[0] });
    }
});

// ✅ Start Server
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
