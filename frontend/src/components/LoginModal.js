// src/components/LoginModal.js
import React, { useState, useEffect } from 'react';
import './LoginModal.css';

function LoginModal({ onClose, onLoginSuccess }) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  useEffect(() => {
    setFormData({
      firstName: '',
      lastName: '',
      username: '',
      password: '',
      confirmPassword: '',
    });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const passwordMismatch =
    isRegistering &&
    formData.password &&
    formData.confirmPassword &&
    formData.password !== formData.confirmPassword;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwordMismatch) {
      return;
    }

    const endpoint = isRegistering ? '/api/users/register' : '/api/users/login';

    try {
      const res = await fetch(`http://localhost:5001${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Request failed');
      }

      alert(data.message);

      if (isRegistering) {
        // ✅ After registration, switch to login form
        setIsRegistering(false);
        setFormData({
          firstName: '',
          lastName: '',
          username: '',
          password: '',
          confirmPassword: '',
        });
        return;
      }

      // ✅ Login successful
      localStorage.setItem('loggedInUser', formData.username);
      onClose();
      if (onLoginSuccess) {
        onLoginSuccess();
      }
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>×</button>
        <h2>{isRegistering ? 'Register' : 'Login'}</h2>
        <form onSubmit={handleSubmit}>
          {isRegistering && (
            <>
              <input
                name="firstName"
                placeholder="First Name"
                onChange={handleChange}
                value={formData.firstName}
                required
              />
              <input
                name="lastName"
                placeholder="Last Name"
                onChange={handleChange}
                value={formData.lastName}
                required
              />
            </>
          )}

          <input
            name="username"
            placeholder="Username"
            onChange={handleChange}
            value={formData.username}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            value={formData.password}
            required
          />

          {isRegistering && (
            <>
              <input
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                onChange={handleChange}
                value={formData.confirmPassword}
                required
                style={{
                  border: passwordMismatch ? '2px solid red' : undefined,
                }}
              />
              {passwordMismatch && (
                <p style={{ color: 'red', fontSize: '0.85rem', marginTop: '0.2rem' }}>
                  Passwords do not match
                </p>
              )}
            </>
          )}

          <button type="submit">
            {isRegistering ? 'Register' : 'Login'}
          </button>
        </form>

        <p>
          {isRegistering ? 'Already have an account?' : 'New user?'}{' '}
          <span
            onClick={() => {
              setIsRegistering(!isRegistering);
              setFormData({
                firstName: '',
                lastName: '',
                username: '',
                password: '',
                confirmPassword: '',
              });
            }}
            className="toggle-link"
          >
            {isRegistering ? 'Login here' : 'Register here'}
          </span>
        </p>
      </div>
    </div>
  );
}

export default LoginModal;
