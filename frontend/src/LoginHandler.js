import React from 'react';

function LoginHandler() {
  const handleLogin = async () => {
    const isNewUser = window.confirm('Are you a new user? Click OK to register or Cancel to login');

    if (isNewUser) {
      const firstName = prompt('Enter your first name:');
      const lastName = prompt('Enter your last name:');
      const username = prompt('Enter your Gmail id:');
      const password = prompt('Enter a password:');

      if (firstName && lastName && username && password) {
        const res = await fetch('http://localhost:5001/api/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ firstName, lastName, username, password })
        });

        const data = await res.json();
        alert(data.message);

        // ✅ Show message only if registration is successful
        if (data.message.toLowerCase().includes('success')) {
          alert('Please login now');
        }
      }
    } else {
      const username = prompt('Enter your username:');
      const password = prompt('Enter your password:');

      if (username && password) {
        const res = await fetch('http://localhost:5001/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password })
        });

        const data = await res.json();
        alert(data.message);

        if (res.ok) {
          localStorage.setItem('loggedInUser', username);
        }
      }
    }
  };

  return (
    <button onClick={handleLogin}>Login</button>
  );
}

export default LoginHandler;
