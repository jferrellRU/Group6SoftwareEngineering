import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Header from "../components/Header";
import '../styles/userprofile.css';

const UserProfile = () => {
  const [authenticated, setAuthenticated] = useState(null); // Track auth state
  const [user, setUser] = useState(null); // Store user details
  const [feedback, setFeedback] = useState(""); // Feedback message
  const navigate = useNavigate();

  // Authentication function
  const authenticate = async () => {
    try {
      const response = await fetch("/users/check-auth", {
        credentials: "include", // Include cookies for session-based authentication
      });
      const data = await response.json();
      console.log(data);

      if (data.success && data.user) {
        setAuthenticated(true);
        setUser(data.user); // Store user details
      } else {
        setAuthenticated(false);
      }
    } catch (error) {
      console.error("Error checking authentication:", error);
      setAuthenticated(false); // Default to unauthenticated on error
    }
  };

  useEffect(() => {
    authenticate(); // Check authentication on component mount
  }, []);

  useEffect(() => {
    if (authenticated === false) {
      navigate("/login"); // Redirect to login if not authenticated
    }
  }, [authenticated, navigate]);

  const handleLogout = async () => {
    try {
      const response = await fetch("/users/logout", {
        method: "POST",
        credentials: "include",
      });
      const data = await response.json();
      if (data.success) {
        navigate("/login");
      } else {
        setFeedback(data.message || "Failed to log out.");
      }
    } catch (error) {
      console.error("Error logging out:", error);
      setFeedback("An error occurred.");
    }
  };

  if (authenticated === null) {
    return <div>Loading...</div>; // Show loading state while authenticating
  }

  return (
    <div className="profile">
      <header>
        <Header />
      </header>
      <h1>Profile</h1>
      {feedback && <div className="feedback">{feedback}</div>}
      {user && (
        <div>
          <p>Welcome, {user.name || "User"}!</p>
          <p>Email: {user.email}</p>
        </div>
      )}

      {/* Only the link to change the password remains */}
      <div>
        <p>
          <Link to="/forgot-password">Change Password</Link>
        </p>
      </div>

      <button onClick={handleLogout}>Log Out</button>
    </div>
  );
};

export default UserProfile;
