import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { motion } from "framer-motion";

function RankingResults() {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRankings = async () => {
      try {
        if (!auth.currentUser) return;

        const response = await fetch(
  `http://localhost:5000/ranked-resumes/${auth.currentUser.email}`
);

        const data = await response.json();

        const sorted = data.sort(
          (a, b) => (b.jdMatchScore || 0) - (a.jdMatchScore || 0)
        );

        setResumes(sorted);
      } catch (error) {
        console.log(error);
      }

      setLoading(false);
    };

    fetchRankings();
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
            {resumes.map((resume, index) => (
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
                    <div className="text-center">
                      <p className="text-slate-400 text-sm">
                        Overall Match
                      </p>

                      <h2 className="text-4xl font-bold text-green-400">
                        {resume.jdMatchScore || 0}%
                      </h2>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-1 gap-4 mt-8">

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
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default RankingResults;