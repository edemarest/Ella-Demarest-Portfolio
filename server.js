require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { OpenAI } = require("openai");

const app = express();
const PORT = process.env.PORT || 10000;

// ✅ Ensure OpenAI API key is set
if (!process.env.OPENAI_API_KEY) {
    console.error("❌ ERROR: OPENAI_API_KEY is missing in .env file.");
    process.exit(1);
}

// ✅ Initialize OpenAI Client
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

app.use(express.json());

// ✅ CORS Configuration (NO DUPLICATES)
const allowedOrigins = ["https://ellademarestportfolio.netlify.app"];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("CORS not allowed"));
        }
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
}));

// ✅ Handle preflight OPTIONS requests
app.options("*", (req, res) => res.sendStatus(204));

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));

app.get("/", (req, res) => res.send("✅ Tic-Tac-Toe AI Server is running!"));

// ✅ Convert board to ASCII format
const constructAsciiBoard = (board) => `
    ${board[0] ?? "0"} | ${board[1] ?? "1"} | ${board[2] ?? "2"}
    --+---+--
    ${board[3] ?? "3"} | ${board[4] ?? "4"} | ${board[5] ?? "5"}
    --+---+--
    ${board[6] ?? "6"} | ${board[7] ?? "7"} | ${board[8] ?? "8"}
`;

// ✅ AI Move Route
app.post("/api/move", async (req, res) => {
    try {
        console.log("[DEBUG] Request received:", req.body);

        const { board, botSymbol, difficulty } = req.body;
        if (!board || !botSymbol || !difficulty) {
            return res.status(400).json({ error: "Missing required parameters" });
        }

        const playerSymbol = botSymbol === "X" ? "O" : "X";
        const emptyIndices = board.map((val, idx) => (val === null ? idx : null)).filter(val => val !== null);

        if (emptyIndices.length === 0) {
            console.log("[BOT MOVE] Board is full, returning -1");
            return res.json({ move: -1 });
        }

        if (difficulty === "hard" || difficulty === "medium") {
            const blockMove = findBlockingMove(board, playerSymbol);
            if (blockMove !== null) {
                console.log(`[BOT MOVE] Blocking at index ${blockMove}`);
                return res.json({ move: blockMove });
            }
        }

        if (difficulty === "easy") {
            const randomMove = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
            console.log(`[BOT MOVE] Easy mode, choosing index ${randomMove}`);
            return res.json({ move: randomMove });
        }

        const asciiBoard = constructAsciiBoard(board);
        const prompt = `
You are an **advanced Tic-Tac-Toe AI** playing as '${botSymbol}'. Here is the **current board state**:

${asciiBoard}

### **Rules for Making a Move**
1️⃣ **If you have a move that wins the game, take it now.**
2️⃣ **If the opponent '${playerSymbol}' is about to win, block them.**
3️⃣ **Otherwise, choose the most strategic move.**
4️⃣ **Return only the number (0-8) of your move. No explanations.**
`;

        // ✅ AI Call
        const response = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [{ role: "system", content: prompt }]
        });

        const rawResponse = response.choices[0]?.message?.content?.trim();
        const moveMatch = rawResponse ? rawResponse.match(/\b[0-8]\b/) : null;
        const aiMove = moveMatch ? parseInt(moveMatch[0], 10) : null;

        console.log(`[BOT MOVE] AI Chose: ${aiMove}`);

        return res.json({ move: aiMove ?? emptyIndices[0] }); 
    } catch (error) {
        console.error("[ERROR] AI Move Error:", error);

        // ✅ Proper error handling with safe defaults
        return res.status(500).json({ error: "AI API failed", move: emptyIndices.length > 0 ? emptyIndices[0] : -1 });
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
