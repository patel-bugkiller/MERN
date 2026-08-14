import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/signup.css";

const SignUp = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    // Perform login logic here (e.g., API call)
    // If login is successful:
    setUsername("");
    setEmail("");
    setPassword("");
    setIsLoggedIn(true);
    navigate("/");
  }

  useEffect(() => {
    if (setIsLoggedIn) setIsLoggedIn(false);
  }, [setIsLoggedIn]);

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/signup", { 
        username,
        email,
        password,
      });
      alert(res.data.message || "Account created successfully!");
      navigate("/login"); // ✅ move inside success block
    } catch (err) {
      console.error(err);
      alert("Something went wrong while signing up.");
    }
  }

  return (
    <div className="signup-container">
      <h2 className="signup-title" > Sign Up</h2>
      <form className="signup-form" onSubmit={handleSubmit}>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Username"
          className="signup-input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          className="signup-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          className="signup-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="signup-button">
          Create Account
        </button>
      </form>
    </div>
  );
};

export default SignUp;
