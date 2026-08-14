const mongoose = require("mongoose");

const signupSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

const signup_schema = mongoose.model("User", signupSchema);

module.exports = signup_schema;