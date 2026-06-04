const axios = require("axios");

async function getEmbedding(text) {
  try {
    const response = await axios.post(
      "https://api-inference.huggingface.co/pipeline/feature-extraction/sentence-transformers/all-mpnet-base-v2",
      {
        inputs: text.substring(0, 5000)
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`,
          "Content-Type": "application/json"
        }   
      }
    );

    let embedding = response.data;

    // Handle nested array response
    if (
      Array.isArray(embedding) &&
      Array.isArray(embedding[0])
    ) {
      embedding = embedding[0];
    }

    return embedding;
  } catch (error) {
    console.error(
      "Embedding Error:",
      error.response?.data || error.message
    );
    throw error;
  }
}

module.exports = getEmbedding;