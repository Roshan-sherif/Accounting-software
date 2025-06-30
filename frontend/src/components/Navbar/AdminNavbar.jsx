import React from 'react';
import { FaBell, FaUserCircle, FaSearch } from 'react-icons/fa';
import './AdminNavbar.css';

const AdminNavbar = () => {
  return (
    <div className="admin-navbar">
      <div className="search-bar">
        <FaSearch className="search-icon" />
        <input type="text" placeholder="Search..." />
      </div>
      
      <div className="navbar-right">
        <div className="notification">
          <FaBell />
          <span className="badge">3</span>
        </div>
        <div className="user-profile">
          <FaUserCircle />
          <span>Admin</span>
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;