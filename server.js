require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { OpenAI } = require("openai");

const app = express();
const PORT = process.env.PORT || 10000; // ✅ Render dynamically assigns the PORT

app.use(express.json()); // ✅ Ensure JSON body is parsed correctly

// ✅ Improved CORS Configuration
const allowedOrigins = ["https://ellademarestportfolio.netlify.app"];

app.use(cors({
    origin: function (origin, callback) {
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

// ✅ Global Preflight Response Middleware
app.options("*", (req, res) => {
    res.sendStatus(204);
});

// ✅ Start Server
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});

// ✅ Root Route (Check If Server is Running)
app.get("/", (req, res) => {
    res.send("✅ Tic-Tac-Toe AI Server is running!");
});

// ✅ Handle /api/move Requests
app.post("/api/move", async (req, res) => {
    try {
        console.log("[DEBUG] Request received:", req.body);

        const { board, botSymbol, difficulty } = req.body;
        if (!board || !botSymbol || !difficulty) {
            return res.status(400).json({ error: "Missing required parameters" });
        }

        const emptyIndices = board.map((val, idx) => (val === null ? idx : null)).filter(val => val !== null);
        if (emptyIndices.length === 0) return res.json({ move: -1 });

        const randomMove = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
        console.log(`[BOT MOVE] Choosing index ${randomMove}`);

        return res.json({ move: randomMove });

    } catch (error) {
        console.error("[ERROR] AI Move Error:", error);
        return res.status(500).json({ error: "AI API failed", move: -1 });
    }
});
