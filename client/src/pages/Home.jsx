import React from "react";

function Home() {
  return (
    <div className="text-center mt-20 px-4">

      <h1 className="text-5xl font-bold mb-4 text-gray-800">
        AI Resume Ranker 🚀
      </h1>

      <p className="text-gray-600 mb-10 text-lg">
        Upload resumes and find the best candidate instantly using AI
      </p>

      <div className="flex flex-wrap justify-center gap-6">

        <button className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          Rank Resume
        </button>

        <button className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600">
          Compare Resumes
        </button>

        <button className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600">
          Best Candidate
        </button>

      </div>
    </div>
  );
}

export default Home;