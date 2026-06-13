import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { motion } from "framer-motion";

const extractEmail = (text) => {
  const match = text?.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
  return match ? match[0] : "Not Found";
};

const extractPhone = (text) => {
  const match = text?.match(/(\+91[\s-]?)?[6-9]\d{9}/);
  return match ? match[0] : "Not Found";
};

const extractGithub = (text) => {
  if (!text) return null;

  const match = text.match(
    /(?:https?:\/\/)?(?:www\.)?github\.com\/[A-Za-z0-9_-]+/i
  );

  if (!match) return null;

  const url = match[0];

  return url.startsWith("http")
    ? url
    : `https://${url}`;
};

const extractLinkedin = (text) => {
  if (!text) return null;

  const match = text.match(
    /(?:https?:\/\/)?(?:www\.)?linkedin\.com\/in\/[A-Za-z0-9_-]+/i
  );

  if (!match) return null;

  const url = match[0];

  return url.startsWith("http")
    ? url
    : `https://${url}`;
};

const extractName = (text) => {
  if (!text) return "Unknown";
  const lines = text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  return lines[0]?.replace(/[^a-zA-Z\s]/g, "")?.trim();
};

const getRecommendation = (score) => {
  if (score >= 80) return { text: "Strong Candidate", color: "text-green-400" };
  if (score >= 60) return { text: "Good Fit", color: "text-yellow-400" };
  return { text: "Needs Review", color: "text-red-400" };
};

