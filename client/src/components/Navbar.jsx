import React from "react";

function Navbar({ openAuth }) {
  return (
    <nav className="flex justify-between items-center px-8 py-4 shadow-md bg-white">
      
      {/* Logo */}
      <h1 className="text-2xl font-bold text-blue-600">
        Resume Ranker
      </h1>

      {/* Buttons */}
      <div className="space-x-4">
        <button
          onClick={() => openAuth("login")}
          className="px-4 py-2 border border-blue-500 text-blue-500 rounded hover:bg-blue-50"
        >
          Login
        </button>

        <button
          onClick={() => openAuth("signup")}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Sign Up
        </button>
      </div>
    </nav>
  );
}

export default Navbar;