import React from 'react';
import FaIcon from './FaIcon';
import './StatCard.css';

const StatCard = ({ title, value, change, icon, extra, accounts }) => {
  return (
    <div className="stat-card">
      <div className="card-header">
        <div className="card-icon">
          <FaIcon name={icon} />
        </div>
        <h3>{title}</h3>
      </div>
      
      <div className="card-value">{value}</div>
      
      {change && (
        <div className={`change ${change.startsWith('+') ? 'positive' : 'negative'}`}>
          {change}
        </div>
      )}
      
      {extra && <div className="card-extra">{extra}</div>}
      
      {accounts && (
        <div className="card-accounts">
          {accounts.map((account, index) => (
            <div key={index} className="account-row">
              <span>{account.name}</span>
              <span>{account.balance}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StatCard;