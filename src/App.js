import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import GamesPage from "./pages/GamesPage"; // ✅ Import new Games page

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/games" element={<GamesPage />} /> {/* ✅ New Route for Games */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
