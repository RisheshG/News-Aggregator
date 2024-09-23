import React from 'react';
import './navbar.css'; // Include this for navbar styling

const categories = ['Technology', 'Sports', 'Business', 'Entertainment', 'Health'];

const Navbar = ({ onCategoryChange }) => {
  return (
    <div className="navbar">
      <ul className="navbar-menu">
        {categories.map((category, index) => (
          <li key={index} className="navbar-item" onClick={() => onCategoryChange(category)}>
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navbar;
