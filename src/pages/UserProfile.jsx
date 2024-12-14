import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Header from "../components/Header";

const UserProfile = () => {
  const [authenticated, setAuthenticated] = useState(null); // Track auth state
  const [user, setUser] = useState(null); // Store user details
  const [feedback, setFeedback] = useState(""); // Feedback message
  const [userReviews, setUserReviews] = useState([]); // Store user's reviews
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

  // Fetch reviews created by the authenticated user
  const fetchUserReviews = async () => {
    try {
      const userId = user._id
      const response = await fetch(`/reviews/user/${userId}`); // Adjust API endpoint as needed
      if (!response.ok) {
        throw new Error("Failed to fetch user reviews");
      }
      const reviews = await response.json();
      setUserReviews(reviews);
    } catch (error) {
      console.error("Error fetching user reviews:", error);
    }
  };

  useEffect(() => {
    authenticate(); // Check authentication on component mount
  }, []);

  useEffect(() => {
    fetchUserReviews(); // Fetch user reviews using userId
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

      {/* Display user's reviews */}
      <h2>Your Reviews</h2>
      {userReviews.length > 0 ? (
        userReviews.map((review) => (
          <div key={review._id} className="review">
            <h3>Product: {review.productId}</h3>
            <p>Rating: {review.rating}/5</p>
            <p>{review.comment}</p>
          </div>
        ))
      ) : (
        <p>You haven't reviewed any products yet.</p>
      )}

      {/* Link to change password */}
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
