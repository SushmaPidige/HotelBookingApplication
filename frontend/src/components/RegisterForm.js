import React, { useState } from 'react';

function RegisterForm({ onRegister, onSwitchToLogin }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5001/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
//     const data = await res.json();
//     alert(data.message);
    
//     if (res.ok) onRegister();
//   };
const data = await res.json();

    if (res.ok) {
    alert(`${data.message}\nPlease login now`);
    onRegister(); 
    } else {
    alert(data.error || 'Registration failed');
    }   

  return (
    <div className="auth-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input name="firstName" placeholder="First Name" onChange={handleChange} required />
        <input name="lastName" placeholder="Last Name" onChange={handleChange} required />
        <input name="username" placeholder="Gmail Username" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Register</button>
        <p>Already have an account? <span onClick={onSwitchToLogin} className="auth-link">Login</span></p>
      </form>
    </div>
  );
}

export default RegisterForm;
