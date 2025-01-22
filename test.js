fetch("https://tictactoe-ai.onrender.com/api/move", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ board: [null, "X", null, null, "O", null, null, null, null], botSymbol: "O", difficulty: "hard" })
})
.then(res => res.json())
.then(data => console.log("✅ Response:", data))
.catch(err => console.error("❌ Error:", err));
