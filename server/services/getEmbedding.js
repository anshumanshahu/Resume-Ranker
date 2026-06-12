const { HfInference } = require("@huggingface/inference");

const hf = new HfInference(process.env.HF_API_KEY);

async function getEmbedding(text) {
  if (!text) {
    throw new Error("Text is empty");
  }

  const embedding = await hf.featureExtraction({
    model: "sentence-transformers/all-mpnet-base-v2",
    inputs: text.substring(0, 5000),
  });

  console.log("Embedding generated");
  console.log("Embedding length:", embedding.length);
  console.log("First 5 values:", embedding.slice(0, 5));

  return embedding;
}

module.exports = getEmbedding;