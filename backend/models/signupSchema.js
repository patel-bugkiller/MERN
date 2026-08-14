const mongoose = require("mongoose");

const signupSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: { type: String, required: true },
  },
  { timestamps: false }
);

const signup_schema = mongoose.model("User", signupSchema);

module.exports = signup_schema;
