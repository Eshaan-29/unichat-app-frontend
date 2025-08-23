import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({ roll: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post(
        (process.env.REACT_APP_API_URL || "http://localhost:5000") + "/api/auth/login",
        form
      );
      localStorage.setItem("token", res.data.token);
      setMessage("Login successful!");
      navigate("/profile");
    } catch (err) {
      setMessage(err.response?.data?.msg || "Error logging in.");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input
          name="roll"
          value={form.roll}
          onChange={handleChange}
          placeholder="Roll Number"
          required
        /><br />
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          required
        /><br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
