import React, { useState } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import NewsFeed from './components/NewsFeed';

const App = () => {
  const [view, setView] = useState('login'); // Default view is login

  const handleLoginSuccess = () => {
    setView('newsfeed'); // Switch to newsfeed after login
  };

  const handleRegisterSuccess = () => {
    setView('newsfeed'); // Switch to newsfeed after registration
  };

  const handleRegisterClick = () => {
    setView('register'); // Switch to register view
  };

  return (
    <div>
      {view === 'login' && <Login onLogin={handleLoginSuccess} onRegisterClick={handleRegisterClick} />}
      {view === 'register' && <Register onRegister={handleRegisterSuccess} />}
      {view === 'newsfeed' && <NewsFeed />}
    </div>
  );
};

export default App;
