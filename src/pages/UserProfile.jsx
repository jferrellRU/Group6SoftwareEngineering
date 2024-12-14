import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Header from "../components/Header";
import axios from 'axios';


const UserProfile = () => {
  const [authenticated, setAuthenticated] = useState(null); // Track auth state
  const [user, setUser] = useState(null); // Store user details
  const [feedback, setFeedback] = useState(""); // Feedback message
  const [adminPassword, setAdminPassword] = useState(""); // Admin password input
  const [userReviews, setUserReviews] = useState([]); // Store user's reviews
  const [editingReview, setEditingReview] = useState(null); // Track the review being edited
  const [updatedComment, setUpdatedComment] = useState(""); // Store the updated comment
  const [updatedRating, setUpdatedRating] = useState(5); // Store the updated rating (default 5)
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
        fetchUserReviews(data.user._id); // Fetch user reviews using userId
      } else {
        setAuthenticated(false);
      }
    } catch (error) {
      console.error("Error checking authentication:", error);
      setAuthenticated(false); // Default to unauthenticated on error
    }
  };

  // Fetch reviews created by the authenticated user
  const fetchUserReviews = async (userId) => {
    try {
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

  // Handle updating a review
  const handleUpdateReview = async (reviewId) => {
    try {
      const response = await fetch(`/reviews/${reviewId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ comment: updatedComment, rating: updatedRating }),
      });

      if (!response.ok) {
        throw new Error("Failed to update review");
      }

      // Refresh reviews
      fetchUserReviews(user._id);
      setEditingReview(null);
      setUpdatedComment("");
      setUpdatedRating(5);
    } catch (error) {
      console.error("Error updating review:", error);
    }
  };

  // Handle deleting a review
  const handleDeleteReview = async (reviewId) => {
    try {
      const response = await fetch(`/reviews/${reviewId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete review");
      }

      // Refresh reviews
      fetchUserReviews(user._id);
    } catch (error) {
      console.error("Error deleting review:", error);
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


  const handleMakeAdmin = async () => {
    try {  
        const username = user._id;
        console.log(username);


      const response = await fetch("/users/is-admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: username, // Use the current user's ID
          adminPassword, // Admin password entered by the user
        })
      });

      const data = await response.json();

      if (data.success) {
        setFeedback("User successfully made an administrator.");
      } else {
        setFeedback(data.message || "Failed to make user admin.");
      }
    } catch (error) {
      console.error("Error making user admin:", error);
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
            <h3>Product: {review.productName}</h3>
            <p>
              Rating: {editingReview === review._id ? (
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={updatedRating}
                  onChange={(e) => setUpdatedRating(Number(e.target.value))}
                />
              ) : (
                `${review.rating}/5`
              )}
            </p>
            {editingReview === review._id ? (
              <div>
                <textarea
                  value={updatedComment}
                  onChange={(e) => setUpdatedComment(e.target.value)}
                  placeholder="Update your review"
                />
                <button onClick={() => handleUpdateReview(review._id)}>
                  Save
                </button>
                <button onClick={() => setEditingReview(null)}>Cancel</button>
              </div>
            ) : (
              <p>{review.comment}</p>
            )}
            <button
              onClick={() => {
                setEditingReview(review._id);
                setUpdatedComment(review.comment);
                setUpdatedRating(review.rating);
              }}
            >
              Edit Review
            </button>
            <button onClick={() => handleDeleteReview(review._id)}>
              Delete Review
            </button>
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

      {/* Admin password input */}
      <div>
        <label>
          Enter Admin Password:
          <input
            type="password"
            value={adminPassword}
            onChange={(e) => setAdminPassword(e.target.value)}
          />
        </label>
        <button onClick={handleMakeAdmin}>Make Admin</button>
      </div>

      <button onClick={handleLogout}>Log Out</button>
    </div>
  );
};

export default UserProfile;
