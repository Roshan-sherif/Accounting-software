import React from 'react';
import { FaUserPlus, FaBuilding, FaCog } from 'react-icons/fa';
import './QuickAction.css';

const QuickActions = () => {
  const actions = [
    { icon: <FaUserPlus />, label: 'Add User', path: '/admin/manage-users/create' },
    { icon: <FaBuilding />, label: 'Create Company', path: '/admin/company/create' },
    { icon: <FaCog />, label: 'Settings', path: '/admin/settings' }
  ];

  return (
    <div className="quick-actions">
      <h3>Quick Actions</h3>
      <div className="actions-grid">
        {actions.map((action, index) => (
          <a key={index} href={action.path} className="action-card">
            <div className="action-icon">{action.icon}</div>
            <span>{action.label}</span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;