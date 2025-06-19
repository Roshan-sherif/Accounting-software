import React from 'react';
import { 
  FiHome, 
  FiPlusSquare, 
  FiFolder, 
  FiDatabase, 
  FiUpload, 
  FiLogOut 
} from 'react-icons/fi';
import { motion } from 'framer-motion';

const Sidebar = ({ activeView, setActiveView, selectedCompany }) => {
  const menuItems = [
    { id: 'dashboard', icon: <FiHome />, label: 'Dashboard' },
    { id: 'create-company', icon: <FiPlusSquare />, label: 'Create Company' },
    { id: 'select-company', icon: <FiFolder />, label: 'Select Company' },
    { id: 'backup', icon: <FiDatabase />, label: 'Backup' },
    { id: 'restore', icon: <FiUpload />, label: 'Restore' },
    { id: 'quit', icon: <FiLogOut />, label: 'Quit' },
  ];

  return (
    <motion.div 
      className="sidebar"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="company-status">
        {selectedCompany ? (
          <>
            <div className="company-avatar">🏢</div>
            <div className="company-info">
              <h4>{selectedCompany.name}</h4>
              <p>FY: {selectedCompany.financialYear}</p>
            </div>
          </>
        ) : (
          <div className="no-company">
            <p>No company selected</p>
          </div>
        )}
      </div>

      <ul className="menu">
        {menuItems.map((item) => (
          <li 
            key={item.id}
            className={`menu-item ${activeView === item.id ? 'active' : ''}`}
            onClick={() => setActiveView(item.id)}
          >
            <span className="menu-icon">{item.icon}</span>
            <span className="menu-label">{item.label}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default Sidebar;
