import React from 'react';
import {
  FaWallet, FaChartLine, FaUniversity, FaShoppingCart,
  FaUsers, FaBuilding, FaTachometerAlt, FaBell,
  FaUserCircle, FaSearch, FaUserPlus, FaCog,
  FaChevronDown, FaChevronRight
} from 'react-icons/fa';

const iconMap = {
  wallet: FaWallet,
  'chart-line': FaChartLine,
  university: FaUniversity,
  'shopping-cart': FaShoppingCart,
  users: FaUsers,
  building: FaBuilding,
  dashboard: FaTachometerAlt,
  bell: FaBell,
  user: FaUserCircle,
  search: FaSearch,
  'user-plus': FaUserPlus,
  cog: FaCog,
  chevronDown: FaChevronDown,
  chevronRight: FaChevronRight
};

const FaIcon = ({ name, size = 16, color, className = '' }) => {
  const IconComponent = iconMap[name];
  
  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  return (
    <IconComponent 
      size={size} 
      color={color} 
      className={`fa-icon ${className}`} 
    />
  );
};

export default FaIcon;