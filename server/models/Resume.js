const mongoose = require("mongoose");

const ResumeSchema = new mongoose.Schema({
  userEmail: String,
  fileName: String,
  filePath: String,

  extractedText: String, // NEW

  featureType: String,
  jobDescription: String,
  skills: [String],

  uploadedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Resume", ResumeSchema);