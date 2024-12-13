import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/login.css';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/users/signup', formData);
      if (response.status === 200) {
        setSuccess(true);
        setIsVerifying(true);
        alert('Sign-Up successful! Please check your email for the verification code.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  const handleVerification = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/users/verify-email', {
        email: formData.email,
        code: verificationCode,
      });
      if (response.status === 200) {
        alert('Email verification successful!');
        setIsVerifying(false);
        window.location.href = '/Login'; // Redirect to login page after successful verification
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid verification code');
    }
  };

  return (
    <div className="sign-up-container">
      {!isVerifying ? (
        <>
          <h2>Sign Up</h2>
          {error && <div className="error">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit">Sign Up</button>
          </form>
          <div className="switch-link">
            <p>
              Already have an account? <Link to="/login">Log In</Link>
            </p>
          </div>
        </>
      ) : (
        <>
          <h2>Verify Your Email</h2>
          {error && <div className="error">{error}</div>}
          <form onSubmit={handleVerification}>
            <div className="form-group">
              <label htmlFor="verificationCode">6-Digit Verification Code</label>
              <input
                type="text"
                name="verificationCode"
                id="verificationCode"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                required
              />
            </div>
            <button type="submit">Verify</button>
          </form>
        </>
      )}
    </div>
  );
};

export default SignUp;
