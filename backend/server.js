const express = require('express');
const mdb = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt'); // ✅ built-in hashing
const User = require('./models/signupSchema'); // import your model

const app = express();
const port = process.env.PORT || 3000;

const allowedOrigins = [
  'http://localhost:5173',
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(cors({ origin: allowedOrigins }));
app.use(express.json());

// Connect to MongoDB
const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/paradox';

mdb.connect(mongoURI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Test route
app.get('/', (req, res) => {
  res.send("Hi welcome to paradox");
});
app.post("/api/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log(req.body);
    if (!username || !email || !password) {
      return res.status(400).json({ error: "Username, email, and password are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "An account with this email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    console.log("Signup attempt:", email);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.error("Error creating user:", err);

    if (err && err.code === 11000) {
      return res.status(409).json({ error: "An account with this email already exists" });
    }

    res.status(500).json({
      error: "Error creating user",
      details: err && err.message ? err.message : String(err),
    });
  }
});


app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    // ✅ Print every login attempt
    console.log("Login attempt:", email);

    const exuser = await User.findOne({ email });
    const passwordMatch = exuser && await bcrypt.compare(password, exuser.password);

    if (passwordMatch) {
      // If user found
      console.log("Login successful:", exuser.email);
      res.json({
        isLoggedIn: true,
        message: "Login successful",
        user: {
          username: exuser.username,
          email: exuser.email,
        },
      });
    } else {
      // If not found
      console.log("Invalid login attempt:", email);
      res.status(401).json({
        isLoggedIn: false,
        message: "Invalid email or password",
      });
    }
  } catch (err) {
    console.error("Error logging in:", err);
    res.status(500).json({ isLoggedIn: false, message: "Error logging in" });
  }
});



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
