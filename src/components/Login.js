import React, { useState } from 'react';
import { auth, signInWithEmailAndPassword } from '../firebase';
import './styles.css'; // Import the CSS file for styling

const Login = ({ onLogin, onRegisterClick }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('User logged in successfully!');
      onLogin();
    } catch (error) {
      console.error('Error logging in:', error.message);
      alert(error.message);
    }
  };

  return (
    <div className="wrapper">
      <form>
        <h2>Login</h2>
        <div className="input-field">
          <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required
          />
          <label>Enter your email</label>
        </div>
        <div className="input-field">
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required
          />
          <label>Enter your password</label>
        </div>
        <div className="forget">
          <label htmlFor="remember">
            <input type="checkbox" id="remember" />
            <p>Remember me</p>
          </label>
        </div>
        <button type="button" onClick={handleLogin}>Log In</button>
        <div className="register">
          <p>Don't have an account? <a href="#" onClick={onRegisterClick}>Register</a></p>
        </div>
      </form>
    </div>
  );
};

export default Login;
