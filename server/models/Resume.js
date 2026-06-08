const mongoose = require("mongoose");

const ResumeSchema = new mongoose.Schema({
  userEmail: String,

  batchId: String,

  fileName: String,
  filePath: String,

  extractedText: {
    type: String,
    default: ""
  },

  featureType: String,
  jobDescription: String,

  skills: [String],

  // NEW FIELDS
  matchedSkills: {
    type: [String],
    default: []
  },

  missingSkills: {
    type: [String],
    default: []
  },

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

  strengths: {
    type: [String],
    default: []
  },
  aiSummary: {
  type: String,
  default: ""
},

aiRecommendation: {
  type: String,
  default: ""
},

  weaknesses: {
    type: [String],
    default: []
  },

  uploadedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model(
  "Resume",
  ResumeSchema
);