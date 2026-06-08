const axios = require("axios");

async function getAIAnalysis(
  resumeText,
  jobDescription
) {
  try {
    const response = await axios.post(
      "https://api-inference.huggingface.co/models/google/flan-t5-large",
      {
        inputs: `
Job Description:
${jobDescription}

Resume:
${resumeText.slice(0, 3000)}

Give a short candidate summary and hiring recommendation.
`
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`
        }
      }
    );

    return (
      response.data[0]?.generated_text ||
      ""
    );
  } catch (err) {
    console.log(err.message);
    return "";
  }
}

module.exports = getAIAnalysis;