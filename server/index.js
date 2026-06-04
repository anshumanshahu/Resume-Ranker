const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const Skill = require("./models/Skill");
const fs = require("fs");
const pdf = require("pdf-parse");
const mammoth = require("mammoth");
const pdfData = await pdf(dataBuffer);

require("dotenv").config();

const Resume = require("./models/Resume");

const app = express();


// Multer Storage

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });


// Middleware

app.use(cors());
app.use(express.json());


app.use("/uploads", express.static("uploads"));


// MongoDB Connection

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Error:", err));


// User Schema

const UserSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true
  }
});

const User = mongoose.model("User", UserSchema);


// Save User API
app.post("/save-user", async (req, res) => {
  const { name, email } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      user = new User({
        name,
        email
      });

      await user.save();
    }

    res.json({
      success: true,
      message: "User saved successfully",
      user
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      error: "Server error"
    });
  }
});


// Upload Resume API

app.post(
  "/upload-resumes",
  upload.array("resumes", 20),
  async (req, res) => {
    try {
      const {
        userEmail,
        featureType,
        jobDescription,
        skills
      } = req.body;

      const uploadedResumes = [];

      for (const file of req.files) {
        let extractedText = "";

const extension = path.extname(
  file.originalname
).toLowerCase();

if (extension === ".pdf") {
  const dataBuffer = fs.readFileSync(file.path);

  const pdfData = await pdfParse(
    dataBuffer
  );

  extractedText = pdfData.text;
}

if (extension === ".docx") {
  const result =
    await mammoth.extractRawText({
      path: file.path
    });

  extractedText = result.value;
}

const resume = new Resume({
  userEmail,
  fileName: file.originalname,
  filePath: file.path,

  extractedText,

  featureType,
  jobDescription,
  skills: JSON.parse(skills || "[]")
});

        await resume.save();
        uploadedResumes.push(resume);
      }

      res.json({
        success: true,
        count: uploadedResumes.length,
        resumes: uploadedResumes
      });

    } catch (error) {
      console.log(error);

      res.status(500).json({
        success: false,
        message: "Upload failed"
      });
    }
  }
);


// Resume History API
app.get("/history/:email", async (req, res) => {
  try {
    const resumes = await Resume.find({
      userEmail: req.params.email
    }).sort({ uploadedAt: -1 });

    res.json(resumes);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch history"
    });
  }
});

// Skills Search API

app.get("/skills", async (req, res) => {
  try {
    const search = req.query.search || "";

    const skills = await Skill.find({
      name: {
        $regex: search,
        $options: "i"
      }
    })
    .limit(10);

    res.json(skills);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch skills"
    });
  }
});
app.get("/", (req, res) => {
  res.send("Resume Ranker Backend Running");
});


app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});