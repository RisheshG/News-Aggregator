import React, { useState } from 'react';
import { auth, db, createUserWithEmailAndPassword, setDoc, doc } from '../firebase';
import { Link, useNavigate } from 'react-router-dom';
import './styles.css';

const errorMessages = {
  'auth/invalid-email': 'The email address is not valid.',
  'auth/email-already-in-use': 'This email is already in use. Please try another.',
  'auth/weak-password': 'The password is too weak. Please choose a stronger password.',
};

const Register = ({ onRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [preferences, setPreferences] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); 
  const navigate = useNavigate(); 

  const handleRegister = async () => {
    setErrorMessage('');
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, 'users', userCredential.user.uid), { email, preferences });
      onRegister(); 
      navigate('/newsfeed'); 
    } catch (error) {
      console.error('Error registering user:', error.message);
      setErrorMessage(errorMessages[error.code] || 'An unexpected error occurred.'); 
    }
  };

  return (
    <div className="wrapper">
      <form>
        <h2>Register</h2>
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
        <div className="input-field">
          <input 
            type="text" 
            placeholder="Preferences" 
            value={preferences} 
            onChange={(e) => setPreferences(e.target.value)} 
          />
          <label>Enter your preferences</label>
        </div>
        <button type="button" onClick={handleRegister}>Register</button>
        <div className="error-message">
          {errorMessage && <p>{errorMessage}</p>} 
        </div>
        <div className="login">
          <p>Already have an account? <Link to="/">Login here</Link></p>
        </div>
      </form>
    </div>
  );
};

export default Register;
