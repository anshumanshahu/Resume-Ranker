import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="bg-slate-900 text-white">
      {/* HERO */}
      <section
        id="home"
        className="min-h-screen flex items-center px-10 bg-cover bg-center relative"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=2070&auto=format&fit=crop')",
        }}
      >
        <div className="absolute inset-0 bg-black/70"></div>

        <div className="relative z-10 max-w-3xl ml-auto text-right">
          <motion.h1
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="text-5xl md:text-6xl font-bold mb-6 leading-tight"
          >
            AI Powered Resume Ranking Platform
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-lg text-gray-300 mb-8"
          >
            Upload resumes, compare candidates, and identify the best talent
            using intelligent AI-driven analysis.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap justify-end gap-4"
          >
            <button
              onClick={() => navigate("/rank-resume")}
              className="px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition font-medium"
            >
              Rank Resume
            </button>

            <button
              className="px-6 py-3 bg-emerald-600 rounded-lg hover:bg-emerald-700 transition font-medium"
            >
              Compare Resumes
            </button>

            <button
              className="px-6 py-3 bg-purple-600 rounded-lg hover:bg-purple-700 transition font-medium"
            >
              Best Candidate
            </button>
          </motion.div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20 px-10 bg-slate-950">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            Features
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-800 p-8 rounded-xl border border-slate-700">
              <h3 className="text-xl font-semibold mb-4">
                Resume Ranking
              </h3>
              <p className="text-slate-400">
                Match resumes against job descriptions and generate AI-based scores.
              </p>
            </div>

            <div className="bg-slate-800 p-8 rounded-xl border border-slate-700">
              <h3 className="text-xl font-semibold mb-4">
                Resume Comparison
              </h3>
              <p className="text-slate-400">
                Compare multiple resumes side-by-side and identify strengths.
              </p>
            </div>

            <div className="bg-slate-800 p-8 rounded-xl border border-slate-700">
              <h3 className="text-xl font-semibold mb-4">
                Best Candidate Detection
              </h3>
              <p className="text-slate-400">
                Let AI determine the strongest candidate for a specific role.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black text-slate-300 pt-12 pb-6 px-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10">
          <div>
            <h2 className="text-4xl font-bold text-white mb-4">
              Resume Ranker
            </h2>

            <p className="text-sm text-slate-400">
              AI-powered platform for resume ranking, comparison and candidate evaluation.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-3">
              Quick Links
            </h3>

            <ul className="space-y-2 text-sm">
              <li>
                <a href="#home" className="hover:text-white">
                  Home
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-white">
                  About Us
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-white">
                  History
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-3">
              Creator
            </h3>

            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white">
                  About Creator
                </a>
              </li>

              <li>
                <a
                  href="https://github.com/anshumanshahu"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white"
                >
                  GitHub Profile
                </a>
              </li>

              <li>
                <a
                  href="https://anshumanshahu.vercel.app"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white"
                >
                  My Portfolio
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="text-center text-xs text-slate-500 mt-10 border-t border-slate-800 pt-4">
          © 2026 Resume Ranker. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default Home;