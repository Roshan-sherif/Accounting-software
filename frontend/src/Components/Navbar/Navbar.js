import React from 'react';
import { FaBuilding, FaSignOutAlt } from 'react-icons/fa';

const Navbar = ({ onQuit }) => {
  return (
    <nav className="cms-navbar">
      <div className="navbar-content">
        <div className="logo-container">
          <FaBuilding className="navbar-icon" />
          <span className="logo-text">Accounting Software</span>
        </div>
        <button 
          onClick={onQuit}
          className="quit-button"
        >
          <FaSignOutAlt className="button-icon" />
          Quit
        </button>
      </div>
    </nav>
  );
};

export default Navbar;