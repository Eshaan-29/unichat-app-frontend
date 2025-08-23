import React, { useEffect, useState } from "react";
import axios from "axios";

function Matches() {
  const [matches, setMatches] = useState([]);
  const [matchUsers, setMatchUsers] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get(
      (process.env.REACT_APP_API_URL || "http://localhost:5000") + "/api/auth/profile",
      { headers: { "Authorization": "Bearer " + token } }
    ).then(res => {
      const matchIds = res.data.user.matches || [];
      setMatches(matchIds);
      if (matchIds.length) {
        axios.post(
          (process.env.REACT_APP_API_URL || "http://localhost:5000") + "/api/users/batch",
          { ids: matchIds },
          { headers: { "Authorization": "Bearer " + token } }
        ).then(r => setMatchUsers(r.data.users || []));
      }
    });
  }, []);

  return (
    <div>
      <h2>Your Matches</h2>
      {matchUsers.length === 0 ? (
        <p>No matches yet.</p>
      ) : (
        matchUsers.map(user => (
          <div key={user._id}>
            <img src={user.profilePic || "https://via.placeholder.com/50"} width={50} alt="" />
            <span>
              <b>{user.name}</b>: {user.bio}
            </span>
          </div>
        ))
      )}
    </div>
  );
}

export default Matches;
