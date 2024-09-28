import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import NewsFeed from './components/NewsFeed';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/newsfeed" element={<NewsFeed />} />
      </Routes>
    </Router>
  );
};

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    navigate('/newsfeed'); // Redirect to NewsFeed after successful login
  };

  const handleRegisterClick = () => {
    navigate('/register'); // Redirect to Register page
  };

  return <Login onLogin={handleLoginSuccess} onRegisterClick={handleRegisterClick} />;
};

const RegisterPage = () => {
  const navigate = useNavigate();

  const handleRegisterSuccess = () => {
    navigate('/newsfeed'); // Redirect to NewsFeed after successful registration
  };

  return <Register onRegister={handleRegisterSuccess} />;
};

export default App;
