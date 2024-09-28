import React, { useState } from 'react';
import { auth, signInWithEmailAndPassword } from '../firebase';
import './styles.css';

const errorMessages = {
  'auth/invalid-email': 'The email address is not valid.',
  'auth/user-disabled': 'This user has been disabled.',
  'auth/user-not-found': 'No user found with this email address.',
  'auth/invalid-credential': 'Incorrect password. Please try again.',
};

const Login = ({ onLogin, onRegisterClick }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); 

  const handleLogin = async () => {
    setErrorMessage('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      onLogin(); 
    } catch (error) {
      console.error('Error logging in:', error.message);
      setErrorMessage(errorMessages[error.code] || 'An unexpected error occurred.'); 
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
        <div className="error-message">
          {errorMessage && <p>{errorMessage}</p>} 
        </div>
        <div className="register">
          <p>Don't have an account? <a href="#" onClick={onRegisterClick}>Register</a></p>
        </div>
      </form>
    </div>
  );
};

export default Login;
