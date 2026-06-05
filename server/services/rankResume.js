const { HfInference } = require("@huggingface/inference");
const cosineSimilarity = require("./cosineSimilarity");

const hf = new HfInference(process.env.HF_API_KEY);

async function getEmbedding(text) {
  const embedding = await hf.featureExtraction({
    model: "sentence-transformers/all-mpnet-base-v2",
    inputs: text.substring(0, 5000),
  });

  return embedding;
}

async function rankResume(resumeText, jobDescription) {
  try {
    console.log("Generating resume embedding...");
    const resumeEmbedding = await getEmbedding(resumeText);

    console.log("Generating JD embedding...");
    const jdEmbedding = await getEmbedding(jobDescription);

    const similarity =
      cosineSimilarity(resumeEmbedding, jdEmbedding);

    const score = Math.round(similarity * 100);

    return {
      score,
      similarity,
    };
  } catch (error) {
    console.error("AI Ranking Error:", error);
    throw error;
  }
}

module.exports = rankResume;