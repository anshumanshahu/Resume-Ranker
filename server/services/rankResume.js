const getEmbedding = require("./getEmbedding");
const cosineSimilarity = require("./cosineSimilarity");

async function rankResume(resumeText, jobDescription) {
  try {
    const resumeEmbedding =
      await getEmbedding(resumeText);

    const jdEmbedding =
      await getEmbedding(jobDescription);

    const similarity =  
      cosineSimilarity(
        resumeEmbedding,
        jdEmbedding
      );

    return {
      similarity,
      score: Math.round(similarity * 100),
    };
  } catch (error) {
    console.error("AI Ranking Error:", error);
    throw error;
  }
}

module.exports = rankResume;