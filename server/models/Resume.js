const mongoose = require("mongoose");

const ResumeSchema = new mongoose.Schema({
  userEmail: String,

  batchId: String, // ADD THIS

  fileName: String,
  filePath: String,

  extractedText: {
    type: String,
    default: ""
  },

  featureType: String,
  jobDescription: String,

  skills: [String],

  jdMatchScore: {
    type: Number,
    default: 0
  },

  skillMatchScore: {
    type: Number,
    default: 0
  },

  experienceScore: {
    type: Number,
    default: 0
  },

  educationScore: {
    type: Number,
    default: 0
  },

  structureScore: {
    type: Number,
    default: 0
  },

  totalScore: {
    type: Number,
    default: 0
  },

  strengths: [String],
  weaknesses: [String],

  uploadedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model(
  "Resume",
  ResumeSchema
);