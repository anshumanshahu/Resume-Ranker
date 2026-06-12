const { HfInference } =
  require("@huggingface/inference");

const hf =
  new HfInference(
    process.env.HF_API_KEY
  );

async function getAIAnalysis(
  resumeText,
  jobDescription
) {
  try {
    const prompt = `
Job Description:
${jobDescription}

Resume:
${resumeText.slice(0, 2500)}

Analyze the candidate.

Return:
1. Summary
2. Strengths
3. Weaknesses
4. Hiring Recommendation
`;

    const response =
      await hf.textGeneration({
        model: "google/flan-t5-large",
        inputs: prompt,
        parameters: {
          max_new_tokens: 200
        }
      });

    return (
      response.generated_text || ""
    );

  } catch (err) {
    console.log(
      "AI Analysis Error:",
      err.message
    );

    return "";
  }
}

module.exports =
  getAIAnalysis;