import React, { useState } from 'react';
import { auth, db, createUserWithEmailAndPassword, setDoc, doc } from '../firebase';
import './styles.css';

const Register = ({ onRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [preferences, setPreferences] = useState('');

  const handleRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, 'users', userCredential.user.uid), { email, preferences });
      alert('User registered successfully!');
      onRegister();
    } catch (error) {
      console.error('Error registering user:', error.message);
      alert(error.message);
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
      </form>
    </div>
  );
};

export default Register;