function RankingResults() {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        setResumes([]);
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:5000/ranked-resumes/${currentUser.email}`
        );
        const data = await response.json();
        const sorted = data.sort(
          (a, b) => (b.jdMatchScore || 0) - (a.jdMatchScore || 0)
        );
        setResumes(sorted);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex justify-center items-center">
        <h2 className="text-2xl font-semibold">Loading Rankings...</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white px-6 py-10">
      <div className="max-w-5xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <h1 className="text-4xl font-semibold mb-1">Resume Rankings</h1>
          <p className="text-slate-400 text-sm">
            Candidates ranked by job description match score
          </p>
        </motion.div>

        {resumes.length === 0 ? (
          <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 text-slate-400">
            No resumes found.
          </div>
        ) : (
          <div className="space-y-5">
            {resumes.map((resume, index) => {
              const recommendation = getRecommendation(resume.jdMatchScore || 0);
              const githubLink = extractGithub(resume.extractedText);
              const linkedinLink = extractLinkedin(resume.extractedText);

              const scoreColor =
                resume.jdMatchScore >= 80
                  ? "text-green-400"
                  : resume.jdMatchScore >= 60
                  ? "text-yellow-400"
                  : "text-red-400";

              const scoreBorder =
                resume.jdMatchScore >= 80
                  ? "border-green-700"
                  : resume.jdMatchScore >= 60
                  ? "border-yellow-700"
                  : "border-red-700";

              return (
                <motion.div
                  key={resume._id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.06 }}
                  className={`bg-slate-900 border rounded-2xl p-6 ${
                    index === 0 ? "border-green-600" : "border-slate-800"
                  }`}
                >
                  {/* TOP ROW */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-5">
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold shrink-0 mt-0.5 ${
                          index === 0
                            ? "bg-green-900 text-green-300"
                            : "bg-slate-800 text-slate-400"
                        }`}
                      >
                        {index + 1}
                      </div>
                      <div>
                        {index === 0 && (
                          <span className="inline-block bg-yellow-500 text-black text-xs font-bold px-3 py-0.5 rounded-full mb-2">
                            Top Candidate
                          </span>
                        )}
                        <p className="font-semibold text-lg leading-tight">
                          {resume.fileName}
                        </p>
                        <p className="text-slate-500 text-xs mt-0.5">
                          Uploaded: {new Date(resume.uploadedAt).toLocaleString()}
                        </p>
                      </div>
                    </div>

                    {/* Score Pill */}
                    <div
                      className={`flex flex-col items-center justify-center bg-slate-950 border ${scoreBorder} rounded-xl px-5 py-3 min-w-[90px]`}
                    >
                      <span className="text-slate-400 text-xs mb-1">
                        Overall match
                      </span>
                      <span className={`text-3xl font-bold leading-none ${scoreColor}`}>
                        {resume.jdMatchScore || 0}%
                      </span>
                    </div>
                  </div>

                  <hr className="border-slate-800 mb-5" />

                  {/* INFO + RECOMMENDATION */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-5">

                    {/* Candidate Info */}
                    <div className="bg-slate-950 rounded-xl p-4 border border-slate-800">
                      <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                        Candidate Info
                      </h3>
                      <div className="space-y-2 text-sm">
                        {[
                          ["Name", extractName(resume.extractedText)],
                          ["Email", extractEmail(resume.extractedText)],
                          ["Phone", extractPhone(resume.extractedText)],
                        ].map(([key, val]) => (
                          <div key={key} className="flex justify-between">
                            <span className="text-slate-500">{key}</span>
                            <span className="font-medium text-right">{val}</span>
                          </div>
                        ))}
                        <div className="flex justify-between">
                          <span className="text-slate-500">GitHub</span>
                          {githubLink ? (
                            <a
                              href={githubLink}
                              target="_blank"
                              rel="noreferrer"
                              className="text-blue-400 hover:underline"
                            >
                              View Profile 
                            </a>
                          ) : (
                            <span className="text-slate-600">Not Found</span>
                          )}
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">LinkedIn</span>
                          {linkedinLink ? (
                            <a
                              href={linkedinLink}
                              target="_blank"
                              rel="noreferrer"
                              className="text-blue-400 hover:underline"
                            >
                              View Profile 
                            </a>
                          ) : (
                            <span className="text-slate-600">Not Found</span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* HR Recommendation */}
                    <div className="bg-slate-950 rounded-xl p-4 border border-slate-800">
                      <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                        HR Recommendation
                      </h3>
                      <p className={`text-base font-bold mb-3 ${recommendation.color}`}>
                        {recommendation.text}
                      </p>
                      {resume.aiSummary && (
  <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 mt-4">
    <h3 className="text-cyan-400 font-semibold mb-2">
      AI Analysis
    </h3>

    <p className="text-sm text-slate-300 whitespace-pre-wrap">
      {resume.aiSummary}
    </p>
  </div>
)}
                      <div className="flex justify-between text-xs text-slate-400 mb-1">
                        <span>Hire Score</span>
                        <span>{resume.jdMatchScore || 0}%</span>
                      </div>
                      <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-2 rounded-full bg-green-500"
                          style={{ width: `${resume.jdMatchScore || 0}%` }}
                        />
                      </div>
                      <p className="text-xs text-slate-400 mt-3 leading-relaxed">
                        {resume.jdMatchScore >= 80 &&
                          "Candidate strongly matches the job requirements and should be prioritized for interview."}
                        {resume.jdMatchScore >= 60 &&
                          resume.jdMatchScore < 80 &&
                          "Candidate matches most of the required skills. Recommended for technical screening."}
                        {resume.jdMatchScore < 60 &&
                          "Candidate partially matches the requirements. Further review recommended before proceeding."}
                      </p>
                    </div>
                  </div>

                  {/* 4 METRIC BOXES */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
                    {[
                      ["JD Match", resume.jdMatchScore || 0, "text-blue-400"],
                      ["Skills Match", resume.skillMatchScore || 0, "text-purple-400"],
                      ["Experience", resume.experienceScore || 0, "text-orange-400"],
                      ["Education", resume.educationScore || 0, "text-pink-400"],
                    ].map(([label, val, color]) => (
                      <div
                        key={label}
                        className="bg-slate-950 rounded-xl p-3 border border-slate-800 text-center"
                      >
                        <p className="text-slate-500 text-xs mb-1">{label}</p>
                        <h3 className={`text-2xl font-bold ${color}`}>{val}%</h3>
                      </div>
                    ))}
                  </div>

                  {/* SKILLS */}
                  <div className="space-y-3 mb-5">
                    {resume.skills?.length > 0 && (
                      <div>
                        <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                          Required Skills
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {resume.skills.map((skill) => (
                            <span
                              key={skill}
                              className="bg-blue-600/20 text-blue-300 border border-blue-700/40 px-3 py-0.5 rounded-full text-xs"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {resume.matchedSkills?.length > 0 && (
                      <div>
                        <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                          Matched Skills
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {resume.matchedSkills.map((skill) => (
                            <span
                              key={skill}
                              className="bg-green-600/20 text-green-300 border border-green-700/40 px-3 py-0.5 rounded-full text-xs"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {resume.missingSkills?.length > 0 && (
                      <div>
                        <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                          Missing Skills
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {resume.missingSkills.map((skill) => (
                            <span
                              key={skill}
                              className="bg-red-600/20 text-red-300 border border-red-700/40 px-3 py-0.5 rounded-full text-xs"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <hr className="border-slate-800 mb-4" />

                  {/* ACTIONS */}
                  <div className="flex flex-wrap gap-3">
                    <a
                      href={`http://localhost:5000/${resume.filePath}`}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-xl text-sm font-medium"
                    >
                      View Resume
                    </a>
                    <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-xl text-sm font-medium">
                      Generate HR Email
                    </button>
                  </div>

                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default RankingResults;