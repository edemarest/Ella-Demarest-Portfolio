import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="p-4 bg-gray-900 text-white flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">
        My Portfolio
      </Link>
      <div className="space-x-4">
        <Link to="/projects" className="hover:text-yellow-400 transition">Projects</Link>
        <Link to="/contact" className="hover:text-yellow-400 transition">Contact</Link>
      </div>
    </nav>
  );
};

export default Navbar;
