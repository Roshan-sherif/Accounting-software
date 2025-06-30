import React from 'react';
import './Statecard.css';

const StatsCard = ({ title, value, change, icon, trend }) => {
  return (
    <div className="stats-card">
      <div className="card-header">
        <div className="card-icon">
          {icon}
        </div>
        <h3>{title}</h3>
      </div>
      <div className="card-body">
        <div className="card-value">{value}</div>
        <div className={`card-change ${trend}`}>
          {change} {trend === 'up' ? '↑' : '↓'}
        </div>
      </div>
    </div>
  );
};

export default StatsCard;