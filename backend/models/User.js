const mongoose = require("mongoose");



const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,          // ✅ ensures no duplicates
    lowercase: true,       // optional, normalize emails
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,          // optional: enforce minimum password length
  },
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);

