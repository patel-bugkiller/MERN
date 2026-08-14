import { Link, useNavigate } from "react-router-dom";
import "../css/Login.css";
import { useState } from "react";
import axios from "axios";

const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:3000").replace(/\/$/, "");

const Login = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState(""); 

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/api/login`, { 
        email,
        password,
      });

      if (!res.data.isLoggedIn) {
        alert(res.data.message || "Invalid email or password.");
        return;
      }

      setEmail("");
      setPassword("");
      setIsLoggedIn(true);
      navigate("/");   // ✅ only navigate on success
    } catch (err) {
      console.error(err);
      alert("Invalid email or password.");
    }
  };

  return (
    <div className="login-container">
      <h2 className="title">Login</h2>
      <form className="login-form" onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Email"
          className="login-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="login-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="login-button"
        >
          Log In
        </button>
      </form>

      <p className="signup-text">
        Don’t have an account? <Link to="/SignUp">Sign up here</Link>
      </p>
    </div>
  );
};

export default Login;
