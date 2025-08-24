import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Swipe.css";

function Swipe() {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(
        (process.env.REACT_APP_API_URL || "http://localhost:5000") +
          "/api/users/swipe-candidates",
        { headers: { Authorization: "Bearer " + token } }
      )
      .then((res) => setCandidates(res.data.candidates || []));
  }, []);

  return (
    <div>
      <h2>Swipe</h2>
      <div className="tinder-cards-container">
        {candidates.length === 0 ? (
          <p>No candidates to swipe right now.</p>
        ) : (
          candidates.map((user) => (
            <TinderCard key={user._id} preventSwipe={["up", "down"]}>
              <div className="tinder-card">
                <h3>{user.name}</h3>
                <p>{user.bio}</p>
              </div>
            </TinderCard>
          ))
        )}
      </div>
    </div>
  );
}

export default Swipe;
