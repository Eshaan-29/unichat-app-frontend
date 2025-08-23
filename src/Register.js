import React, { useState } from "react";
import axios from "axios";

function Register() {
  const [form, setForm] = useState({ roll: "", name: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();

    // Roll number format validation (optional, update regex as per your requirements)
    const rollPattern = /^BT2\dF0\dF0\d\d$/;
    if (!rollPattern.test(form.roll)) {
      setMessage("Roll number must be in the format BT2xF0xF0xx (x = digit)");
      return;
    }

    try {
      // Adjust the URL if your backend runs on a different port or host
      const res = await axios.post(
        (process.env.REACT_APP_API_URL || "http://localhost:5000") + "/api/auth/register",
        form
      );
      setMessage(res.data.msg || "Registration successful!");
      setForm({ roll: "", name: "", password: "" });
    } catch (err) {
      setMessage(
        err.response?.data?.msg ||
        "Error registering. Please try again."
      );
    }
  };

  return (
    <div>
      <h2>Register</h2>
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
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
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
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;

