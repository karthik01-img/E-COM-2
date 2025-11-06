import React, { useState } from 'react';
import './Practice.css';
import { useNavigate } from 'react-router-dom';

function Practice() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const nav = useNavigate(); // ✅ Correct position

  const mydata = [
    { name: 'karthik', password: 'karthik123' },
    { name: 'avi', password: 'avi123' },
  ];

  function handleEmail(e) {
    setEmail(e.target.value);
  }

  function handlePassword(e) {
    setPassword(e.target.value);
  }

  function handleLogin() {
    if (email.length === 0 || password.length === 0) {
      alert('Please enter details');
    } else {
      const exist = mydata.find(
        (item) => item.name === email && item.password === password
      );
      console.log(exist);
      if (exist) {
        alert('Login success');
        nav('/home'); // ✅ redirects after success
        setEmail('');
        setPassword('');
      } else {
        alert('Invalid username or password');
      }
    }
  }

  return (
    <div className="login-container">
      <h2 className="login-title">User Login</h2>
      <div className="login-form">
        <input
          type="text"
          value={email}
          placeholder="Enter your username"
          onChange={handleEmail}
          className="login-input"
        />
        <input
          type="password"
          value={password}
          placeholder="Enter your password"
          onChange={handlePassword}
          className="login-input"
        />
        <button onClick={handleLogin} className="login-button">
          Login
        </button>
      </div>
    </div>
  );
}

export default Practice;