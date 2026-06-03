const fs = require("fs");
const mongoose = require("mongoose");
require("dotenv").config();

const Skill = require("./models/Skill");

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"));

async function importSkills() {
  try {
    const data = fs.readFileSync("skills.txt", "utf8");

    const skills = data
      .split("\n")
      .map(skill => skill.trim())
      .filter(skill => skill.length > 0);

    for (const skill of skills) {
      try {
        await Skill.create({ name: skill });
      } catch {
        // duplicate ignore
      }
    }

    console.log(`Imported ${skills.length} skills`);
    process.exit();

  } catch (err) {
    console.log(err);
    process.exit();
  }
}

importSkills();