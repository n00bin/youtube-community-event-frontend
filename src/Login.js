import React, { useState } from "react";
import axios from "axios";
import { login } from "./api";


const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://youtube-backend-kx3o.onrender.com", {
        username,
        password,
      });

      if (response.status === 200) {
        setMessage("Login successful! Redirecting...");
        // Redirect to admin dashboard
        window.location.href = "/admin";
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setMessage("Invalid username or password.");
      } else if (error.response && error.response.status === 403) {
        setMessage("Unauthorized. Admin access only.");
      } else {
        setMessage("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div>
      <h1>Admin Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Login;
