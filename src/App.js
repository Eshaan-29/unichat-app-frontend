import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import Profile from "./Profile";
import Swipe from "./Swipe";
import Matches from "./Matches";
import RequireAuth from "./RequireAuth";
import Chat from "./Chat";
import EditProfile from "./EditProfile"; // <-- Add this import

function App() {
  return (
    <Router>
      <nav>
        <Link to="/register">Register</Link> |{" "}
        <Link to="/login">Login</Link> |{" "}
        <Link to="/profile">Profile</Link> |{" "}
        <Link to="/edit-profile">Edit Profile</Link> |{" "}
        <Link to="/swipe">Swipe</Link> |{" "}
        <Link to="/matches">Matches</Link>
      </nav>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<RequireAuth><Profile /></RequireAuth>} />
        <Route path="/edit-profile" element={<RequireAuth><EditProfile /></RequireAuth>} />
        <Route path="/swipe" element={<RequireAuth><Swipe /></RequireAuth>} />
        <Route path="/matches" element={<RequireAuth><Matches /></RequireAuth>} />
        <Route path="/chat/:matchId" element={<RequireAuth><Chat /></RequireAuth>} />
        <Route path="/" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
