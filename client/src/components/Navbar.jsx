import React from "react";

function Navbar({ openAuth, user, logout }) {
  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-white/70 border-b shadow-sm">
      <div className="flex justify-between items-center px-10 py-4 max-w-7xl mx-auto">

        {/* Logo */}
        <h1 className="text-2xl font-semibold text-blue-600">
          Resume Ranker
        </h1>

        {/* Navigation */}
        <nav className="hidden md:flex space-x-8 text-sm font-medium">
          <a href="#home" className="text-slate-700 hover:text-blue-600">
            Home
          </a>
          <a href="#about" className="text-slate-700 hover:text-blue-600">
            About
          </a>
          <a href="#history" className="text-slate-700 hover:text-blue-600">
            History
          </a>
        </nav>

        {/* Right Side */}
        <div className="space-x-3 flex items-center">

          {user ? (
            <>
              {/* Username */}
              <span className="text-sm text-slate-700 font-medium">
                {user.displayName || user.email}
              </span>

              {/* Logout */}
              <button
                onClick={logout}
                className="px-4 py-2 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              {/* Login */}
              <button
                onClick={() => openAuth("login")}
                className="px-4 py-2 text-sm border rounded hover:bg-slate-100"
              >
                Login
              </button>

              {/* Signup */}
              <button
                onClick={() => openAuth("signup")}
                className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Sign Up
              </button>
            </>
          )}

        </div>

      </div>
    </header>
  );
}

export default Navbar;