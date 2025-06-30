import React from 'react';
import { FaPlus, FaFileImport, FaFileExport, FaUserCog } from 'react-icons/fa';
import './QuickAction.css';

const QuickActions = () => {
  const actions = [
    {
      icon: <FaPlus />,
      title: "Create Invoice",
      color: "#3498db"
    },
    {
      icon: <FaFileImport />,
      title: "Import Data",
      color: "#2ecc71"
    },
    {
      icon: <FaFileExport />,
      title: "Export Reports",
      color: "#e67e22"
    },
    {
      icon: <FaUserCog />,
      title: "User Settings",
      color: "#9b59b6"
    }
  ];

  return (
    <div className="quick-actions">
      <h2 className="section-title">Quick Actions</h2>
      <div className="actions-grid">
        {actions.map((action, index) => (
          <button 
            key={index} 
            className="action-button"
            style={{ '--action-color': action.color }}
          >
            <div className="action-icon">
              {action.icon}
            </div>
            <span>{action.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;