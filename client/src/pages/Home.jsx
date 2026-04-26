import React from "react";
import { motion } from "framer-motion";

function Home() {
  return (
    <div className="bg-slate-900 text-white">

      {/* HERO */}
      <section
        id="home"
        className="min-h-screen flex items-center px-10 bg-cover bg-center relative"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1551836022-d5d88e9218df')"
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative z-10 max-w-3xl ml-auto text-right">

          <motion.h1
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="text-5xl font-bold mb-6 leading-tight"
          >
            Smart Resume Analysis for Better Hiring
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-lg text-gray-300 mb-8"
          >
            Analyze, compare, and rank resumes using AI-driven insights to identify the best candidate efficiently.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex justify-end gap-4"
          >
            <button className="px-6 py-3 bg-blue-600 rounded hover:bg-blue-700 transition">
              Rank Resume
            </button>

            <button className="px-6 py-3 bg-emerald-600 rounded hover:bg-emerald-700 transition">
              Compare
            </button>
          </motion.div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-950 text-slate-300 pt-12 pb-6 px-10">

        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10">

          {/* Branding */}
          <div>
            <h2 className="text-3xl font-bold text-white mb-4">
              Resume Ranker
            </h2>
            <p className="text-sm text-slate-400">
              AI-powered platform to analyze, compare, and rank resumes efficiently.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#home" className="hover:text-white transition">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  History
                </a>
              </li>
            </ul>
          </div>

          {/* Creator */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">
              Creator
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white transition">
                  About Creator
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  My Portfolio
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom */}
        <div className="text-center text-xs text-slate-500 mt-10 border-t border-slate-800 pt-4">
          © 2026 Resume Ranker. All rights reserved.
        </div>

      </footer>

    </div>
  );
}

export default Home;