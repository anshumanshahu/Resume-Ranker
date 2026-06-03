import React, { useState, useEffect } from "react";
import { auth } from "../firebase";
import { motion } from "framer-motion";

function RankResume() {
  const [jobDescription, setJobDescription] = useState("");
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const [skillInput, setSkillInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);

  useEffect(() => {
    const fetchSkills = async () => {
      if (!skillInput.trim()) {
        setSuggestions([]);
        return;
      }

      try {
        const res = await fetch(
          `http://localhost:5000/skills?search=${skillInput}`
        );

        const data = await res.json();
        setSuggestions(data);
      } catch (err) {
        console.log(err);
      }
    };

    const timer = setTimeout(fetchSkills, 300);
    return () => clearTimeout(timer);
  }, [skillInput]);

  const addSkill = (skill) => {
    if (!selectedSkills.includes(skill)) {
      setSelectedSkills([...selectedSkills, skill]);
    }

    setSkillInput("");
    setSuggestions([]);
  };

  const removeSkill = (skill) => {
    setSelectedSkills(
      selectedSkills.filter((item) => item !== skill)
    );
  };

 const handleUpload = async () => {
  if (!auth.currentUser) {
    alert("Please login first");
    return;
  }

  if (files.length === 0) {
    alert("Please select resumes");
    return;
  }

  setLoading(true);

  const formData = new FormData();

  // Multiple Resume Upload
  files.forEach((file) => {
    formData.append("resumes", file);
  });

  formData.append(
    "userEmail",
    auth.currentUser.email
  );

  formData.append(
    "featureType",
    "rank-resume"
  );

  formData.append(
    "jobDescription",
    jobDescription
  );

  formData.append(
    "skills",
    JSON.stringify(selectedSkills)
  );

  try {
    const response = await fetch(
      "http://localhost:5000/upload-resumes",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    console.log(data);

    if (data.success) {
      alert(
        `${data.count} resumes uploaded successfully`
      );

      setFiles([]);
      setJobDescription("");
      setSelectedSkills([]);
      setSkillInput("");
    }
  } catch (error) {
    console.log(error);
    alert("Upload failed");
  }

  setLoading(false);
};

  return (
    <div className="min-h-screen bg-slate-950 text-white px-6 py-12">
      <div className="max-w-5xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-5xl font-bold mb-4">
            Rank Resume
          </h1>

          <p className="text-slate-400 mb-10">
            Upload a resume and provide a job description.
            AI will evaluate the candidate against role requirements.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl"
        >
          <label className="block mb-3 text-lg font-medium">
            Required Skills
          </label>

          <div className="relative mb-6">

            <input
              type="text"
              value={skillInput}
              onChange={(e) =>
                setSkillInput(e.target.value)
              }
              placeholder="Type skill name..."
              className="w-full p-4 rounded-xl bg-slate-950 border border-slate-700 focus:outline-none focus:border-blue-500"
            />

            {suggestions.length > 0 && (
              <div className="absolute w-full bg-slate-800 border border-slate-700 rounded-xl mt-2 max-h-60 overflow-y-auto z-50">

                {suggestions.map((skill, index) => (
                  <div
                    key={index}
                    onClick={() =>
                      addSkill(skill.name)
                    }
                    className="p-3 cursor-pointer hover:bg-slate-700"
                  >
                    {skill.name}
                  </div>
                ))}

              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {selectedSkills.map((skill) => (
              <div
                key={skill}
                className="bg-blue-600 px-3 py-2 rounded-full text-sm flex items-center gap-2"
              >
                {skill}

                <button
                  onClick={() => removeSkill(skill)}
                  className="font-bold"
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          <label className="block mb-3 text-lg font-medium">
            Job Description
          </label>

          <textarea
            value={jobDescription}
            onChange={(e) =>
              setJobDescription(e.target.value)
            }
            placeholder="Paste complete job description here..."
            className="w-full h-56 p-4 rounded-xl bg-slate-950 border border-slate-700 mb-8 focus:outline-none focus:border-blue-500"
          />

          <label className="block mb-3 text-lg font-medium">
            Upload Resume
          </label>

         <input
  type="file"
  multiple
  accept=".pdf,.doc,.docx"
  onChange={(e) =>
    setFiles(Array.from(e.target.files))
  }
  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-700"
/>

          {files.length > 0 && (
  <div className="mb-6 mt-4">
    <p className="text-green-400 mb-2 font-medium">
      Selected Resumes ({files.length})
    </p>

    <div className="space-y-2">
      {files.map((file, index) => (
        <div
          key={index}
          className="bg-slate-800 px-4 py-2 rounded-lg"
        >
          {file.name}
        </div>
      ))}
    </div>
  </div>
)}

          <button
            onClick={handleUpload}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 transition py-4 rounded-xl font-semibold"
          >
            {loading
              ? "Uploading..."
              : "Upload & Analyze Resume"}
          </button>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mt-12">

          <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
            <h3 className="text-lg font-semibold mb-2">
              Skill Matching
            </h3>

            <p className="text-slate-400 text-sm">
              Match resumes against required skills.
            </p>
          </div>

          <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
            <h3 className="text-lg font-semibold mb-2">
              AI Ranking
            </h3>

            <p className="text-slate-400 text-sm">
              Generate ranking scores automatically.
            </p>
          </div>

          <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
            <h3 className="text-lg font-semibold mb-2">
              Candidate Insights
            </h3>

            <p className="text-slate-400 text-sm">
              Identify strengths and skill gaps.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default RankResume;