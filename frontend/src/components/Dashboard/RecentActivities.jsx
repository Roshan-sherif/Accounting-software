import React from 'react';
import { FaFileInvoice, FaMoneyBillWave, FaUserPlus } from 'react-icons/fa';
import './RecentActivities.css';

const RecentActivity = () => {
  const activities = [
    {
      id: 1,
      type: 'invoice',
      title: 'New Invoice Created',
      amount: '$1,250',
      client: 'ABC Corporation',
      time: '2 hours ago',
      icon: <FaFileInvoice />
    },
    {
      id: 2,
      type: 'payment',
      title: 'Payment Received',
      amount: '$3,450',
      client: 'XYZ Enterprises',
      time: '5 hours ago',
      icon: <FaMoneyBillWave />
    },
    {
      id: 3,
      type: 'user',
      title: 'New User Added',
      client: 'John Smith (Accountant)',
      time: '1 day ago',
      icon: <FaUserPlus />
    }
  ];

  return (
    <div className="recent-activity">
      <h2 className="section-title">Recent Activity</h2>
      <div className="activity-list">
        {activities.map(activity => (
          <div key={activity.id} className={`activity-item ${activity.type}`}>
            <div className="activity-icon">
              {activity.icon}
            </div>
            <div className="activity-details">
              <h3>{activity.title}</h3>
              <p>{activity.client}</p>
              {activity.amount && <span className="amount">{activity.amount}</span>}
            </div>
            <div className="activity-time">
              {activity.time}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;