import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function EditProfile() {
  const [bio, setBio] = useState("");
  const [interests, setInterests] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch current profile data for editing
    const token = localStorage.getItem("token");
    axios
      .get(
        (process.env.REACT_APP_API_URL || "http://localhost:5000") +
          "/api/auth/profile",
        { headers: { Authorization: "Bearer " + token } }
      )
      .then((res) => {
        setBio(res.data.user.bio || "");
        setInterests((res.data.user.interests || []).join(", "));
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const interestsArr = interests
      .split(",")
      .map((interest) => interest.trim())
      .filter((interest) => interest.length);
    const token = localStorage.getItem("token");
    try {
      const res = await axios.put(
        (process.env.REACT_APP_API_URL || "http://localhost:5000") +
          "/api/auth/profile",
        { bio, interests: interestsArr },
        { headers: { Authorization: "Bearer " + token } }
      );
      setMessage("Profile updated!");
      setTimeout(() => navigate("/profile"), 1200);
    } catch (err) {
      setMessage("Error updating profile.");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "2rem auto" }}>
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Bio:</label>
          <br />
          <textarea
            rows="3"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            style={{ width: "100%" }}
          />
        </div>
        <div>
          <label>Interests (comma separated):</label>
          <br />
          <input
            type="text"
            value={interests}
            onChange={(e) => setInterests(e.target.value)}
            style={{ width: "100%" }}
          />
        </div>
        <button type="submit" style={{ marginTop: "1rem" }}>
          Save
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default EditProfile;
