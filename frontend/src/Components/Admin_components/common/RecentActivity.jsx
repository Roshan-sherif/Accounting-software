import React from 'react';
import './RecentActivity.css';

const RecentActivity = () => {
  const activities = [
    { id: 1, action: 'New user registered', time: '2 hours ago', user: 'John Doe' },
    { id: 2, action: 'Company created', time: '5 hours ago', user: 'Acme Inc' },
    { id: 3, action: 'Password changed', time: '1 day ago', user: 'Admin' }
  ];

  return (
    <div className="recent-activity">
      <h3>Recent Activity</h3>
      <div className="activity-list">
        {activities.map(activity => (
          <div key={activity.id} className="activity-item">
            <div className="activity-content">
              <strong>{activity.action}</strong>
              <span>by {activity.user}</span>
            </div>
            <div className="activity-time">{activity.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;