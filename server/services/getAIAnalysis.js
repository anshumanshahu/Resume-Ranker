const axios = require("axios");

async function getAIAnalysis(resumeText, jobDescription) {
  try {
    const prompt = `
Job Description:
${jobDescription}

Resume:
${resumeText.slice(0, 3000)}

Give:
1. Candidate Summary (2-3 lines)
2. Hiring Recommendation
`;

    const response = await axios.post(
      "https://api-inference.huggingface.co/models/google/flan-t5-large",
      {
        inputs: prompt
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`
        }
      }
    );

    return response.data[0]?.generated_text || "";
  } catch (err) {
    console.log(err.message);
    return "";
  }
}

module.exports = getAIAnalysis;