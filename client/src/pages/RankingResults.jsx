import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { motion } from "framer-motion";
const extractEmail = (text) => {
  const match = text?.match(
    /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i
  );
  return match ? match[0] : "Not Found";
};

const extractPhone = (text) => {
  const match = text?.match(
    /(\+91[\s-]?)?[6-9]\d{9}/
  );
  return match ? match[0] : "Not Found";
};


const extractGithub = (text) => {
  if (!text) return null;

  const match = text.match(
    /(?:https?:\/\/)?(?:www\.)?github\.com\/[A-Za-z0-9_-]+/gi
  );

  return match?.[0] || null;
};

const extractLinkedin = (text) => {
  if (!text) return null;

  const match = text.match(
    /(?:https?:\/\/)?(?:www\.)?linkedin\.com\/in\/[A-Za-z0-9_-]+/gi
  );

  return match?.[0] || null;
};

const extractName = (text) => {
  if (!text) return "Unknown";

  const lines = text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  return lines[0]
    ?.replace(/[^a-zA-Z\s]/g, "")
    ?.trim();
};

const getRecommendation = (score) => {
  if (score >= 80)
    return {
      text: "Strong Candidate",
      color: "text-green-400"
    };

  if (score >= 60)
    return {
      text: "Good Fit",
      color: "text-yellow-400"
    };

  return {
    text: "Needs Review",
    color: "text-red-400"
  };
};
function RankingResults() {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (currentUser) => {
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
      }
    );

    return unsubscribe;
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex justify-center items-center">
        <h2 className="text-2xl font-semibold">
          Loading Rankings...
        </h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white px-6 py-10">
      <div className="max-w-7xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-5xl font-bold mb-3">
            Resume Rankings
          </h1>

          <p className="text-slate-400 mb-10">
            Candidates ranked according to job description match.
          </p>
        </motion.div>

        {resumes.length === 0 ? (
          <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800">
            No resumes found.
          </div>
        ) : (
          <div className="space-y-6">
            {resumes.map((resume, index) => {
  const recommendation = getRecommendation(
    resume.jdMatchScore || 0
  );
  const githubLink = extractGithub(
  resume.extractedText
);

const linkedinLink = extractLinkedin(
  resume.extractedText
);
  

  return (
    <motion.div
      key={resume._id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg"
    >
      
                <div className="flex flex-col md:flex-row md:justify-between md:items-center">

                  <div>
                    <div className="flex items-center gap-3 mb-2">

                      {index === 0 && (
                        <span className="bg-yellow-500 text-black font-bold px-3 py-1 rounded-full text-sm">
                          🏆 Top Candidate
                        </span>
                      )}

                      <h2 className="text-2xl font-semibold">
                        {resume.fileName}
                      </h2>
                    </div>

                    <p className="text-slate-400 text-sm">
                      Uploaded:{" "}
                      {new Date(
                        resume.uploadedAt
                      ).toLocaleString()}
                    </p>
                  </div>

                  <div className="mt-4 md:mt-0">
                    <div className="text-center mb-8">
                      <p className="text-slate-400 text-sm">
                        Overall Match
                      </p>

                      <h2 className="text-4xl font-bold text-green-400">
                        {resume.jdMatchScore || 0}%
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

  {/* Candidate Info */}
  <div className="bg-slate-950 p-5 rounded-xl border border-slate-800">
    <h3 className="text-xl font-bold mb-4 text-cyan-400">
      Candidate Information
    </h3>

    <div className="space-y-3 text-sm">

      <div>
        <span className="text-slate-400">
          Name:
        </span>{" "}
        <span className="font-medium">
          {extractName(
            resume.extractedText
          )}
        </span>
      </div>

      <div>
        <span className="text-slate-400">
          Email:
        </span>{" "}
        {extractEmail(
          resume.extractedText
        )}
      </div>

      <div>
        <span className="text-slate-400">
          Phone:
        </span>{" "}
        {extractPhone(
          resume.extractedText
        )}
      </div>

      <div>
  <span className="text-slate-400">
    GitHub:
  </span>{" "}
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
    "Not Found"
  )}
</div>

      <div>
  <span className="text-slate-400">
    LinkedIn:
  </span>{" "}
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
    "Not Found"
  )}
</div>

    </div>
  </div>

  {/* HR Recommendation */}
  <div className="bg-slate-950 p-5 rounded-xl border border-slate-800">
    <h3 className="text-xl font-bold mb-4 text-green-400">
      HR Recommendation
    </h3>

    <p
      className={`text-lg font-bold ${recommendation.color}`}
    >
      {recommendation.text}
    </p>

    <div className="mt-4">
      <div className="flex justify-between mb-2">
        <span>Hire Score</span>
        <span>
          {resume.jdMatchScore || 0}%
        </span>
      </div>

      <div className="w-full h-3 bg-slate-700 rounded-full">
        <div
          className="h-3 bg-green-500 rounded-full"
          style={{
            width: `${
              resume.jdMatchScore || 0
            }%`
          }}
        />
      </div>
    </div>

    <div className="mt-5 text-sm text-slate-300">

      {resume.jdMatchScore >= 80 && (
        <p>
          Candidate strongly matches the
          job requirements and should be
          prioritized for interview.
        </p>
      )}

      {resume.jdMatchScore >= 60 &&
        resume.jdMatchScore < 80 && (
          <p>
            Candidate matches most of the
            required skills. Recommended
            for technical screening.
          </p>
        )}

      {resume.jdMatchScore < 60 && (
        <p>
          Candidate partially matches the
          requirements. Further review
          recommended before proceeding.
        </p>
      )}
    </div>
  </div>

    </div>
  </div>
</div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">

                  <div className="bg-slate-950 rounded-xl p-4 border border-slate-800">
                    <p className="text-slate-400 text-sm">
                      JD Match
                    </p>

                    <h3 className="text-3xl font-bold text-blue-400">
                      {resume.jdMatchScore || 0}%
                    </h3>
                  </div>

                  <div className="bg-slate-950 rounded-xl p-4 border border-slate-800">
  <p className="text-slate-400 text-sm">
    Skills Match
  </p>

  <h3 className="text-3xl font-bold text-purple-400">
    {resume.skillMatchScore || 0}%
  </h3>
</div>

<div className="bg-slate-950 rounded-xl p-4 border border-slate-800">
  <p className="text-slate-400 text-sm">
    Experience
  </p>

  <h3 className="text-3xl font-bold text-orange-400">
    {resume.experienceScore || 0}%
  </h3>
</div>

<div className="bg-slate-950 rounded-xl p-4 border border-slate-800">
  <p className="text-slate-400 text-sm">
    Education
  </p>

  <h3 className="text-3xl font-bold text-pink-400">
    {resume.educationScore || 0}%
  </h3>
</div>

                </div>

                {resume.skills?.length > 0 && (
                  <div className="mt-6">
                    <h4 className="mb-3 text-lg font-medium">
                      Required Skills
                    </h4>

                    <div className="flex flex-wrap gap-2">
                      {resume.skills.map((skill) => (
                        <span
                          key={skill}
                          className="bg-blue-600 px-3 py-1 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {resume.matchedSkills?.length > 0 && (
  <div className="mt-4">
    <h4 className="text-green-400 font-semibold mb-2">
      Matched Skills
    </h4>

    <div className="flex flex-wrap gap-2">
      {resume.matchedSkills.map((skill) => (
        <span
          key={skill}
          className="bg-green-600 px-3 py-1 rounded-full text-sm"
        >
          {skill}
        </span>
      ))}
    </div>
  </div>
)}

{resume.missingSkills?.length > 0 && (
  <div className="mt-4">
    <h4 className="text-red-400 font-semibold mb-2">
      Missing Skills
    </h4>

    <div className="flex flex-wrap gap-2">
      {resume.missingSkills.map((skill) => (
        <span
          key={skill}
          className="bg-red-600 px-3 py-1 rounded-full text-sm"
        >
          {skill}
        </span>
      ))}
    </div>
  </div>
)}

                <div className="flex flex-wrap gap-4 mt-8">

                  <a
                    href={`http://localhost:5000/${resume.filePath}`}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-xl font-medium"
                  >
                    View Resume
                  </a>

                  <button
                    className="bg-green-600 hover:bg-green-700 px-5 py-3 rounded-xl font-medium"
                  >
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