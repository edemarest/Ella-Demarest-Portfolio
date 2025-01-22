require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { OpenAI } = require("openai");

const app = express();
const PORT = process.env.PORT || 10000; // ✅ Render dynamically assigns the PORT

app.use(express.json()); // ✅ Ensure JSON body is parsed correctly

// ✅ Global CORS Middleware (Ensures headers are set on all responses)
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "https://ellademarestportfolio.netlify.app");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");

    // ✅ Handle OPTIONS requests immediately
    if (req.method === "OPTIONS") {
        return res.sendStatus(204);
    }
    
    next();
});

// ✅ Start Server
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});

// ✅ Root Route (Check If Server is Running)
app.get("/", (req, res) => {
    res.send("✅ Tic-Tac-Toe AI Server is running!");
});

// ✅ Explicitly Reject GET Requests to /api/move
app.get("/api/move", (req, res) => {
    res.status(405).send("Method Not Allowed. Use POST instead.");
});

// ✅ Initialize OpenAI Client
if (!process.env.OPENAI_API_KEY) {
    console.error("[ERROR] OPENAI_API_KEY is missing!");
    process.exit(1); // ✅ Stop server if API key is missing
}

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// ✅ Construct ASCII board for OpenAI
const constructAsciiBoard = (board) => `
    ${board[0] ?? "0"} | ${board[1] ?? "1"} | ${board[2] ?? "2"}
    --+---+--
    ${board[3] ?? "3"} | ${board[4] ?? "4"} | ${board[5] ?? "5"}
    --+---+--
    ${board[6] ?? "6"} | ${board[7] ?? "7"} | ${board[8] ?? "8"}
`;

app.post("/api/move", async (req, res) => {
    // 🔹 Force CORS Headers on the Actual Response
    res.setHeader("Access-Control-Allow-Origin", "https://ellademarestportfolio.netlify.app");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Credentials", "true");

    try {
        console.log("[DEBUG] Request received:", req.body);

        const { board, botSymbol, difficulty } = req.body;
        if (!board || !botSymbol || !difficulty) {
            return res.status(400).json({ error: "Missing required parameters" });
        }

        const playerSymbol = botSymbol === "X" ? "O" : "X";
        const emptyIndices = board.map((val, idx) => (val === null ? idx : null)).filter(val => val !== null);
        if (emptyIndices.length === 0) return res.json({ move: -1 });

        const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

        // ✅ AI Move Calculation (Simplified for Debugging)
        const randomMove = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
        console.log(`[BOT MOVE] Choosing index ${randomMove}`);

        return res.json({ move: randomMove });

    } catch (error) {
        console.error("[ERROR] AI Move Error:", error);
        return res.status(500).json({ error: "AI API failed", move: -1 });
    }
});


// ✅ Function to find a blocking move
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
