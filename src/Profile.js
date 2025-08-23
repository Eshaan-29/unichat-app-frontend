import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [user, setUser] = useState(null);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          (process.env.REACT_APP_API_URL || "http://localhost:5000") + "/api/auth/profile",
          { headers: { Authorization: "Bearer " + token } }
        );
        setUser(res.data.user);
      } catch (err) {
        setMsg("Error loading profile. Please log in.");
      }
    };
    fetchProfile();
  }, []);

  if (msg) return <div>{msg}</div>;
  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h2>Your Profile</h2>
      <p><strong>Roll:</strong> {user.roll}</p>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Bio:</strong> {user.bio || "--"}</p>
      <p><strong>Interests:</strong> {user.interests?.length > 0 ? user.interests.join(", ") : "--"}</p>
      <div>
        <img
          src={user.profilePic || "https://via.placeholder.com/100"}
          alt="Profile"
          width={100}
        />
      </div>
      <button onClick={() => navigate("/edit-profile")} style={{ margin: "1rem 0" }}>
        Edit Profile
      </button>
      {/* You can add editing UI, matches, liked/disliked lists here */}
    </div>
  );
}

export default Profile;
