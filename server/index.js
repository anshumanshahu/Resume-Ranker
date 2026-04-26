const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// MongoDB connect (SAFE via .env)
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log("MongoDB Error:", err));

// Schema
const UserSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true
  }
});

const User = mongoose.model("User", UserSchema);

// API: Save user
app.post("/save-user", async (req, res) => {
  const { name, email } = req.body;

  try {
    // check duplicate
    let user = await User.findOne({ email });

    if (!user) {
      user = new User({ name, email });
      await user.save();
    }

    res.json({
      message: "User saved successfully",
      user
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
});

// start server
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});