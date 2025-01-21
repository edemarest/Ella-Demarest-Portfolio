require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { OpenAI } = require("openai");

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY, // Ensure "REACT_APP_" prefix in front-end apps
  });

const findBlockingMove = (board, playerSymbol) => {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]  // Diagonals
    ];

    console.log(`[DEBUG] Checking for a blocking move for ${playerSymbol}...`);
    
    for (let pattern of winPatterns) {
        const values = pattern.map(index => board[index]);
        const emptyIndex = pattern.find(index => board[index] === null);
        const playerCount = values.filter(v => v === playerSymbol).length;
        const emptyCount = values.filter(v => v === null).length;

        console.log(`[DEBUG] Pattern ${pattern} | Values: ${values} | Empty Index: ${emptyIndex} | Player Count: ${playerCount}`);

        if (playerCount === 2 && emptyCount === 1) {
            console.log(`[BLOCK] Found a blocking move at position ${emptyIndex} to prevent loss.`);
            return emptyIndex;
        }
    }

    console.log(`[DEBUG] No blocking move found.`);
    return null;
};

// Converts the board array to ASCII for a better AI prompt
const constructAsciiBoard = (board) => {
    return `
    ${board[0] ?? "0"} | ${board[1] ?? "1"} | ${board[2] ?? "2"}
    --+---+--
    ${board[3] ?? "3"} | ${board[4] ?? "4"} | ${board[5] ?? "5"}
    --+---+--
    ${board[6] ?? "6"} | ${board[7] ?? "7"} | ${board[8] ?? "8"}
    `;
};

app.post("/api/move", async (req, res) => {
    const { board, botSymbol, difficulty } = req.body;
    console.log(`[INFO] Received AI move request | Difficulty: ${difficulty} | Bot: ${botSymbol}`);

    const playerSymbol = botSymbol === "X" ? "O" : "X";
    const emptyIndices = board.map((val, idx) => (val === null ? idx : null)).filter(val => val !== null);

    if (emptyIndices.length === 0) {
        console.warn("[WARNING] No moves left!");
        return res.json({ move: -1 });
    }

    // 🔹 Step 1: Check for Blocking Move
    if (difficulty === "hard" || difficulty === "medium") {
        const blockMove = findBlockingMove(board, playerSymbol);
        if (blockMove !== null) {
            console.log(`[INFO] AI is blocking at position ${blockMove}`);
            return res.json({ move: blockMove });
        }
    }

    if (difficulty === "easy") {
        const randomMove = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
        console.log(`[INFO] Easy Mode | AI Chose Move: ${randomMove}`);
        return res.json({ move: randomMove });
    }

    // 🔹 Step 2: AI OpenAI Request
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

### **How You Must Analyze the Board**
- Scan every **row** (0-1-2, 3-4-5, 6-7-8) for **two '${playerSymbol}' and one empty cell**. If found, **block it immediately**.
- Scan every **column** (0-3-6, 1-4-7, 2-5-8) for **two '${playerSymbol}' and one empty cell**. If found, **block it immediately**.
- Scan both **diagonals** (0-4-8, 2-4-6) for **two '${playerSymbol}' and one empty cell**. If found, **block it immediately**.
- If there are no immediate threats, proceed with the most strategic move.

### **Your Task**
- **First, analyze the board for immediate win/loss scenarios.**
- **Then, return only the index (0-8) of your move and nothing else.**`;

    console.log("[DEBUG] Constructed AI Prompt:");
    console.log(prompt);

    try {
        console.log("[INFO] Sending request to OpenAI...");
        const response = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [{ role: "system", content: prompt }]
        });

        const rawResponse = response.choices[0].message.content.trim();
        console.log(`[DEBUG] AI Raw Response: ${rawResponse}`);

        const moveMatch = rawResponse.match(/\b[0-8]\b/);
        const aiMove = moveMatch ? parseInt(moveMatch[0], 10) : null;

        if (aiMove !== null && emptyIndices.includes(aiMove)) {
            console.log(`[SUCCESS] AI Chose Move: ${aiMove}`);
            return res.json({ move: aiMove });
        } else {
            console.warn(`[WARNING] AI Returned Invalid Move (${aiMove}). Overriding with first available space.`);
            return res.json({ move: emptyIndices[0] });
        }
    } catch (error) {
        console.error("[ERROR] OpenAI API failed:", error);
        return res.json({ move: emptyIndices[0] });
    }
});

const PORT = 5050;
app.listen(PORT, () => console.log(`[SERVER] AI Server running on port ${PORT}`));
