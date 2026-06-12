const axios = require("axios");
const content =
  response.data.choices[0].message.content;

console.log("RAW AI RESPONSE:");
console.log(content);

const cleaned = content
  .replace(/```json/g, "")
  .replace(/```/g, "")
  .trim();

return JSON.parse(cleaned);
async function getSkillMatch(
  resumeText,
  requiredSkills
) {
  try {
    const response = await axios.post(
      "https://router.huggingface.co/v1/chat/completions",
      {
        model: "meta-llama/Llama-3.1-8B-Instruct",
        messages: [
          {
            role: "user",
            content: `
Resume:
${resumeText}

Required Skills:
${requiredSkills.join(", ")}

Return ONLY valid JSON.
Do not use markdown.
Do not use \`\`\`json.

Example:

{
  "matchedSkills": ["Python"],
  "missingSkills": ["Docker"]
}
`
          }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`
        }
      }
    );

    return JSON.parse(
      response.data.choices[0].message.content
    );

  } catch (err) {
    console.log(err.message);

    return {
      matchedSkills: [],
      missingSkills: requiredSkills
    };
  }
}

module.exports = getSkillMatch;