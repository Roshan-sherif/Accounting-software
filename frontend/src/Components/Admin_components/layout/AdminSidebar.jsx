import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  FaTachometerAlt, 
  FaUsers, 
  FaBuilding,
  FaChevronDown,
  FaChevronRight 
} from 'react-icons/fa';
import './AdminSidebar.css';

const AdminSidebar = () => {
  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  return (
    <div className="admin-sidebar">
      <div className="sidebar-header">
        <h2>AcSoft</h2>
      </div>
      
      <nav>
        <NavLink 
          to="/admin/dashboard" 
          className={({ isActive }) => `menu-item ${isActive ? 'active' : ''}`}
        >
          <FaTachometerAlt className="icon" />
          <span>Dashboard</span>
        </NavLink>

        <div className={`menu-item ${openMenu === 'users' ? 'open' : ''}`}>
          <div className="menu-title" onClick={() => toggleMenu('users')}>
            <FaUsers className="icon" />
            <span>Manage Users</span>
            {openMenu === 'users' ? <FaChevronDown /> : <FaChevronRight />}
          </div>
          <div className="submenu">
            <NavLink 
              to="/admin/manage-users/all" 
              className={({ isActive }) => isActive ? 'active' : ''}
            >
              All Users
            </NavLink>
            <NavLink 
              to="/admin/manage-users/create" 
              className={({ isActive }) => isActive ? 'active' : ''}
            >
              Create User
            </NavLink>
          </div>
        </div>

        <div className={`menu-item ${openMenu === 'company' ? 'open' : ''}`}>
          <div className="menu-title" onClick={() => toggleMenu('company')}>
            <FaBuilding className="icon" />
            <span>Company</span>
            {openMenu === 'company' ? <FaChevronDown /> : <FaChevronRight />}
          </div>
          <div className="submenu">
            <NavLink 
              to="/admin/company/create" 
              className={({ isActive }) => isActive ? 'active' : ''}
            >
              Create Company
            </NavLink>
            <NavLink 
              to="/admin/company/select" 
              className={({ isActive }) => isActive ? 'active' : ''}
            >
              Select Company
            </NavLink>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default AdminSidebar;