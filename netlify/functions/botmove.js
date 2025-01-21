require("dotenv").config();
const { OpenAI } = require("openai");

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // Netlify handles ENV variables differently
});

const findBlockingMove = (board, playerSymbol) => {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]  // Diagonals
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

const constructAsciiBoard = (board) => {
    return `
    ${board[0] ?? "0"} | ${board[1] ?? "1"} | ${board[2] ?? "2"}
    --+---+--
    ${board[3] ?? "3"} | ${board[4] ?? "4"} | ${board[5] ?? "5"}
    --+---+--
    ${board[6] ?? "6"} | ${board[7] ?? "7"} | ${board[8] ?? "8"}
    `;
};

exports.handler = async (event) => {
    if (event.httpMethod !== "POST") {
        return {
            statusCode: 405,
            body: JSON.stringify({ message: "Method Not Allowed" }),
        };
    }

    const { board, botSymbol, difficulty } = JSON.parse(event.body);
    const playerSymbol = botSymbol === "X" ? "O" : "X";
    const emptyIndices = board.map((val, idx) => (val === null ? idx : null)).filter(val => val !== null);

    if (emptyIndices.length === 0) {
        return {
            statusCode: 200,
            body: JSON.stringify({ move: -1 }),
        };
    }

    if (difficulty === "hard" || difficulty === "medium") {
        const blockMove = findBlockingMove(board, playerSymbol);
        if (blockMove !== null) {
            return {
                statusCode: 200,
                body: JSON.stringify({ move: blockMove }),
            };
        }
    }

    if (difficulty === "easy") {
        const randomMove = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
        return {
            statusCode: 200,
            body: JSON.stringify({ move: randomMove }),
        };
    }

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

        return {
            statusCode: 200,
            body: JSON.stringify({ move: aiMove ?? emptyIndices[0] }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "AI API failed", move: emptyIndices[0] }),
        };
    }
};
